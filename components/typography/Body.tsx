import React from 'react';

type BodySize = 'xl' | 'lg' | 'default' | 'sm' | 'xs';

interface BodyProps {
  size?: BodySize;
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
}

const sizeClasses: Record<BodySize, string> = {
  'xl': 'text-body-xl',
  'lg': 'text-body-lg',
  'default': 'text-body',
  'sm': 'text-body-sm',
  'xs': 'text-body-xs',
};

export const Body: React.FC<BodyProps> = ({
  size = 'default',
  children,
  className = '',
  as: Component = 'p',
}) => {
  const classes = `${sizeClasses[size]} font-inter ${className}`.trim();

  return <Component className={classes}>{children}</Component>;
};

export default Body;
