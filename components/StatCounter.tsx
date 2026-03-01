'use client';

import { useState, useEffect, useRef } from 'react';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export default function StatCounter({ value, label, suffix = '', duration = 2000 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, value, duration]);

  return (
    <div ref={ref} className="text-center px-4">
      <div className="font-mono text-4xl font-bold text-ddl-crimson leading-none">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-body text-sm text-ddl-muted-light mt-2 tracking-wide">
        {label}
      </div>
    </div>
  );
}
