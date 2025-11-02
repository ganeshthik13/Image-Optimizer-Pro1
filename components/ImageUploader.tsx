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
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Online Image Compressor</h1>
            <p className="mt-2 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
                Quickly reduce the file size of your JPEG, PNG, and WEBP images.
                Perfect for optimizing images for websites and sharing online.
            </p>
        </div>
        <label
            htmlFor="image-upload"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`mt-6 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden
                ${isDragging
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
                    : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
        >
            <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/40 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                <div className={`p-3 rounded-full transition-colors ${isDragging ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-slate-100 dark:bg-slate-700'}`}>
                    <UploadIcon className={`w-10 h-10 mb-3 transition-colors ${isDragging ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
                <p className="mb-2 text-lg text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Supports JPEG, PNG, WEBP (Max. 10MB)
                </p>
            </div>
            <input id="image-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/jpeg,image/png,image/webp" />
        </label>
    </div>
  );
};