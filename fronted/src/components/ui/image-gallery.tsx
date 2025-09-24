import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent } from './dialog';
import { Button } from './button';
import { OptimizedImage } from './optimized-image';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export function ImageGallery({ images, alt, className }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openGallery = (index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') goToPrevious();
    if (event.key === 'ArrowRight') goToNext();
    if (event.key === 'Escape') closeGallery();
  };

  if (images.length === 0) return null;

  return (
    <>
      {/* Thumbnail grid */}
      <div className={cn('relative', className)}>
        <div 
          className="aspect-square cursor-pointer rounded-2xl overflow-hidden"
          onClick={() => openGallery(0)}
        >
          <OptimizedImage
            src={images[0]}
            alt={alt}
            className="h-full w-full hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            +{images.length - 1}
          </div>
        )}
      </div>

      {/* Full screen gallery modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0" onKeyDown={handleKeyDown}>
          <div className="relative h-full flex items-center justify-center bg-black">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={closeGallery}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Current image */}
            <OptimizedImage
              src={images[currentIndex]}
              alt={`${alt} - Image ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain"
              quality="high"
            />

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-xs overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      'w-12 h-12 rounded-md overflow-hidden border-2 transition-all',
                      index === currentIndex
                        ? 'border-white scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`${alt} thumbnail ${index + 1}`}
                      className="h-full w-full"
                      quality="low"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}