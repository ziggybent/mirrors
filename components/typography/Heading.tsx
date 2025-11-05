import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<HeadingProps> = ({ children, className = '' }) => {
  return <h1 className={`text-h1 font-inter ${className}`.trim()}>{children}</h1>;
};

export const H2: React.FC<HeadingProps> = ({ children, className = '' }) => {
  return <h2 className={`text-h2 font-inter ${className}`.trim()}>{children}</h2>;
};

export const H3: React.FC<HeadingProps> = ({ children, className = '' }) => {
  return <h3 className={`text-h3 font-inter ${className}`.trim()}>{children}</h3>;
};

export const H4: React.FC<HeadingProps> = ({ children, className = '' }) => {
  return <h4 className={`text-h4 font-inter ${className}`.trim()}>{children}</h4>;
};
