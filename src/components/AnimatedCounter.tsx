'use client';

import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  // Clean the number string to extract integer
  const numericValue = parseInt(value.replace(/,/g, ''), 10) || 0;
  const hasComma = value.includes(',');

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    damping: 30,
    stiffness: 70,
  });

  useEffect(() => {
    if (isInView) {
      motionVal.set(numericValue);
    }
  }, [isInView, numericValue, motionVal]);

  useEffect(() => {
    return springVal.on('change', (latest) => {
      if (ref.current) {
        const rounded = Math.round(latest);
        if (hasComma) {
          ref.current.textContent = rounded.toLocaleString('en-US');
        } else {
          ref.current.textContent = rounded.toString();
        }
      }
    });
  }, [springVal, hasComma]);

  return (
    <span ref={ref} className={className}>
      {hasComma ? '0' : '0'}
    </span>
  );
}
