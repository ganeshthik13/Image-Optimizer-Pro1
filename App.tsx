import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ImageCompressorTool } from './components/ImageCompressorTool';
import { AdsenseBlock } from './components/AdsenseBlock';
import { Footer } from './components/Footer';

export type Tool = 'imageCompressor' | 'imageResizer' | 'imageConverter' | 'pdfCompressor' | 'pdfMerge' | 'pdfSplit';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool | 'home'>('home');

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'imageCompressor':
        return <ImageCompressorTool />;
      // Add cases for other tools here in the future
      // case 'imageResizer':
      //   return <ImageResizerTool />;
      default:
        return <HomePage onToolSelect={setActiveTool} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogoClick={() => setActiveTool('home')} />
      <main className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Main Content */}
          <div className="flex-1">
            {renderActiveTool()}
          </div>
          
          {/* Sidebar for Ads */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
               <div className="hidden lg:block">
                  <AdsenseBlock adSlot="YOUR_AD_SLOT_ID_SIDEBAR" adFormat="auto" fullWidthResponsive={true} style={{ display: 'block' }} />
                </div>
              <div className="p-5 bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">How It Works</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Select a tool.</li>
                  <li>Upload your file(s).</li>
                  <li>Adjust settings.</li>
                  <li>Download your result.</li>
                </ol>
              </div>
               <div className="lg:hidden">
                    <AdsenseBlock adSlot="YOUR_AD_SLOT_ID_RESPONSIVE" style={{ display: 'block' }} />
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
