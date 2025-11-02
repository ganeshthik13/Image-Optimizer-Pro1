import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
        <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Online Image Compressor</h1>
            <p className="mt-2 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
                Drastically reduce the file size of your JPEG, PNG, and WEBP images without compromising quality.
            </p>
        </div>
        <label
            htmlFor="image-upload"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`mt-6 group flex flex-col items-center justify-center w-full min-h-[18rem] p-6 sm:p-8 border border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden
                ${isDragging
                    ? 'ring-4 ring-offset-2 ring-blue-500 dark:ring-offset-slate-900 bg-blue-50 dark:bg-slate-800'
                    : 'hover:border-blue-500 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
        >
            <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/40 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:[mask-image:linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent)] group-hover:opacity-50 transition-opacity"></div>
            <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10 text-center">
                <div className={`p-4 rounded-full transition-all duration-300 ${isDragging ? 'bg-blue-100 dark:bg-blue-900/30 scale-110' : 'bg-slate-100 dark:bg-slate-700 group-hover:scale-105'}`}>
                    <UploadIcon className={`w-10 h-10 transition-colors ${isDragging ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400'}`} />
                </div>
                <p className="mb-2 text-lg font-semibold text-slate-700 dark:text-slate-300 mt-4">
                    <span className="text-blue-500 dark:text-blue-400">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 px-4">
                    Supports JPEG, PNG, WEBP (Max. 10MB)
                </p>
            </div>
            <input id="image-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/jpeg,image/png,image/webp" />
        </label>
    </div>
  );
};