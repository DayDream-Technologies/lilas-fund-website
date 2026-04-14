"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

function parseNumericValue(val: string): { prefix: string; number: number; suffix: string } {
  const match = val.match(/^([^0-9]*)([0-9,]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: val };
  return {
    prefix: match[1],
    number: parseInt(match[2].replace(/,/g, ""), 10),
    suffix: match[3],
  };
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const { prefix, number, suffix } = parseNumericValue(value);
          const duration = 2000;
          const steps = 60;
          const increment = number / steps;
          let current = 0;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            current = Math.min(Math.round(increment * step), number);
            setDisplayed(`${prefix}${current.toLocaleString()}${suffix}`);
            if (step >= steps) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-rose-primary mb-2">
        {displayed}
      </div>
      <div className="text-charcoal-light text-sm md:text-base">{label}</div>
    </div>
  );
}
