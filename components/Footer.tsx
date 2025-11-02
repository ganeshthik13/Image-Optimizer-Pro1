import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 mt-8">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p className="font-semibold">&copy; {new Date().getFullYear()} Image Optimizer Pro. All Rights Reserved.</p>
        <p className="mt-2">
          Privacy-focused: Your images are processed entirely on your device and are never uploaded to a server.
        </p>
      </div>
    </footer>
  );
};