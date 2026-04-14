"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center min-h-[250px] flex flex-col items-center justify-center">
        <Quote className="w-10 h-10 text-rose-light mb-6 mx-auto" />
        <blockquote className="text-lg md:text-xl text-charcoal leading-relaxed mb-6 italic">
          &ldquo;{testimonials[current].quote}&rdquo;
        </blockquote>
        <cite className="text-rose-primary font-semibold not-italic">
          &mdash; {testimonials[current].author}
        </cite>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-white shadow hover:bg-cream-dark transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-charcoal" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-rose-primary w-6" : "bg-rose-light/50"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full bg-white shadow hover:bg-cream-dark transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-charcoal" />
        </button>
      </div>
    </div>
  );
}
