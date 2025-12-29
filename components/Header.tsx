import React, { useState, useRef, useLayoutEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: '会社概要', href: '#about', label: 'About' },
    { name: '企業理念', href: '#philosophy', label: 'Philosophy' },
    { name: '日本の医療', href: '#features', label: 'Features' },
    { name: '予約の流れ', href: '#flow', label: 'Process' },
    { name: 'Q&A', href: '#faq', label: 'FAQ' },
  ];

  // Active Link Detection via ScrollTrigger
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Vital: Refresh ScrollTrigger to ensure any pinned sections (like Philosophy)
      // have calculated their spacers before we set up these triggers.
      // ScrollTrigger.sort() happens automatically due to refreshPriority usage below.

      navLinks.forEach((link) => {
        const target = document.querySelector(link.href);
        if (!target) return;

        ScrollTrigger.create({
          trigger: target,
          // Modified trigger point: 
          // "top 60%" means the section becomes active when its top edge is 60% down the viewport.
          // This ensures that the PREVIOUS pinned section (which pushes this one down) 
          // has fully finished its scroll duration and this section is well into view before highlighting.
          start: "top 60%", 
          end: "bottom 60%",
          // Low priority ensures this calculates AFTER the pinned sections (Philosophy, Flow)
          // have established their pin-spacers.
          refreshPriority: -1, 
          onEnter: () => setActiveId(link.href),
          onEnterBack: () => setActiveId(link.href),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // Smart Hide/Show Header Logic
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile/Tablet: Auto-hide on scroll down to save screen space
      mm.add("(max-width: 1023px)", () => {
        const showAnim = gsap.from(headerRef.current, { 
          yPercent: -100,
          paused: true,
          duration: 0.4,
          ease: "power2.inOut"
        }).progress(1);

        ScrollTrigger.create({
          start: "top top",
          end: 99999,
          onUpdate: (self) => {
            self.direction === -1 ? showAnim.play() : showAnim.reverse();
          }
        });
      });

      // Desktop (PC): Ensure header is always visible (reset any potential transforms)
      mm.add("(min-width: 1024px)", () => {
         gsap.set(headerRef.current, { yPercent: 0 });
      });

    }, headerRef);
    return () => ctx.revert();
  }, []);

  // Mobile Menu Animation
  useLayoutEffect(() => {
    if(!menuRef.current) return;
    
    if (isMenuOpen) {
      gsap.to(menuRef.current, { x: '0%', duration: 0.5, ease: 'power3.out' });
      gsap.fromTo(".menu-item", 
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.2, ease: "power2.out" }
      );
    } else {
      gsap.to(menuRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [isMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Identify target
    const targetId = href.startsWith('#') ? href.substring(1) : href;
    
    // Scroll To Logic
    if (!targetId || targetId === '') {
        // Scroll to top
        gsap.to(window, { duration: 1.2, scrollTo: 0, ease: "power3.inOut" });
    } else {
        // Scroll to element with offset for fixed header (80px)
        const target = document.getElementById(targetId);
        if (target) {
            gsap.to(window, { 
                duration: 1.5, 
                scrollTo: { y: target, offsetY: 80 }, 
                ease: "power3.inOut" 
            });
        }
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/40 transition-all shadow-sm h-20"
      >
        <div className="container mx-auto px-6 md:px-12 h-full flex justify-between items-center">
          <a 
            href="#" 
            className="flex flex-col group cursor-pointer" 
            onClick={(e) => { setActiveId(''); handleLinkClick(e, '#'); }}
          >
            <span className="font-serif text-2xl font-bold tracking-wider text-slate-800">IMTS</span>
            <span className="text-[0.55rem] uppercase tracking-[0.2em] text-aurora-blue group-hover:text-aurora-purple transition-colors">International Medical</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = activeId === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative flex flex-col items-center py-2"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  <span className={`font-serif text-sm transition-colors duration-300 ${isActive ? 'text-aurora-blue font-medium' : 'text-slate-600 group-hover:text-aurora-blue'}`}>
                    {link.name}
                  </span>
                  
                  {/* Label (Hover State) */}
                  <span className={`text-[0.6rem] uppercase tracking-widest absolute -bottom-3 transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0 text-aurora-blue' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 text-slate-400'}`}>
                    {link.label}
                  </span>

                  {/* Active Dot Indicator */}
                  <span className={`absolute -top-1 w-1 h-1 rounded-full bg-aurora-blue transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></span>
                </a>
              );
            })}
            <a
               href="mailto:info@imts.jp"
               className="ml-4 px-6 py-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white text-xs tracking-widest uppercase hover:from-aurora-blue hover:to-aurora-purple transition-all duration-300 rounded-sm shadow-lg shadow-blue-500/20"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-slate-800 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <span className="text-xs uppercase font-bold tracking-widest fixed right-6 top-7 text-white">Close</span> : <Menu strokeWidth={1} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-40 translate-x-full flex items-center justify-center"
      >
         <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`menu-item text-2xl font-serif text-center transition-colors ${activeId === link.href ? 'text-aurora-cyan' : 'text-white hover:text-aurora-cyan'}`}
              >
                <span className="block">{link.name}</span>
                <span className="block text-xs text-slate-400 font-sans tracking-widest mt-1 uppercase">{link.label}</span>
              </a>
            ))}
            <a href="mailto:info@imts.jp" className="menu-item mt-8 px-8 py-3 border border-white/20 text-white uppercase tracking-widest text-sm hover:bg-white hover:text-slate-900 transition-colors">
              Contact Us
            </a>
         </div>
      </div>
    </>
  );
};

export default Header;