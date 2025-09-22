"use client";

import React, { useEffect, useRef } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  speed?: number; // pixels per second
}

export const Marquee = ({
  children,
  className = "h-20 text-3xl",
  direction = "left",
  pauseOnHover = false,
  speed = 50,
}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const positionRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;
    const contentWidth = content.scrollWidth / 2; // Since we duplicate the content

    let lastTime: number | null = null;
    let shouldStop = false;

    const animate = (time: number) => {
      if (shouldStop) return;
      
      if (lastTime === null) {
        lastTime = time;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = time - lastTime;
      lastTime = time;

      const pixelsToMove = (speed * deltaTime) / 1000;
      positionRef.current += direction === "left" ? pixelsToMove : -pixelsToMove;

      // Reset position when content moves completely
      if (Math.abs(positionRef.current) >= contentWidth) {
        positionRef.current = 0;
      }

      content.style.transform = `translateX(${-positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      if (pauseOnHover) shouldStop = true;
    };

    const handleMouseLeave = () => {
      if (pauseOnHover) {
        shouldStop = false;
        lastTime = null;
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={`  ${className}`}
    >
      <div
        ref={contentRef}
        className="flex "
      >
        {children}
        {children} {/* Duplicate for seamless looping */}
      </div>
    </div>
  );
};