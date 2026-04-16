"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { profile } from "@/data/portfolio";

const Rotating3DM = dynamic(() => import("@/components/Rotating3DM"), {
  ssr: false,
});

function useTypewriter(text: string, startDelay: number = 0) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 45);
    return () => clearInterval(timer);
  }, [started, text]);

  return { displayed, done: displayed.length === text.length };
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function FloatingParticles({ count = 40 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          className="absolute rounded-full bg-violet-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity * 0.5, p.opacity * 1.4, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function AnimatedName({ name }: { name: string }) {
  return (
    <>
      {name.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5 + i * 0.05,
            duration: 0.65,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { displayed: tagline, done: taglineDone } = useTypewriter(profile.tagline, 1.3);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 中心グロー */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ノイズテクスチャ */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none z-[2]">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* グリッド */}
      <div
        className="absolute inset-0 opacity-[0.07] z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff0c 1px, transparent 1px), linear-gradient(to bottom, #ffffff0c 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* 微粒子 */}
      <div className="absolute inset-0 z-[3]">
        <FloatingParticles count={35} />
      </div>

      {/* 3D回転する「M」 */}
      <Rotating3DM />

      {/* エッジのビネット */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 40%, #111111 95%)",
        }}
      />

      <div className="relative z-30 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-violet-400 font-mono text-xs tracking-widest uppercase">
            {profile.title}
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
          <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            <AnimatedName name={profile.name} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto mb-12 h-8 flex items-center justify-center"
        >
          <span>{tagline}</span>
          {!taglineDone && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-0.5 h-5 bg-violet-400 ml-0.5"
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 }}
          className="flex items-center justify-center gap-4 mb-16 flex-wrap"
        >
          <button
            onClick={() =>
              document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 transition-all duration-200 text-sm font-medium cursor-pointer"
          >
            Works を見る
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white transition-all duration-200 text-sm font-medium cursor-pointer"
          >
            Contact
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          <button
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group cursor-pointer"
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown
                size={28}
                className="text-zinc-600 group-hover:text-violet-400 transition-colors"
              />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
