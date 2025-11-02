import React from 'react';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, onClick, disabled = false }) => {
  const cardClasses = `
    group relative text-left p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 transition-all duration-300
    ${disabled 
      ? 'cursor-not-allowed' 
      : 'cursor-pointer hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-500 dark:hover:border-blue-500'
    }
  `;
  
  return (
    <button onClick={onClick} className={cardClasses} disabled={disabled}>
      <div className={`transition-opacity ${disabled ? 'opacity-50' : 'opacity-100'}`}>
        <div className="mb-4 w-14 h-14 flex items-center justify-center bg-slate-100 dark:bg-slate-700/50 rounded-lg transition-colors group-hover:bg-blue-100 dark:group-hover:bg-slate-700">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-slate-600 dark:text-slate-400">{description}</p>
      </div>
      {disabled && (
        <span className="absolute top-3 right-3 text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">
          Coming Soon
        </span>
      )}
    </button>
  );
};
