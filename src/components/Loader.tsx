import React from "react";

const Loader: React.FC = () => (
  <div className="flex flex-col items-center gap-4 py-8">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-[--color-dark-shadow] border-t-accent animate-spin" />
      <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-b-accent animate-spin animation-delay-150" />
    </div>
    <p className="text-sm text-[--color-text-secondary] animate-pulse">
      Extracting transcript...
    </p>
  </div>
);

export default Loader;