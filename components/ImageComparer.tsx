import React from 'react';
import { DownloadIcon, RefreshIcon } from './icons';

interface ImageComparerProps {
  originalImage: { url: string; size: number; file: File };
  compressedImage: { url: string; size: number } | null;
  compressionLevel: number;
  setCompressionLevel: (level: number) => void;
  isCompressing: boolean;
  onReset: () => void;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ImagePreview: React.FC<{ title: string; imageSrc?: string; fileSize?: number; reduction?: number; isLoading?: boolean }> = ({ title, imageSrc, fileSize, reduction, isLoading }) => (
  <div className="flex flex-col w-full">
    <h3 className="text-lg font-semibold mb-2 text-center text-slate-900 dark:text-white">{title}</h3>
    <div className="w-full aspect-square bg-slate-100 dark:bg-slate-900/50 rounded-lg overflow-hidden relative border border-slate-200 dark:border-slate-700 flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {imageSrc ? (
        <img src={imageSrc} alt={title} className="w-full h-full object-contain" />
      ) : (
        <div className="text-slate-400">Preview loading...</div>
      )}
    </div>
    <div className="text-center mt-3 h-12 flex flex-col items-center justify-center">
      {fileSize !== undefined && (
        <div className="font-semibold text-lg text-slate-800 dark:text-slate-100">{formatFileSize(fileSize)}</div>
      )}
      {reduction !== undefined && (
        <span className={`px-2.5 py-1 rounded-full text-sm font-semibold ${reduction > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
          {reduction > 0 ? `-${reduction}%` : `+${Math.abs(reduction)}%`}
        </span>
      )}
    </div>
  </div>
);


export const ImageComparer: React.FC<ImageComparerProps> = ({
  originalImage,
  compressedImage,
  compressionLevel,
  setCompressionLevel,
  isCompressing,
  onReset,
}) => {
  const reductionPercentage = compressedImage
    ? Math.round(((originalImage.size - compressedImage.size) / originalImage.size) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
                <label htmlFor="compression-slider" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Compression Quality: <span className="font-bold text-blue-600 dark:text-blue-400">{Math.round(compressionLevel * 100)}%</span>
                </label>
                <input
                    id="compression-slider"
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.01"
                    value={compressionLevel}
                    onChange={(e) => setCompressionLevel(parseFloat(e.target.value))}
                />
            </div>
             <div className="flex items-center gap-3 flex-shrink-0 pt-2 md:pt-0">
                <button
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 border border-transparent rounded-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                >
                    <RefreshIcon className="w-4 h-4" />
                    New Image
                </button>
                <a
                    href={compressedImage?.url}
                    download={`optimized-${originalImage.file.name.split('.').slice(0, -1).join('.')}.jpg`}
                    className={`flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-opacity ${!compressedImage || isCompressing ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                    aria-disabled={!compressedImage || isCompressing}
                    onClick={(e) => (!compressedImage || isCompressing) && e.preventDefault()}
                >
                    <DownloadIcon className="w-4 h-4" />
                    Download
                </a>
             </div>
        </div>
      </div>

      {/* Image Comparison */}
      <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-6">
        <ImagePreview title="Original" imageSrc={originalImage.url} fileSize={originalImage.size} />
        
        <div className="hidden md:flex flex-col items-center justify-center h-full pt-20">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-lg border-4 border-white dark:border-slate-800">
                VS
            </div>
        </div>

        <ImagePreview 
            title="Compressed" 
            imageSrc={compressedImage?.url} 
            fileSize={compressedImage?.size} 
            reduction={reductionPercentage}
            isLoading={isCompressing}
        />
      </div>
    </div>
  );
};