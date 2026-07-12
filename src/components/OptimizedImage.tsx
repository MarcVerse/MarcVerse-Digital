import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageOff, RefreshCw } from 'lucide-react';

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'placeholder'> {
  /**
   * Src of the image to display.
   */
  src: string;
  
  /**
   * Alternative text for accessibility.
   */
  alt: string;
  
  /**
   * Tailwind classes to apply to the wrapper container.
   */
  className?: string;
  
  /**
   * Tailwind classes to apply specifically to the img element.
   */
  imageClassName?: string;
  
  /**
   * Optional custom loading skeleton placeholder class.
   */
  skeletonClassName?: string;
  
  /**
   * Aspect ratio class to prevent layout shifts (CLS).
   * E.g. 'aspect-video', 'aspect-[4/3]', 'aspect-[4/5]'.
   */
  aspectRatioClass?: string;
  
  /**
   * Enable/disable the shimmer effect on the loading skeleton.
   */
  shimmer?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  skeletonClassName = '',
  aspectRatioClass = 'aspect-auto',
  shimmer = true,
  loading = 'lazy',
  referrerPolicy = 'no-referrer',
  ...restProps
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    setHasError(false);
    setRetryKey(prev => prev + 1);
  };

  return (
    <div 
      className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-800/50 ${aspectRatioClass} ${className}`}
    >
      {/* Loading Shimmer / Skeleton */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 z-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${skeletonClassName}`}
          >
            {shimmer ? (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent animate-shimmer -translate-x-full" 
                style={{
                  backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0) 100%)',
                  animation: 'shimmer 1.6s infinite',
                }}
              />
            ) : null}
            
            {/* Subtle animated loader indicator */}
            <div className="w-8 h-8 rounded-full border-2 border-emerald-500/10 border-t-emerald-500 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Fallback State */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-zinc-50 dark:bg-zinc-900/60 text-zinc-400 dark:text-zinc-500 select-none">
          <ImageOff className="w-8 h-8 mb-2 text-zinc-300 dark:text-zinc-700 stroke-[1.5]" />
          <p className="font-sans text-xs font-medium">Image failed to load</p>
          <button
            onClick={handleRetry}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none"
            type="button"
          >
            <RefreshCw className="w-3 h-3 animate-hover-spin" />
            Retry
          </button>
        </div>
      ) : (
        /* The Actual Image Component */
        <motion.img
          key={`${src}-${retryKey}`}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          referrerPolicy={referrerPolicy}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ 
            opacity: isLoading ? 0 : 1, 
            scale: isLoading ? 1.02 : 1 
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`w-full h-full object-cover ${imageClassName}`}
          {...restProps}
        />
      )}
    </div>
  );
}
