import React from 'react';
import { LogoIcon } from './icons';

interface HeaderProps {
    onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={onLogoClick} className="flex items-center space-x-3 group" aria-label="Go to homepage">
            <LogoIcon className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 group-hover:opacity-80 transition-opacity">
              DevTools
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
