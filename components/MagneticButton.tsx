"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  [key: string]: unknown;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "button",
  href,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      className={`relative ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      <motion.span
        className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20 blur-xl"
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.1 : 0.8 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </Component>
  );
}
