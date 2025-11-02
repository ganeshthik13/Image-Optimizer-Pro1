import React from 'react';
import { ToolCard } from './ToolCard';
import { CompressIcon, ResizeIcon, ConvertIcon, PdfIcon, MergeIcon, SplitIcon } from './icons';
import { Tool } from '../App';

interface HomePageProps {
  onToolSelect: (tool: Tool) => void;
}

const imageTools = [
  { 
    slug: 'imageCompressor' as Tool,
    icon: CompressIcon, 
    title: 'Image Compressor', 
    description: 'Reduce file size of JPG, PNG, and WEBP images.' 
  },
  { 
    slug: 'imageResizer' as Tool,
    icon: ResizeIcon, 
    title: 'Image Resizer', 
    description: 'Resize images to specific dimensions online.' 
  },
  { 
    slug: 'imageConverter' as Tool,
    icon: ConvertIcon, 
    title: 'Image Converter', 
    description: 'Convert images to different formats like JPG, PNG, WEBP.' 
  },
];

const pdfTools = [
  { 
    slug: 'pdfCompressor' as Tool,
    icon: PdfIcon, 
    title: 'PDF Compressor', 
    description: 'Reduce the file size of your PDF files.' 
  },
  { 
    slug: 'pdfMerge' as Tool,
    icon: MergeIcon, 
    title: 'Merge PDF', 
    description: 'Combine multiple PDF files into a single document.' 
  },
  { 
    slug: 'pdfSplit' as Tool,
    icon: SplitIcon, 
    title: 'Split PDF', 
    description: 'Extract pages from a PDF file into separate documents.' 
  },
];

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-3">
     <span className="w-3 h-3 rounded-full bg-blue-500"></span>
     {children}
  </h2>
);

export const HomePage: React.FC<HomePageProps> = ({ onToolSelect }) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="text-center p-8 md:p-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200/50 dark:bg-blue-900/50 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-sky-200/50 dark:bg-sky-900/50 rounded-full filter blur-3xl opacity-50"></div>
        <div className="relative">
            <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-400 pb-2">
              Your Complete Toolkit for Files
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              Quickly compress, convert, and edit your images and PDFs with our collection of free, easy-to-use online tools. Secure and client-side.
            </p>
        </div>
      </div>

      <section>
        <SectionTitle>Image Tools</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {imageTools.map((tool) => (
            <ToolCard 
              key={tool.slug}
              icon={<tool.icon className="w-8 h-8 text-blue-500 transition-transform duration-300 group-hover:scale-110" />}
              title={tool.title}
              description={tool.description}
              onClick={() => onToolSelect(tool.slug)}
              disabled={tool.slug !== 'imageCompressor'}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>PDF Tools</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfTools.map((tool) => (
            <ToolCard 
              key={tool.slug}
              icon={<tool.icon className="w-8 h-8 text-red-500 transition-transform duration-300 group-hover:scale-110" />}
              title={tool.title}
              description={tool.description}
              onClick={() => { /* onToolSelect(tool.slug) - Enable when tool is ready */ }}
              disabled
            />
          ))}
        </div>
      </section>
    </div>
  );
};
