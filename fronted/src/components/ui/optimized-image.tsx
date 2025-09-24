import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  quality?: 'low' | 'medium' | 'high';
  lazy?: boolean;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className,
  quality = 'medium',
  lazy = true,
  fallback = 'https://images.unsplash.it/400/400?random',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    setImageSrc(fallback);
    onError?.();
  }, [fallback, onError]);

  // Quality-based optimization (mock implementation)
  const getOptimizedSrc = (originalSrc: string, quality: string) => {
    if (originalSrc.includes('unsplash')) {
      const size = quality === 'high' ? '800' : quality === 'medium' ? '600' : '400';
      return originalSrc.replace(/(\d+)x(\d+)/, `${size}x${size}`);
    }
    return originalSrc;
  };

  const optimizedSrc = hasError ? imageSrc : getOptimizedSrc(imageSrc, quality);

  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      {isLoading && (
        <div className="absolute inset-0 animate-shimmer" />
      )}
      <img
        src={optimizedSrc}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
      />
    </div>
  );
}