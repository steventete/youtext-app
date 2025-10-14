import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-semibold text-[--color-text-secondary]">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`bg-base shadow-inset rounded-md px-4 py-3 focus:outline-none focus:shadow-neumorphic transition-all duration-300 placeholder:text-[--color-text-secondary] placeholder:opacity-50 ${className}`}
      />
    </div>
  );
};

export default Input;