import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`max-w-2xl w-full flex flex-col gap-6 ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Container;
