import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, FileKey, AlertCircle, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Notes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const notes = [
    {
      icon: <ShieldAlert className="w-6 h-6" />,
      title: "個人情報の管理",
      text: "電子メールに記入していただいた個人情報は適切に管理しておりますが、利用目的の範囲内で、当社連携先医療機関等からの照会に応える形で限定的に利用させていただく場合がございます。"
    },
    {
      icon: <FileKey className="w-6 h-6" />,
      title: "情報の開示・訂正",
      text: "ご提供いただいた個人情報に関しては、ご本人様との確認・承諾がとれた場合のみ、開示、訂正、削除をご請求いただけます。"
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "記入漏れについて",
      text: "電子メールにおいて、記入漏れや未記入があった場合、最適な医療機関の選定が難しくなり、サービスの一部を提供できない場合がございます。"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "未成年のお客様",
      text: "未成年の方が当サービスにお申し込みされる場合は、必ず保護者様の同意が必要になりますので、あらかじめご注意ください。"
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(".notes-title", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );

      // Cards Stagger Animation - Using fromTo for explicit state control
      // Targeting the specific grid items inside the scope
      gsap.fromTo(".note-card", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out", // Simplified ease for smoother rendering
          scrollTrigger: {
            trigger: gridRef.current, // Trigger based on the grid container
            start: "top 90%", // Trigger slightly earlier
            toggleActions: "play none none reverse" 
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-slate-50/50">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-slate-50 via-white to-blue-50/30 -z-10 rounded-full blur-3xl opacity-60"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="notes-title text-center mb-16">
          <p className="text-aurora-pink text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-3">
             <span className="w-8 h-[1px] bg-aurora-pink"></span>
             Important Notice
             <span className="w-8 h-[1px] bg-aurora-pink"></span>
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800">注意事項・個人情報について</h2>
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className="notes-grid grid md:grid-cols-2 gap-6 lg:gap-8">
          {notes.map((note, index) => (
            <div 
              key={index} 
              className="note-card group relative bg-white/70 backdrop-blur-xl border border-white/80 p-8 rounded-2xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-blue-200/20 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-blue-50/0 group-hover:to-blue-50/50 transition-all duration-500"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
                
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-white shadow-md shadow-blue-100 flex items-center justify-center text-aurora-pink group-hover:scale-110 group-hover:text-aurora-purple transition-all duration-500 shrink-0">
                  {note.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-serif text-xl text-slate-800 mb-3 group-hover:text-aurora-blue transition-colors duration-300">
                    {note.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-7 font-light text-justify">
                    {note.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Notes;