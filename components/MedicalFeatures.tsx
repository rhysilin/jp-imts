import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MedicalFeatures: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.feature-divider').forEach((div: any) => {
        gsap.from(div, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.5,
          scrollTrigger: {
            trigger: div,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-32 relative text-slate-800">
      {/* Soft Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white -z-10"></div>

      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header Area */}
        <div className="mb-24 md:flex justify-between items-end">
          <div className="md:w-1/2">
            <span className="block text-aurora-blue text-xs font-bold tracking-widest uppercase mb-6">Why Japan?</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-slate-800">
              日本の医療<br />
              <span className="text-3xl md:text-4xl text-slate-500">世界最高水準の理由</span>
            </h2>
          </div>
          <div className="md:w-1/3 mt-10 md:mt-0">
             <p className="text-sm text-slate-600 leading-7 font-light text-justify">
               創薬や医療機器の独自開発を経て、世界最高水準の最先端医療技術・最先端医療機関へ発展している日本医療の核心へ。
             </p>
          </div>
        </div>

        <div className="feature-divider w-full h-[1px] bg-gradient-to-r from-slate-200 to-transparent mb-20"></div>

        {/* Feature 1 */}
        <div className="grid md:grid-cols-12 gap-12 mb-32 items-center">
           <div className="md:col-span-5 md:order-1 order-2">
             <h3 className="text-3xl font-serif mb-6 text-slate-800">低侵襲医療</h3>
             <p className="text-slate-600 leading-8 font-light mb-8 text-justify">
               医療は単に病気からの回復をめざすものではなく、いかに身体に負担をかけずに効果的・効率的な治療を行うかという「低侵襲医療」を志向する時代に入りました。内視鏡手術、カテーテル、放射線治療など、身体への負担を最小限にとどめます。
             </p>
           </div>
           <div className="md:col-span-1 hidden md:block md:order-2"></div>
           <div className="md:col-span-6 md:order-3 order-1 relative group">
              <div className="aspect-[4/3] rounded-sm overflow-hidden relative shadow-2xl shadow-blue-100">
                 {/* Local Image */}
                 <img src="/images/feature-tech.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Technology" />
                 <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
              </div>
           </div>
        </div>

        <div className="feature-divider w-full h-[1px] bg-gradient-to-r from-slate-200 to-transparent mb-20"></div>

        {/* Feature 2 */}
        <div className="grid md:grid-cols-12 gap-12 items-center">
           <div className="md:col-span-6 relative group">
              <div className="aspect-[4/3] rounded-sm overflow-hidden relative shadow-2xl shadow-purple-100">
                 {/* Local Image */}
                 <img src="/images/feature-team.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Team" />
                 <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay"></div>
              </div>
           </div>
           <div className="md:col-span-1 hidden md:block"></div>
           <div className="md:col-span-5">
             <h3 className="text-3xl font-serif mb-6 text-slate-800">総合医療（チーム医療）</h3>
             <p className="text-slate-600 leading-8 font-light mb-8 text-justify">
               予防医学からリハビリテーションまでを一つの医療と捉えた総合医療。医師、看護師、薬剤師などが一体となって、患者さま中心の医療体制をつくる「チーム医療」こそ、日本医療の品質を形づくる大きな要因です。
             </p>
           </div>
        </div>

      </div>
    </section>
  );
};

export default MedicalFeatures;