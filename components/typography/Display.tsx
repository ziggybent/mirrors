import React from 'react';

type DisplaySize = '2xl' | 'xl' | 'lg' | 'md';

interface DisplayProps {
  size: DisplaySize;
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'p';
}

const sizeClasses: Record<DisplaySize, string> = {
  '2xl': 'text-display-2xl',
  'xl': 'text-display-xl',
  'lg': 'text-display-lg',
  'md': 'text-display-md',
};

export const Display: React.FC<DisplayProps> = ({
  size,
  children,
  className = '',
  as: Component = 'h1',
}) => {
  const classes = `${sizeClasses[size]} font-inter ${className}`.trim();

  return <Component className={classes}>{children}</Component>;
};

export default Display;
