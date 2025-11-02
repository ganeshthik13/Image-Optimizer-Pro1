import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageComparer } from './components/ImageComparer';
import { AdsenseBlock } from './components/AdsenseBlock';
import { Footer } from './components/Footer';

interface ImageState {
  file: File;
  url: string;
  size: number;
}

const App: React.FC = () => {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1">
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
                <div className="lg:hidden">
                    <AdsenseBlock adSlot="YOUR_AD_SLOT_ID_RESPONSIVE" style={{ display: 'block' }} />
                </div>
            </div>
          </div>
          
          {/* Sidebar for Ads */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
               <div className="hidden lg:block">
                  <AdsenseBlock adSlot="YOUR_AD_SLOT_ID_SIDEBAR" adFormat="auto" fullWidthResponsive={true} style={{ display: 'block' }} />
                </div>
              <div className="p-5 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">How It Works</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Upload a JPEG, PNG, or WEBP image.</li>
                  <li>Adjust the slider for the perfect quality.</li>
                  <li>See a live preview of the result.</li>
                  <li>Download your optimized image.</li>
                </ol>
              </div>
            </div>
          </aside>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;