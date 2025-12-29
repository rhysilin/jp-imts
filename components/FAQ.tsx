import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, MessageCircleQuestion } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQ: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const faqData = [
    {
      category: "来日前の諸手続き",
      items: [
        { q: "検診の受け入れ先の決定には、どのような情報が必要？", a: "主治医の診断書や検査結果、MRI・CTスキャンの画像データなどが必要です。これらを基に、提携する専門医が最適な医療機関を選定いたします。" },
        { q: "診断書の言語は母国語でも大丈夫？", a: "基本的に中国語・英語・日本語で書かれたものであればスムーズですが、他の言語でも翻訳チームが対応可能ですのでご安心ください。" },
        { q: "自分で医療機関や治療法を選択することはできる？", a: "可能です。お客様のご希望を最優先いたしますが、専門的な分析結果に基づき、より治療効果が高いと思われる他の医療機関をご提案する場合もございます。" }
      ]
    },
    {
      category: "医療費・その他",
      items: [
        { q: "クレジットカードの取り扱いは？", a: "多くの提携医療機関で利用可能ですが、一部検査費用など現金のみの場合もございます。事前に概算と支払方法をご案内いたします。" },
        { q: "日本語を話すことができない場合は？", a: "医療通訳士の資格を持つスタッフが同行いたします。また、滞在中の生活サポート通訳も手配可能ですので、言葉の心配はございません。" }
      ]
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background Text Parallax
      gsap.to(".faq-bg-text", {
        y: 100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Staggered Entrance for Columns
      gsap.from(".faq-column", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-grid",
          start: "top 80%"
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={containerRef} className="py-32 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-full blur-[100px] opacity-60"></div>
         <div className="faq-bg-text absolute top-20 right-[-5%] text-[15rem] font-serif font-bold text-slate-100/60 leading-none opacity-50 select-none">
            FAQ
         </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center">
           <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aurora-blue to-aurora-purple text-white flex items-center justify-center shadow-lg shadow-blue-200">
                 <MessageCircleQuestion className="w-8 h-8" />
              </div>
           </div>
           <p className="text-aurora-blue text-xs tracking-[0.3em] font-bold uppercase mb-4">Q & A</p>
           <h2 className="text-3xl md:text-5xl font-serif text-slate-800">よくある質問</h2>
        </div>

        {/* 2-Column Grid */}
        <div className="faq-grid grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {faqData.map((group, idx) => (
            <div key={idx} className="faq-column space-y-6">
              
              <div className="flex items-center gap-4 mb-8 border-b border-slate-200 pb-4">
                 <span className="text-4xl font-serif text-slate-200 font-bold">0{idx + 1}</span>
                 <h3 className="text-lg font-bold text-slate-700 tracking-wider">{group.category}</h3>
              </div>

              <div className="space-y-4">
                {group.items.map((item, i) => (
                  <AccordionItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AccordionItem: React.FC<{ q: string, a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Height Animation
    if (!contentRef.current) return;
    
    if (isOpen) {
      gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" });
      gsap.to(cardRef.current, { backgroundColor: "rgba(255, 255, 255, 0.95)", borderColor: "#4A90E2", boxShadow: "0 10px 30px -10px rgba(74, 144, 226, 0.15)", duration: 0.3 });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power3.in" });
      gsap.to(cardRef.current, { backgroundColor: "rgba(255, 255, 255, 0.6)", borderColor: "rgba(255, 255, 255, 0.8)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", duration: 0.3 });
    }
  }, [isOpen]);

  return (
    <div 
      ref={cardRef}
      className="group relative bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/80"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-6 flex justify-between items-start text-left gap-4"
      >
        <div className="flex gap-4">
          <span className={`font-serif font-bold text-lg transition-colors duration-300 ${isOpen ? 'text-aurora-blue' : 'text-slate-400'}`}>Q.</span>
          <span className={`font-medium text-slate-800 leading-relaxed transition-colors duration-300 ${isOpen ? 'text-aurora-dark' : 'text-slate-700'}`}>
            {q}
          </span>
        </div>
        
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-aurora-blue text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-aurora-blue'}`}>
           {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <div className="px-6 pb-6 pt-0 pl-[3.5rem]">
           <div className="w-full h-[1px] bg-slate-100 mb-4"></div>
           <p className="text-slate-600 font-light leading-7 text-sm text-justify">
             {a}
           </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;