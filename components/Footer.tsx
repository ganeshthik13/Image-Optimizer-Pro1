import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} DevTools. All processing is done on your device.</p>
      </div>
    </footer>
  );
};
