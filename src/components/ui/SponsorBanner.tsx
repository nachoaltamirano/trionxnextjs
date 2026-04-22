import React from 'react';
import { Award } from 'lucide-react';

export function SponsorBanner() {
  return (
    <div className="bg-red-600 text-white py-4 px-4 border-b-2 border-black" style={{ marginTop: 'var(--navbar-height, 0)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm md:text-base">
        <Award size={20} strokeWidth={3} />
        <span className="font-black uppercase tracking-widest">Sponsor Oficial</span>
        <span className="text-white/60">•</span>
        <span className="hidden sm:inline font-black uppercase tracking-widest">Iron Team Argentina</span>
      </div>
    </div>
  );
}
