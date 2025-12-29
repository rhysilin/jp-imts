import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, FileText, UserCheck, PenTool, CreditCard, Plane, Stethoscope, HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Flow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { 
      id: "01", 
      icon: <Mail className="w-6 h-6" />, 
      title: "お問い合わせ", 
      desc: "お問い合わせは電子メール（info@imts.jp）を通じて弊社までご連絡をお願い致します。日本語、中国語、英語予約可能です。",
      summary: "Contact"
    },
    { 
      id: "02", 
      icon: <FileText className="w-6 h-6" />, 
      title: "現在の状況確認", 
      desc: "ご連絡をいただいた後、当社からお送りする事前問診票（既往病名、手術歴、希望される医療サービス等）をご記入いただき、医療データとともに返送していただきます。",
      summary: "Check"
    },
    { 
      id: "03", 
      icon: <UserCheck className="w-6 h-6" />, 
      title: "お客様へのご提案", 
      desc: "ご提供いただいた医療情報を基に、医師を連携医療機関の中から選択します。具体的な健康診断や人間ドック、または治療方針・期間を提案し、費用見積もりをお知らせいたします。",
      summary: "Proposal"
    },
    { 
      id: "04", 
      icon: <PenTool className="w-6 h-6" />, 
      title: "お申込み方法", 
      desc: "当社の提案したプランにご納得いただいた上で、正式なお申込みとなります。この際ご希望があれば滞在ビザ発給のご相談も承ります。",
      summary: "Apply"
    },
    { 
      id: "05", 
      icon: <CreditCard className="w-6 h-6" />, 
      title: "お支払い", 
      desc: "当社の見積もり金額を事前に指定口座までお振込みいただきます。ご入金を確認次第、医療期間への予約を行います。",
      summary: "Payment"
    },
    { 
      id: "06", 
      icon: <Plane className="w-6 h-6" />, 
      title: "来日時の対応", 
      desc: "お客様のご希望に応じて、秘書・通訳の派遣等のサービスを提供いたします。",
      summary: "Arrival"
    },
    { 
      id: "07", 
      icon: <Stethoscope className="w-6 h-6" />, 
      title: "検査・治療", 
      desc: "お客様の滞在スケジュールに従って、希求される健康診断（人間ドック）・検診・治療を行います。この際、提携医療専門通訳士が同行いたします。",
      summary: "Medical"
    },
    { 
      id: "08", 
      icon: <HeartHandshake className="w-6 h-6" />, 
      title: "アフターフォロー", 
      desc: "結果を翻訳し送付いたします。お客様のご要望に応じ、日本の医療機関における継続治療や経過確認などをサポートいたします。",
      summary: "Aftercare"
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- DESKTOP ANIMATION ---
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".flow-card-stack");
        const totalCards = cards.length;
        
        // Setup initial states manually to prevent FOUC
        cards.forEach((card, i) => {
          if (i !== 0) {
            gsap.set(card, { yPercent: 110, opacity: 0 }); 
          } else {
            gsap.set(card, { yPercent: 0, opacity: 1, scale: 1 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80px",
            end: `+=${window.innerHeight * (totalCards * 0.8)}`, 
            pin: true,
            scrub: 0.5, 
            refreshPriority: 1,
            onUpdate: (self) => {
              const segment = 1 / (totalCards - 1);
              const currentIndex = Math.round(self.progress / segment);
              const safeIndex = Math.min(Math.max(currentIndex, 0), totalCards - 1);
              setActiveStep(safeIndex);
            }
          }
        });

        for (let i = 1; i < totalCards; i++) {
          tl
            .to(cards[i], {
              yPercent: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out"
            })
            .to(cards[i-1], {
              scale: 0.95,
              opacity: 0, 
              duration: 1,
              ease: "power2.out"
            }, "<"); 
        }
      });

      // --- MOBILE ANIMATION ---
      mm.add("(max-width: 1023px)", () => {
         gsap.utils.toArray(".flow-card-stack").forEach((card: any) => {
            gsap.fromTo(card, 
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                }
              }
            );
         });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="flow" ref={containerRef} className="relative bg-slate-50 lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-[80vw] h-[80vw] bg-aurora-blue/10 rounded-full blur-[100px] transition-all duration-1000 ease-in-out ${activeStep % 2 === 0 ? 'translate-x-10 opacity-100' : 'translate-x-20 opacity-50'}`}></div>
        <div className={`absolute bottom-0 left-0 w-[80vw] h-[80vw] bg-aurora-purple/10 rounded-full blur-[100px] transition-all duration-1000 ease-in-out ${activeStep % 2 === 0 ? '-translate-y-10 opacity-50' : 'translate-y-10 opacity-100'}`}></div>
      </div>

      {/* LEFT PANEL: Control Center (Sticky) */}
      <div className="lg:w-1/2 w-full px-6 md:px-12 py-12 lg:py-0 flex flex-col justify-center relative z-10 lg:h-full">
        <div className="max-w-2xl w-full flex gap-8">
          
          {/* 1. Vertical Timeline Stepper (Dots Only - Labels Removed to Prevent Overlap) */}
          <div className="hidden lg:flex flex-col items-center relative py-4">
             {/* Background Line */}
             <div className="absolute top-4 bottom-4 left-[9px] w-[2px] bg-slate-100"></div>
             {/* Progress Line */}
             <div 
                className="absolute top-4 left-[9px] w-[2px] bg-gradient-to-b from-aurora-blue to-aurora-purple transition-all duration-500 ease-out"
                style={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
             ></div>

             {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="relative flex items-center mb-6 last:mb-0 z-10 group cursor-pointer"
                  onClick={() => {
                     // Click handler if needed
                  }}
                >
                   {/* Node Dot */}
                   <div className={`
                      w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-white
                      ${activeStep >= index ? 'border-aurora-blue scale-110' : 'border-slate-200'}
                      ${activeStep === index ? 'ring-4 ring-blue-50' : ''}
                   `}>
                      {activeStep >= index && <div className="w-2 h-2 rounded-full bg-aurora-blue"></div>}
                   </div>
                </div>
             ))}
          </div>

          {/* 2. Main Content Area */}
          <div className="flex-1">
            <p className="text-aurora-blue text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
               <span className="w-8 h-[1px] bg-aurora-blue"></span>
               Process Flow
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-slate-800 mb-12">予約の流れ</h2>
            
            {/* Dynamic Content Switching - Increased height to prevent overlap */}
            <div className="relative h-[380px] hidden lg:block">
               {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
                      activeStep === index 
                        ? "opacity-100 translate-y-0 scale-100 blur-0 pointer-events-auto" 
                        : activeStep > index 
                          ? "opacity-0 -translate-y-8 scale-95 blur-sm pointer-events-none" 
                          : "opacity-0 translate-y-8 scale-95 blur-sm pointer-events-none"
                    }`}
                  >
                     {/* Header: Number + Icon */}
                     <div className="flex items-end gap-4 mb-6 border-b border-slate-100 pb-4">
                        <span className="text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-aurora-blue to-aurora-purple leading-none">
                          {step.id}
                        </span>
                        <div className="mb-2 p-2 bg-blue-50 text-aurora-blue rounded-full">
                           {step.icon}
                        </div>
                        {/* Removed the 'Step XX/08' text here if it was causing clutter, keeping just the clean layout or simplifying it */}
                        <span className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-3 ml-auto">
                           Step {step.id}
                        </span>
                     </div>
                     
                     <h3 className="text-3xl font-serif text-slate-800 mb-6">{step.title}</h3>
                     
                     <p className="text-slate-600 font-light leading-8 text-lg">
                       {step.desc}
                     </p>
                  </div>
               ))}
            </div>

            <p className="text-slate-500 font-light text-sm lg:hidden mt-4">
               スクロールして各ステップをご確認ください
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Card Stack */}
      <div ref={wrapperRef} className="lg:w-1/2 w-full lg:h-full relative px-6 md:px-12 pb-24 lg:pb-0 flex items-center justify-center perspective-1000">
        <div className="relative w-full max-w-md h-[450px] md:h-[550px]">
           {steps.map((step, index) => {
              return (
              <div 
                key={index}
                className={`
                  flow-card-stack 
                  w-full h-full 
                  bg-white/95 backdrop-blur-xl border border-white shadow-2xl rounded-2xl p-8 md:p-10 
                  flex flex-col justify-between 
                  mb-8 lg:mb-0
                  lg:absolute lg:top-0 lg:left-0
                  will-change-transform
                `}
                style={{ 
                  zIndex: index + 10
                }}
              >
                 {/* Decorative Header inside Card */}
                 <div className="flex justify-between items-center border-b border-slate-100 pb-6 mb-4">
                    <div className="flex items-center gap-3">
                       <span className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-aurora-blue to-aurora-purple">
                          {step.id}
                       </span>
                       <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-2">
                          {step.summary}
                       </span>
                    </div>
                    <div className="p-2 bg-blue-50/50 rounded-full text-aurora-blue">
                       {step.icon}
                    </div>
                 </div>

                 {/* Main Content */}
                 <div>
                    <h4 className="text-2xl font-serif text-slate-800 mb-4 lg:hidden">{step.title}</h4>
                    <p className="text-slate-600 leading-7 font-light text-justify text-base">
                       {step.desc}
                    </p>
                 </div>

                 {/* Footer inside Card */}
                 <div className="pt-6 border-t border-slate-100 flex justify-between items-center mt-auto">
                    <span className="text-[10px] tracking-widest uppercase text-slate-400">IMTS Process Flow</span>
                    <div className="flex gap-1">
                       {Array.from({ length: 3 }).map((_, i) => (
                         <div key={i} className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-aurora-blue' : 'bg-slate-200'}`}></div>
                       ))}
                    </div>
                 </div>
              </div>
           )})}
        </div>
      </div>

    </section>
  );
};

export default Flow;