import React, { useState, useEffect, useCallback } from 'react';
import { ImageUploader } from './ImageUploader';
import { ImageComparer } from './ImageComparer';

interface ImageState {
  file: File;
  url: string;
  size: number;
}

export const ImageCompressorTool: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageState | null>(null);
  const [compressedImage, setCompressedImage] = useState<{ url: string; size: number } | null>(null);
  const [compressionLevel, setCompressionLevel] = useState(0.75);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setOriginalImage({
          file,
          url: e.target.result as string,
          size: file.size,
        });
        setCompressedImage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const compressImage = useCallback(async () => {
    if (!originalImage) return;

    setIsCompressing(true);

    const image = new Image();
    image.src = originalImage.url;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(image, 0, 0);
        
        const compressedDataUrl = canvas.toDataURL('image/jpeg', compressionLevel);

        const base64Data = compressedDataUrl.split(',')[1];
        const binaryData = atob(base64Data);
        const size = binaryData.length;
        
        setCompressedImage({
          url: compressedDataUrl,
          size: size,
        });
      }
      setIsCompressing(false);
    };
    image.onerror = () => {
      console.error("Error loading image for compression.");
      setIsCompressing(false);
    }
  }, [originalImage, compressionLevel]);

  useEffect(() => {
    if (originalImage) {
      const timer = setTimeout(() => {
        compressImage();
      }, 300); // Debounce compression
      return () => clearTimeout(timer);
    }
  }, [originalImage, compressionLevel, compressImage]);
  
  const resetApp = () => {
    setOriginalImage(null);
    setCompressedImage(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {!originalImage ? (
        <ImageUploader onImageUpload={handleImageUpload} />
      ) : (
        <ImageComparer
          originalImage={originalImage}
          compressedImage={compressedImage}
          compressionLevel={compressionLevel}
          setCompressionLevel={setCompressionLevel}
          isCompressing={isCompressing}
          onReset={resetApp}
        />
      )}
    </div>
  );
};
