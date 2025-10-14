import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-base shadow-neumorphic rounded-md p-6 hover:shadow-hover transition-all duration-500 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;