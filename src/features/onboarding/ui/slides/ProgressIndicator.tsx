'use client';

interface ProgressIndicatorProps {
  currentSlide: number;
  totalSlides: number;
}

export function ProgressIndicator({ currentSlide, totalSlides }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalSlides }, (_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            index + 1 === currentSlide ? 'bg-[var(--main-5)]' : 'bg-[var(--gray)]'
          }`}
        />
      ))}
    </div>
  );
}
