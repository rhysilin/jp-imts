import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCookie(true), 2000);
  }, []);

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 border-t border-slate-800">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12">
        
        <div>
          <h2 className="text-2xl font-serif font-bold mb-2">株式会社国際医療総合サービス</h2>
          <p className="text-[10px] tracking-[0.2em] text-slate-500 uppercase mb-8">International Medical Total Service</p>
          <a href="mailto:info@imts.jp" className="text-sm border-b border-slate-600 pb-1 hover:text-aurora-cyan transition-colors">info@imts.jp</a>
        </div>

        <div className="text-right">
           <p className="text-[10px] text-slate-600 tracking-wider">
             Copyright © 2019 imts. All Rights Reserved.
           </p>
        </div>

      </div>

      {/* Minimal Cookie Banner */}
      {showCookie && (
        <div className="fixed bottom-4 right-4 max-w-sm bg-white/90 backdrop-blur-md text-slate-800 p-6 shadow-2xl z-50 flex flex-col gap-4 border border-white/50 rounded-lg">
          <p className="text-xs text-slate-600 leading-relaxed">
            当サイトでは、ユーザー体験向上のためにCookieを使用しています。
          </p>
          <div className="flex gap-4">
            <button onClick={() => setShowCookie(false)} className="text-xs font-bold border-b border-slate-800 pb-0.5 hover:text-aurora-blue hover:border-aurora-blue transition-colors">同意する</button>
            <button onClick={() => setShowCookie(false)} className="text-xs text-slate-400 hover:text-slate-800 transition-colors">閉じる</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;