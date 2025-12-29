import React, { useLayoutEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Philosophy from './components/Philosophy';
import MedicalFeatures from './components/MedicalFeatures';
import Flow from './components/Flow';
import Notes from './components/Notes';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  // Global smooth appearance & Aurora Background Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in body
      gsap.to("body", { opacity: 1, duration: 0.5 });

      // Aurora Blob Animation
      const blobs = gsap.utils.toArray('.aurora-blob');
      blobs.forEach((blob: any) => {
        gsap.to(blob, {
          x: "random(-100, 100)",
          y: "random(-50, 50)",
          scale: "random(0.8, 1.2)",
          rotation: "random(-20, 20)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

    }, mainRef);
    return () => ctx.revert();
  }, []);

  // Encoded SVG for noise texture to avoid external fetch
  const noiseBg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E`;

  return (
    <div ref={mainRef} className="relative min-h-screen text-slate-700 overflow-x-hidden">
      
      {/* Global Aurora Background */}
      <div className="fixed inset-0 -z-50 pointer-events-none bg-slate-50">
        <div className="absolute inset-0 opacity-40 mix-blend-multiply filter blur-[80px]">
           <div className="aurora-blob absolute top-0 -left-20 w-[60vw] h-[60vw] bg-aurora-blue rounded-full opacity-40"></div>
           <div className="aurora-blob absolute top-[20%] right-0 w-[50vw] h-[50vw] bg-aurora-purple rounded-full opacity-30"></div>
           <div className="aurora-blob absolute bottom-0 left-20 w-[60vw] h-[60vw] bg-aurora-cyan rounded-full opacity-30"></div>
           <div className="aurora-blob absolute bottom-[-10%] -right-20 w-[40vw] h-[40vw] bg-aurora-pink rounded-full opacity-20"></div>
        </div>
        {/* Subtle texture overlay using local Base64 SVG */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("${noiseBg}")` }}
        ></div>
      </div>
      
      <Header />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Philosophy />
        <MedicalFeatures />
        <Flow />
        <Notes />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default App;