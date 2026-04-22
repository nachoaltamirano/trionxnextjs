import React from 'react';

interface BadgeProps {
  type: 'new' | 'top';
  className?: string;
}

export function Badge({ type, className = '' }: BadgeProps) {
  const baseClasses =
    'absolute top-4 left-4 px-4 py-2 text-xs font-black text-white uppercase tracking-widest';

  const typeClasses =
    type === 'new'
      ? 'bg-green-600'
      : type === 'top'
        ? 'bg-red-600'
        : '';

  return (
    <div className={`${baseClasses} ${typeClasses} ${className}`} style={{ borderRadius: '2px' }}>
      {type === 'new' ? 'Nuevo' : 'Top'}
    </div>
  );
}
