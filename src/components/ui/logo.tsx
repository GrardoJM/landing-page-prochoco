import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`font-headline text-2xl font-bold tracking-tight ${className}`}>
      ProChoco
    </div>
  );
}
