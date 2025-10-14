import React from "react";
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center mb-8 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Sparkles className="w-8 h-8 text-accent animate-pulse" />
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[--color-text] to-accent bg-clip-text text-transparent">
          YouText
        </h1>
      </div>
      <p className="text-sm text-[--color-text-secondary] font-medium">
        Extract YouTube video transcripts with style ✨
      </p>
    </header>
  );
};

export default Header;