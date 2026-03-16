'use client';

import { GraduationCap, BookOpen } from 'lucide-react';

export function SchoolLogo() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="relative">
        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-lg flex items-center justify-center">
          <BookOpen className="w-3 h-3 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-emerald-400 font-bold text-lg leading-tight">ANHS</span>
        <span className="text-zinc-500 text-xs">Student Portal</span>
      </div>
    </div>
  );
}