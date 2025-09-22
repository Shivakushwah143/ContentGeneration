"use client";

import React from "react";

interface SparklesCoreProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  color?: string; // For backward compatibility
}

export const SparklesCore = ({
  id,
  background = "transparent",
  minSize = 0.5,
  maxSize = 1.9,
  particleDensity = 300,
  className = "",
  particleColor = "#FFFFFF",
  color = "#FFFFFF", // Fallback
}: SparklesCoreProps) => {
  const finalColor = particleColor || color;
  const count = Math.floor(particleDensity * 0.5);

  return (
    <div
      id={id}
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={{ background }}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * (maxSize - minSize) + minSize}px`,
            height: `${Math.random() * (maxSize - minSize) + minSize}px`,
            backgroundColor: finalColor,
            opacity: Math.random() * 0.5 + 0.1,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes sparkle {
          0% {
            transform: scale(0.8);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.2;
          }
        }
        .animate-sparkle {
          animation: sparkle infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};