"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ─── Shared easing ────────────────────────────────────────────────────────────
const SPRING = [0.16, 1, 0.3, 1] as const;

// ─── FadeIn ───────────────────────────────────────────────────────────────────
// Scroll-triggered reveal. Direction: "up" | "down" | "left" | "right" | "none"
export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}) {
  const offsets = {
    up:    { y: 22, x: 0 },
    down:  { y: -22, x: 0 },
    left:  { y: 0, x: 22 },
    right: { y: 0, x: -22 },
    none:  { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-56px" }}
      transition={{ duration: 0.65, delay, ease: SPRING }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Entrance ─────────────────────────────────────────────────────────────────
// Mount-time animation (above-fold content). Uses animate, not whileInView.
export function Entrance({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const offsets = {
    up:    { y: 18, x: 0 },
    down:  { y: -18, x: 0 },
    left:  { y: 0, x: 18 },
    right: { y: 0, x: -18 },
    none:  { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.6, delay, ease: SPRING }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerContainer + StaggerItem ──────────────────────────────────────────
// Wrap a grid/list in StaggerContainer and each item in StaggerItem.
export function StaggerContainer({
  children,
  className,
  stagger = 0.07,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-48px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: SPRING },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedCounter ──────────────────────────────────────────────────────────
// Counts up from `from` to `to` when element scrolls into view.
export function AnimatedCounter({
  to,
  from = 0,
  duration = 1.8,
  suffix = "",
  prefix = "",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / (duration * 1000);
      const t = Math.min(elapsed, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
