"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logoPng from "@/app/assets/cj-logo.png";

/* ⚡ Thunder Icon */
function ThunderIcon() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      className="absolute left-1/2 -translate-x-1/2 -top-2 h-10 w-10"
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: [0, -6, 0], opacity: [1, 0.8, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M25 2L10 34h14l-4 22 25-32H30l5-22z"
        fill="url(#thunderGradient)"
        filter="drop-shadow(0 0 8px rgba(195,216,51,0.6))"
      />
      <defs>
        <linearGradient id="thunderGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C3D833" />
          <stop offset="100%" stopColor="#2491D0" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

/* ⚙️ Spark Ring */
function SparkRing() {
  return (
    <motion.svg
      width="340"
      height="340"
      viewBox="0 0 340 340"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
    >
      <defs>
        <linearGradient id="sparkGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2491D0" />
          <stop offset="50%" stopColor="#C3D833" />
          <stop offset="100%" stopColor="#F36E2A" />
        </linearGradient>
      </defs>

      {/* Outer Glow Ring */}
      <motion.circle
        cx="170"
        cy="170"
        r="120"
        fill="none"
        stroke="url(#sparkGradient)"
        strokeWidth="2"
        strokeDasharray="10 18"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{
          filter: "drop-shadow(0 0 10px rgba(36,145,208,0.3))",
          opacity: 0.5,
        }}
      />

      {/* Highlight Orbit */}
      <motion.circle
        cx="170"
        cy="170"
        r="120"
        fill="none"
        stroke="#F36E2A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="40 600"
        animate={{ strokeDashoffset: [0, 640], rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          filter: "drop-shadow(0 0 12px rgba(243,110,42,0.9))",
          opacity: 0.8,
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 6 }).map((_, i) => {
        const colors = ["#C3D833", "#2491D0", "#F36E2A"];
        const color = colors[i % colors.length];
        const angle = (i / 6) * 360;
        const radius = 120;
        const x = 170 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 170 + radius * Math.sin((angle * Math.PI) / 180);
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill={color}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </motion.svg>
  );
}

/* 💡 Logo + Thunder */
function LogoMark() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <Image
        src={logoPng}
        alt="CreativeJumpstart logo"
        width={160}
        height={160}
        priority
        className="object-contain drop-shadow-[0_6px_20px_rgba(36,145,208,0.25)]"
      />
      <ThunderIcon />
    </div>
  );
}

/* 🌫 Ambient Background */
function AnimatedBackdrop({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative h-64 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(36,145,208,0.18) 0%, rgba(195,216,51,0.16) 35%, rgba(6,95,70,0.15) 70%, rgba(0,0,0,0) 100%)",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-15 [mask-image:radial-gradient(70%_70%_at_50%_40%,_black,_transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(35,35,35,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(35,35,35,.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px, 22px 22px",
        }}
        animate={{
          backgroundPositionX: [0, 22, 0],
          backgroundPositionY: [0, 22, 0],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      {children}
      <SparkRing />
    </div>
  );
}

/* 🔁 Rotating Pill Words */
function RotatingWords() {
    const words = [
        "ideas that ignite change",
        "designs that convert",
        "builds that hit goals",
        "automation that delivers results",
    ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 3500);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <div className="inline-block overflow-hidden align-middle h-8 p">
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="align-middle px-3 py-1 text-sm rounded-full bg-[#D6EBF2] text-[#232323] border border-[#2491D0]/25 font-semibold shadow-sm inline-block"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* 🌩 Main Section */
export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-[#F6F4EE] text-[#232323] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <section className="mt-2 rounded-3xl border border-[#2491D0]/20 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="px-8 py-10 sm:px-12 sm:py-14">
            <AnimatedBackdrop>
              <LogoMark />
            </AnimatedBackdrop>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-6 text-center text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
            >
              <span className="bg-gradient-to-r from-[#065F46] via-[#2491D0] to-[#C3D833] bg-clip-text text-transparent">
                CreativeJumpStart
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="mt-4 text-center max-w-prose mx-auto text-lg font-medium"
            >
              <span className="text-[#2491D0] font-semibold">Thunder</span>
              <span className="opacity-70"> meets clarity. </span>
              <span className="text-[#F36E2A] font-semibold">Spark</span>
              <span className="opacity-70"> ready. </span>
              <span className="text-[#065F46] font-semibold">Launch</span>
              <span className="opacity-70"> soon.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
              className="mt-6 text-center text-sm sm:text-base"
            >
              <span className="opacity-80">Expect </span>
              <RotatingWords />
            </motion.div>

            <p className="mt-10 text-center text-xs text-[#232323]/60">
              © {new Date().getFullYear()} CreativeJumpstart. All rights
              reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
