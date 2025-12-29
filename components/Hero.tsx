import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Canvas Animation: "Vital Flow" (Life/DNA/Waves) - KEPT EXACTLY AS REQUESTED
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let animationFrameId: number;
    let time = 0;

    const lines = [
      { color: 'rgba(74, 144, 226, 0.4)', speed: 0.002, amplitude: 50, offset: 0 },   // Blue (More visible)
      { color: 'rgba(80, 227, 194, 0.3)', speed: 0.003, amplitude: 30, offset: 2 },    // Cyan
      { color: 'rgba(155, 81, 224, 0.2)', speed: 0.001, amplitude: 70, offset: 4 },   // Purple
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.5;

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2; 

        for (let x = 0; x <= width; x += 5) {
          const y = height / 2 + 
            Math.sin(x * 0.003 + time * line.speed + line.offset) * line.amplitude +
            Math.sin(x * 0.01 + time * line.speed * 2) * 20;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Text Entrance Animation
      tl.from(".hero-text-en", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        filter: "blur(10px)"
      })
      .from(".hero-title-char", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
        rotateX: -45,
        transformOrigin: "0% 50% -50",
      }, "-=0.5")
      .from(".hero-line", {
        width: 0,
        duration: 1.2,
        ease: "expo.out"
      }, "-=0.8")
      .from(".hero-concept", {
        y: 30,
        opacity: 0,
        duration: 1,
      }, "-=0.8")
      .from(".hero-scroll", {
        y: -10,
        opacity: 0,
        duration: 1
      }, "-=0.5");

      // 2. Continuous Floating Animation (Jitter Fix Applied)
      gsap.to(".hero-title-container", {
        y: 12, 
        rotation: 0.01,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true 
      });

      // 3. New Full Screen Aurora Animation
      // We animate scale, position, and rotation to create a "fluid" mixing effect
      gsap.to(".hero-aurora-blob", {
        x: "random(-100, 100)", 
        y: "random(-50, 50)",
        rotation: "random(-45, 45)",
        scale: "random(0.8, 1.4)", // Pulse effect
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 5,
          from: "random"
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      
      {/* 1. Full Screen Aurora Background Layer */}
      {/* This layer sits at z-0, behind the canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Base soft gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-white to-purple-50/20"></div>

          {/* Huge Blobs for "Flow" effect - Colors: Cyan, Pink, Blue */}
          
          {/* Cyan Blob - Bottom Left flowing up */}
          <div className="hero-aurora-blob absolute -bottom-[20%] -left-[10%] w-[90vw] h-[90vw] bg-aurora-cyan/30 rounded-full blur-[120px] mix-blend-multiply filter"></div>
          
          {/* Pink Blob - Top Right flowing down */}
          <div className="hero-aurora-blob absolute -top-[20%] -right-[10%] w-[90vw] h-[90vw] bg-aurora-pink/25 rounded-full blur-[120px] mix-blend-multiply filter"></div>
          
          {/* Blue Blob - Top Left/Center */}
          <div className="hero-aurora-blob absolute top-[0%] left-[10%] w-[80vw] h-[80vw] bg-aurora-blue/20 rounded-full blur-[100px] mix-blend-multiply filter"></div>

          {/* Secondary Purple accent for depth - Bottom Right */}
          <div className="hero-aurora-blob absolute bottom-[10%] right-[0%] w-[60vw] h-[60vw] bg-aurora-purple/20 rounded-full blur-[100px] mix-blend-multiply filter"></div>
      </div>

      {/* 2. Canvas Background: Vital Flow (Lines) - Sits on top of Aurora */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-1 pointer-events-none opacity-80"
      />
      
      {/* 3. Content - Sits on top of Canvas */}
      <div className="container mx-auto px-6 text-center z-10 relative">
        
        <p className="hero-text-en text-sm md:text-base font-bold tracking-[0.3em] text-aurora-blue uppercase mb-6 drop-shadow-sm">
          International Medical Total Service
        </p>

        {/* Title Container */}
        <div className="hero-title-container mb-10 will-change-transform backface-hidden">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-slate-800 leading-tight">
             <span className="inline-block whitespace-nowrap">
              {"株式会社".split("").map((char, i) => (
                <span key={i} className="hero-title-char inline-block">{char}</span>
              ))}
             </span>
             <br className="md:hidden" />
             <span className="inline-block whitespace-nowrap">
              {"国際医療総合サービス".split("").map((char, i) => (
                <span key={i + 4} className="hero-title-char inline-block">{char}</span>
              ))}
             </span>
          </h1>
        </div>

        <div className="hero-line h-[2px] w-24 bg-gradient-to-r from-aurora-blue to-aurora-purple mx-auto mb-10 rounded-full shadow-[0_0_15px_rgba(74,144,226,0.6)]"></div>

        <div className="hero-concept space-y-4">
          <p className="font-serif text-lg md:text-xl text-slate-600 tracking-wider">
            企業理念
          </p>
          <h2 className="text-xl md:text-3xl font-serif text-slate-800 leading-relaxed max-w-4xl mx-auto">
            「世界最高水準の最先端医療技術によって<br/>
            健康寿命維持をすべてのお客様に」
          </h2>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 z-20">
        <span className="text-[10px] tracking-widest uppercase text-slate-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;