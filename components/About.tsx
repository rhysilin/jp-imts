import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Globe, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. The connecting "Life Line" animation
      gsap.from(lineRef.current, {
        height: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      });

      // 2. Text Reveals
      gsap.utils.toArray('.reveal-text').forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0, filter: "blur(5px)" },
          { 
            y: 0, 
            opacity: 1, 
            filter: "blur(0px)",
            duration: 1, 
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 3. Cards Stagger
      gsap.from(".feature-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        }
      });

      // 4. Parallax Background "2014"
      gsap.to(".bg-year", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-24 md:py-40 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-20 left-10 text-[15rem] md:text-[25rem] font-serif text-slate-100/50 select-none -z-10 bg-year leading-none opacity-60">
        2014
      </div>
      
      {/* The Central "Life Line" */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200/50 -z-20 transform md:-translate-x-1/2"></div>
      <div ref={lineRef} className="absolute left-6 md:left-1/2 top-0 w-[1px] bg-gradient-to-b from-aurora-blue via-aurora-purple to-transparent -z-20 transform md:-translate-x-1/2 origin-top shadow-[0_0_8px_rgba(74,144,226,0.5)]"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* --- PART 1: ORIGIN (Full Text) --- */}
        <div className="flex flex-col md:flex-row items-end gap-12 mb-24">
          <div className="md:w-1/2 text-left md:text-right md:pr-16 relative">
             <div className="reveal-text inline-block">
                <span className="text-aurora-blue text-xs font-bold tracking-[0.3em] uppercase block mb-4">Established</span>
                <h2 className="text-4xl md:text-6xl font-serif text-slate-800 leading-tight">
                  当社の<br />
                  設立目的と概要
                </h2>
             </div>
          </div>
          <div className="md:w-1/2 md:pl-16 relative">
             <div className="absolute left-[-5px] top-4 w-2 h-2 rounded-full bg-aurora-blue md:block hidden transform -translate-x-1/2"></div>
             <p className="reveal-text text-slate-600 leading-8 font-light text-justify max-w-lg">
               当社は、日本における最先端医療技術（健康寿命維持）をアジア圏諸地域のお客様に提供する「医療ツーリズム事業」を目的として、２０１４年に設立されました。国内では、医療ツーリズム事業の先駆けとして、その地位を向上させております。
             </p>
          </div>
        </div>

        {/* --- PART 2: DEFINITION (Full Text) --- */}
        <div className="mb-24 flex justify-center reveal-text">
          <div className="relative group max-w-4xl w-full">
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-aurora-cyan via-aurora-blue to-aurora-purple rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-white/60 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-xl shadow-xl flex flex-col md:flex-row items-start gap-10">
              <div className="md:w-1/4 flex flex-col items-center text-center pt-2">
                 <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 shadow-inner">
                    <Heart className="w-7 h-7 text-aurora-pink" strokeWidth={1.5} />
                 </div>
                 <h3 className="font-serif text-lg text-slate-800">健康寿命維持</h3>
              </div>
              <div className="md:w-3/4 border-l border-slate-200 md:pl-10">
                 <p className="text-slate-600 leading-relaxed mb-6 font-light">
                   ※健康寿命維持とは、高齢者になっても介護の必要性が無く健康的な日常生活をおくれることです。また健康寿命とは「生命の維持＋行動の維持（自律的行動」が基本として重要になります。
                 </p>
                 <div className="bg-gradient-to-r from-slate-50 to-white p-4 rounded border border-slate-100 inline-block">
                    <p className="font-serif text-base text-slate-700">
                      <span className="text-aurora-blue font-bold">生命の維持</span> ＋ <span className="text-aurora-purple font-bold">行動の維持（自律的行動）</span>
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- PART 3: SPECIFIC GOAL (Full Text) --- */}
        <div className="text-center mb-24 reveal-text max-w-3xl mx-auto">
           <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-aurora-cyan/20 text-aurora-cyan mb-6">
              <ShieldCheck className="w-6 h-6" />
           </div>
           <h3 className="text-2xl md:text-3xl font-serif text-slate-800 leading-normal">
             具体的には、「がんや心筋梗塞・脳卒中の<br className="hidden md:block" />リスクを早期発見し完全予防」をすることです。
           </h3>
        </div>

        {/* --- PART 4: 3 PILLARS (Full Text) --- */}
        <div className="mb-24">
          <div className="features-grid grid md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="feature-card group relative bg-white/40 hover:bg-white/80 backdrop-blur-md border border-white/50 p-8 rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10 flex flex-col">
              <div className="absolute top-0 right-0 p-4 text-6xl font-serif text-slate-100 group-hover:text-blue-50 transition-colors duration-300 pointer-events-none -z-10">01</div>
              <div className="w-10 h-10 bg-blue-100/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-aurora-blue group-hover:text-white transition-colors duration-300 shrink-0">
                 <Globe className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-lg text-slate-800 mb-4 border-b border-slate-200 pb-2 inline-block self-start">訪日外国人への提供</h4>
              <p className="text-sm text-slate-600 leading-7 font-light">
                訪日外国人への日本の最先端医療技術（健康寿命維持）による（健康診断や人間ドック・治療等）の提供
              </p>
            </div>

            {/* Card 2 */}
            <div className="feature-card group relative bg-white/40 hover:bg-white/80 backdrop-blur-md border border-white/50 p-8 rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/10 flex flex-col">
              <div className="absolute top-0 right-0 p-4 text-6xl font-serif text-slate-100 group-hover:text-purple-50 transition-colors duration-300 pointer-events-none -z-10">02</div>
              <div className="w-10 h-10 bg-purple-100/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-aurora-purple group-hover:text-white transition-colors duration-300 shrink-0">
                 <Activity className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-lg text-slate-800 mb-4 border-b border-slate-200 pb-2 inline-block self-start">国内機関との連携</h4>
              <p className="text-sm text-slate-600 leading-7 font-light">
                国内治療における専門的最先端医療機関との連携
              </p>
            </div>

            {/* Card 3 */}
            <div className="feature-card group relative bg-white/40 hover:bg-white/80 backdrop-blur-md border border-white/50 p-8 rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col">
              <div className="absolute top-0 right-0 p-4 text-6xl font-serif text-slate-100 group-hover:text-cyan-50 transition-colors duration-300 pointer-events-none -z-10">03</div>
              <div className="w-10 h-10 bg-teal-100/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-aurora-cyan group-hover:text-white transition-colors duration-300 shrink-0">
                 <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-lg text-slate-800 mb-4 border-b border-slate-200 pb-2 inline-block self-start">海外展開・交流</h4>
              <p className="text-sm text-slate-600 leading-7 font-light">
                アジア圏諸地域における医療機関への最先端医療技術（健康寿命維持）提供や相互交流事業の展開。
              </p>
            </div>

          </div>
        </div>

        {/* --- PART 5: GLOBAL FOOTER (Full Text) --- */}
        <div className="reveal-text bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Abstract Map Dots */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h4 className="font-serif text-2xl mb-4">Global Network</h4>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                アジア圏諸地域以外に中国には医療ツーリズム事業の営業拠点構築し、日本語、英語、中国語の多言語に対応していきます。
              </p>
            </div>
            <div className="flex gap-3 flex-wrap md:justify-end md:w-1/3">
              <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] tracking-widest uppercase bg-white/5">Japanese</span>
              <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] tracking-widest uppercase bg-white/5">English</span>
              <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] tracking-widest uppercase bg-white/5">Chinese</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;