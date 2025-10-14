import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "inset";
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "default", 
  className = "",
  ...props 
}) => {
  const base =
    "px-5 py-3 rounded-md font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const styles =
    variant === "default"
      ? "bg-accent text-white shadow-[4px_4px_12px_rgba(255,0,0,0.3),-4px_-4px_12px_rgba(255,255,255,0.8)] hover:shadow-[6px_6px_16px_rgba(255,0,0,0.4),-6px_-6px_16px_rgba(255,255,255,0.9)] hover:scale-[1.02] active:scale-[0.98]"
      : "bg-base shadow-[--shadow-inset] hover:shadow-[--shadow-neumorphic] active:shadow-[--shadow-inset]";

  return (
    <button {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
};

export default Button;