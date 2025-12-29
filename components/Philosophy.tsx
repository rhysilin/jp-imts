import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // NOTE: Please download corresponding images and place them in public/images/ folder
  const philosophies = [
    {
      id: "01",
      title: "健康寿命の維持・向上",
      en: "Life & Action",
      desc: "日本の医療を通じてお客様の健康寿命「生命の維持＋行動の維持（自律的行動）」の維持・向上に尽力いたします。",
      image: "/images/philo-1.jpg" 
    },
    {
      id: "02",
      title: "医療産業の国際化",
      en: "Globalization",
      desc: "日本の世界最高水準の最先端医療技術によって医療産業の国際化に貢献し、国境を越えた信頼を築きます。",
      image: "/images/philo-2.jpg"
    },
    {
      id: "03",
      title: "多様なニーズへの対応",
      en: "Diversity",
      desc: "日本の「医療ツーリズム事業」を向上させ、文化や言語の壁を越えて多様なニーズに柔軟に対応いたします。",
      image: "/images/philo-3.jpg"
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- Desktop: Horizontal Scroll with Pinning ---
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        if (!track) return;

        // Calculate scroll distance: track width - 1 screen width (but keep left panel visible)
        // We actually want the track to slide leftwards.
        // The track is inside a flex container. We want to move the track so the last item reveals.
        const totalMovement = track.scrollWidth - (window.innerWidth * 0.6); // 60% of screen is for track visibility

        const scrollTween = gsap.to(track, {
          x: -totalMovement, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${totalMovement * 1.5}`, // Scroll duration multiplier
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            refreshPriority: 10, // PRIORITY: Ensure this calculates BEFORE Flow section
            onUpdate: (self) => {
               // Update index (0 to 2) based on scroll progress
               const idx = Math.min(
                 Math.floor(self.progress * philosophies.length),
                 philosophies.length - 1
               );
               setActiveIndex(idx);
            }
          }
        });

        // Internal Parallax for images inside the horizontally scrolling cards
        gsap.utils.toArray('.philo-img-container').forEach((container: any) => {
           const img = container.querySelector('img');
           gsap.fromTo(img, 
             { scale: 1.2, xPercent: -15 }, 
             { 
               scale: 1, 
               xPercent: 15, // Move image slightly right as container moves left
               ease: "none",
               scrollTrigger: {
                 trigger: container,
                 containerAnimation: scrollTween, // Link to the horizontal scroll
                 start: "left right",
                 end: "right left",
                 scrub: true
               }
             }
           );
        });
      });

      // --- Mobile: Vertical Stack ---
      mm.add("(max-width: 1023px)", () => {
         gsap.utils.toArray('.philo-mobile-card').forEach((card: any) => {
            gsap.fromTo(card,
              { y: 50, opacity: 0 },
              {
                y: 0, 
                opacity: 1, 
                duration: 0.8,
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%"
                }
              }
            );
         });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="philosophy" 
      ref={sectionRef} 
      className="relative bg-slate-50 text-slate-800 lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-aurora-blue/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-aurora-purple/5 rounded-full blur-[100px]"></div>
      </div>

      {/* --- LEFT PANEL (Fixed/Sticky Info) --- */}
      <div className="lg:w-[40%] w-full px-6 md:px-12 py-16 lg:py-0 flex flex-col justify-center relative z-20 lg:h-full lg:bg-gradient-to-r lg:from-slate-50 lg:via-slate-50 lg:to-transparent">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-12 bg-slate-800"></span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-slate-800">Corporate Philosophy</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-slate-900 leading-tight mb-10">
            企業理念
          </h2>
          
          <p className="text-lg font-serif text-slate-600 leading-relaxed mb-12">
            「世界最高水準の最先端医療技術によって<br/>
            健康寿命維持をすべてのお客様に」
          </p>

          {/* Progress Indicator (Desktop Only) */}
          <div className="hidden lg:block">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-serif text-aurora-blue">0{activeIndex + 1}</span>
              <span className="text-lg font-serif text-slate-300 pb-1">/ 0{philosophies.length}</span>
            </div>
            <div className="w-full h-[2px] bg-slate-200 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-aurora-blue transition-all duration-500 ease-out"
                 style={{ width: `${((activeIndex + 1) / philosophies.length) * 100}%` }}
               ></div>
            </div>
            <p className="mt-4 text-sm font-bold tracking-widest uppercase text-slate-400">
               {philosophies[activeIndex].en}
            </p>
          </div>
        </div>
      </div>

      {/* --- RIGHT PANEL (Scrollable Content) --- */}
      <div className="lg:w-[60%] w-full relative z-10 flex items-center">
        
        {/* Desktop Track */}
        <div ref={trackRef} className="hidden lg:flex gap-16 pl-10 pr-[20vw] items-center h-[80vh]">
           {philosophies.map((item, index) => (
             <div 
               key={index} 
               className="philo-card relative w-[600px] shrink-0 group"
             >
                {/* Image Container with Mask */}
                <div className="philo-img-container h-[500px] w-[500px] overflow-hidden rounded-sm relative shadow-2xl shadow-slate-200">
                   {/* Local Image Source */}
                   <img 
                     src={item.image} 
                     alt={item.title} 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
                </div>

                {/* Overlapping Glass Text Box */}
                <div className="absolute -bottom-10 -right-0 w-[380px] bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-xl rounded-sm">
                   <div className="absolute -top-10 -left-6 text-8xl font-serif font-bold text-white drop-shadow-lg opacity-80 pointer-events-none select-none">
                      {item.id}
                   </div>
                   <h3 className="text-2xl font-serif text-slate-800 mb-4 mt-6 relative z-10">
                      {item.title}
                   </h3>
                   <div className="w-10 h-[2px] bg-aurora-blue mb-4"></div>
                   <p className="text-slate-600 leading-7 font-light text-sm text-justify">
                      {item.desc}
                   </p>
                </div>
             </div>
           ))}
        </div>

        {/* Mobile Vertical List */}
        <div className="lg:hidden flex flex-col gap-12 px-6 pb-24">
           {philosophies.map((item, index) => (
             <div key={index} className="philo-mobile-card bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
                <div className="h-48 overflow-hidden relative">
                   <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                   <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded flex items-center justify-center font-serif font-bold text-slate-800 shadow-sm">
                      {item.id}
                   </div>
                </div>
                <div className="p-8">
                   <span className="text-[10px] tracking-widest uppercase text-aurora-blue font-bold mb-2 block">{item.en}</span>
                   <h3 className="text-xl font-serif text-slate-800 mb-4">{item.title}</h3>
                   <p className="text-slate-600 leading-relaxed font-light text-sm text-justify">
                      {item.desc}
                   </p>
                </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default Philosophy;