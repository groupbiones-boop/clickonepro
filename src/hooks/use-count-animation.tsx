import { useEffect, useState } from "react";
import { useScrollAnimation } from "./use-scroll-animation";

interface UseCountAnimationOptions {
  start?: number;
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export const useCountAnimation = ({
  start = 0,
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}: UseCountAnimationOptions) => {
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>();
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, start, end, duration]);

  const displayValue = `${prefix}${count}${suffix}`;

  return { ref, displayValue, count, isVisible };
};

// Component for easier usage
interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter = ({
  end,
  start = 0,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) => {
  const { ref, displayValue } = useCountAnimation({
    start,
    end,
    duration,
    suffix,
    prefix,
  });

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};
