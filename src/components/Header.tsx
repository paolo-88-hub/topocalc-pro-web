import React from 'react';
import { Icon, IconName } from './Icon';

export function Header({
  title,
  subtitle,
  icon = 'compass',
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: IconName;
  right?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-primary px-5 pt-6 pb-5 sm:pt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <Icon name={icon} size={18} className="text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-white text-[15px] font-semibold leading-tight">{title}</h1>
          {subtitle && <p className="text-white/50 text-[11px] mt-0.5">{subtitle}</p>}
        </div>
        {right && <div className="ml-auto">{right}</div>}
      </div>
      {children}
    </div>
  );
}
