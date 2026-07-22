import React, { useState, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  maxDegree?: number;
}

export const Card3DTilt: React.FC<Props> = ({
  children,
  className = "",
  maxDegree = 12,
}) => {
  const [transformStyle, setTransformStyle] = useState("");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxDegree;
    const rotateY = ((x - centerX) / centerX) * maxDegree;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({ opacity: 0.15, x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: transformStyle ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl transition-all duration-300 ${className}`}
    >
      {/* Dynamic Glare Reflection Overlay */}
      <div
        style={{
          background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 215, 0, ${glareStyle.opacity}), transparent 60%)`,
        }}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-opacity duration-300"
      />
      {children}
    </div>
  );
};
