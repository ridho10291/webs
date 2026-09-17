"use client";
import { useRef, type ReactNode, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  maxTilt?: number;
  /** Color of the cursor spotlight on hover; pass a CSS color or `false` to disable. */
  spotlight?: string | false;
  style?: CSSProperties;
}

/**
 * 3D tilt-on-hover card with a cursor-following radial spotlight.
 * Pure transforms (GPU-friendly); respects framer-motion reducedMotion settings.
 */
export function TiltCard({
  children,
  className = "",
  contentClassName = "",
  maxTilt = 7,
  spotlight = "rgba(143, 255, 74, 0.14)",
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 18 });

  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotlightOpacity = useMotionValue(0);
  const spotColor = spotlight === false ? "rgba(0, 0, 0, 0)" : spotlight;

  const spotlightBackground = useMotionTemplate`radial-gradient(420px circle at ${spotX}% ${spotY}%, ${spotColor}, transparent 70%)`;
  const spotlightStyle = {
    background: spotlightBackground,
    opacity: spotlightOpacity,
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - py) * maxTilt * 2);
    rotateY.set((px - 0.5) * maxTilt * 2);

    if (spotlight !== false) {
      spotX.set(px * 100);
      spotY.set(py * 100);
      spotlightOpacity.set(1);
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    spotlightOpacity.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className={`${className} [perspective:1000px]`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", ...style }}
        className={`relative h-full w-full ${contentClassName}`}
      >
        {children}
        {spotlight !== false && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={spotlightStyle}
          />
        )}
      </motion.div>
    </div>
  );
}