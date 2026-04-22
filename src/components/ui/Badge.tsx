import React from 'react';

interface BadgeProps {
  type: 'new' | 'top';
  className?: string;
}

export function Badge({ type, className = '' }: BadgeProps) {
  const baseClasses =
    'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider';

  const typeClasses =
    type === 'new'
      ? 'bg-green-500'
      : type === 'top'
        ? 'bg-red-500'
        : '';

  return (
    <div className={`${baseClasses} ${typeClasses} ${className}`}>
      {type === 'new' ? 'Nuevo' : 'Top'}
    </div>
  );
}
