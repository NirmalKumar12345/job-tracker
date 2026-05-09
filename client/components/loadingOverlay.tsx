'use client';

import { Briefcase } from "lucide-react";

export default function LoadingOverlay({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      
      <div className="flex flex-col items-center gap-4">
        
        <div className="relative flex items-center justify-center">
          <span className="absolute h-28 w-28 rounded-full bg-indigo-500/30 animate-ping"></span>

          <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
            <Briefcase className="h-10 w-10 text-indigo-600 animate-bounce" />
          </div>
        </div>

        {/* Text */}
        <p className="text-white text-sm font-medium animate-pulse">
          {text}
        </p>
      </div>
    </div>
  );
}