'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SCContainer from '@/components/ui/core/SCContainer';
import { heroImages } from '@/constants';

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setDirection('right');
      setCurrentIndex(prevIndex =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const nextSlide = () => {
    stopAutoSlide();
    setDirection('right');
    setCurrentIndex(prevIndex =>
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
    startAutoSlide();
  };

  const prevSlide = () => {
    stopAutoSlide();
    setDirection('left');
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  return (
    <div className="my-5">
      <SCContainer>
        <section className="relative w-full h-[60vh] max-h-[600px] overflow-hidden rounded-lg">
          <AnimatePresence mode="sync" custom={direction}>
            <motion.div
              key={heroImages[currentIndex].id}
              custom={direction}
              initial={{ opacity: 0, x: direction === 'right' ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'right' ? -100 : 100 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full">
                <Image
                  src={heroImages[currentIndex].src}
                  alt={heroImages[currentIndex].alt}
                  fill
                  className="object-cover object-[0_20%]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                <div className="container mx-auto px-4 md:px-20 lg:px-40 h-full flex items-center">
                  <div className="max-w-lg text-white z-10">
                    <motion.h1
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4"
                    >
                      {heroImages[currentIndex].title}
                    </motion.h1>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="md:text-lg lg:text-xl mb-6"
                    >
                      {heroImages[currentIndex].description}
                    </motion.p>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button asChild size="lg" className="lg:text-lg">
                        <Link href={heroImages[currentIndex].link}>
                          {heroImages[currentIndex].cta}
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  stopAutoSlide();
                  setDirection(index > currentIndex ? 'right' : 'left');
                  setCurrentIndex(index);
                  startAutoSlide();
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </SCContainer>
    </div>
  );
}
