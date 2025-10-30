'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const stats = [
  {
    value: 98,
    label: 'de ingredientes naturales',
    suffix: '%',
  },
  {
    value: 20,
    label: 'gramos de proteína por barra',
    suffix: 'g',
  },
  {
    value: 100,
    label: 'recomendado por nuestros clientes',
    suffix: '%',
  },
  {
    value: 5,
    label: 'sabores inolvidables',
    suffix: '',
  },
];

const AnimatedStat = ({ value, label, suffix }: { value: number, label: string, suffix: string }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  const duration = 1500; // ms

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const stepTime = Math.abs(Math.floor(duration / end));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer); // Cleanup on component unmount
    } else {
        setCount(0)
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-primary">
        {count}{suffix}
      </p>
      <p className="mt-2 text-muted-foreground">{label}</p>
    </div>
  );
};

export default function Statistics() {
    const { ref, isInView } = useInView({ triggerOnce: true });

  return (
    <section ref={ref} className={cn("py-16 md:py-24 bg-background transition-opacity duration-1000", isInView ? "opacity-100" : "opacity-0")}>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} value={stat.value} label={stat.label} suffix={stat.suffix} />
          ))}
        </div>
      </div>
    </section>
  );
}
