import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdsenseBlockProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export const AdsenseBlock: React.FC<AdsenseBlockProps> = ({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: 'block' }
}) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const insElement = adRef.current;
    if (!insElement) {
      return;
    }

    // This observer will trigger the ad load only when the ad container is visible
    // in the viewport. This is more robust for this specific error,
    // as it ensures the element is not hidden (`display: none`) and has layout dimensions.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // When the ad block is visible on screen and an ad hasn't been requested for it yet.
        if (entry.isIntersecting && insElement.dataset.adStatus !== 'filled') {
          insElement.dataset.adStatus = 'filled'; // Mark as 'filled' to prevent multiple requests
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error("AdSense error: ", e);
            // In case of an error, allow a retry if it becomes visible again.
            delete insElement.dataset.adStatus;
          }
        }
      });
    });

    observer.observe(insElement);

    return () => {
      // Cleanup: disconnect the observer when the component unmounts.
      if (insElement) {
        observer.unobserve(insElement);
      }
    };
  }, []);

  // Use a placeholder in development or if AdSense fails
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    return (
        <div className="bg-slate-200 dark:bg-slate-700 flex items-center justify-center min-h-[250px] rounded-lg text-slate-500 text-sm">
            Ad Placeholder ({adSlot})
        </div>
    )
  }

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-YOUR_ADSENSE_ID"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    ></ins>
  );
};
