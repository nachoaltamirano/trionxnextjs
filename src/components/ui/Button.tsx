import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'font-black uppercase tracking-widest transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    secondary: 'bg-black text-white hover:bg-gray-900 active:bg-gray-800',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={{ borderRadius: '2px' }}
      {...props}
    />
  );
}
