"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { profile } from "@/data/portfolio";

const blobs = [
  {
    animate: { x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] },
    duration: 20,
    className: "top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/30",
  },
  {
    animate: { x: [0, -60, 50, 0], y: [0, 50, -30, 0], scale: [1, 0.8, 1.1, 1] },
    duration: 25,
    className: "top-1/3 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/25",
  },
  {
    animate: { x: [0, 40, -60, 0], y: [0, -40, 60, 0], scale: [1, 1.1, 0.85, 1] },
    duration: 22,
    className: "bottom-1/4 left-1/3 w-[350px] h-[350px] bg-cyan-500/20",
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            animate={blob.animate}
            transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute rounded-full blur-[120px] ${blob.className}`}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-4"
        >
          {profile.title}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            {profile.name}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-zinc-400 text-lg md:text-xl max-w-lg mx-auto"
        >
          {profile.tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <button
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown
                size={28}
                className="text-zinc-500 group-hover:text-violet-400 transition-colors"
              />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
