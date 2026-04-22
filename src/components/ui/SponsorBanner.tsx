import React from 'react';
import { Award } from 'lucide-react';

export function SponsorBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm md:text-base">
        <Award size={18} />
        <span className="font-semibold">SPONSOR OFICIAL</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">Iron Team Argentina</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">Iron Man 70.3</span>
      </div>
    </div>
  );
}
