"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile, infoCards } from "@/data/portfolio";

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-2">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square max-w-md mx-auto w-full"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-2xl" />
            <div className="relative w-full h-full rounded-2xl bg-zinc-800 border border-zinc-700/50 overflow-hidden flex items-center justify-center">
              <Image
                src={profile.photo}
                alt="Profile"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm">
                <span className="z-[-1]">Your Photo Here</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">
              {profile.about.heading}
              <br />
              <span className="text-violet-400">{profile.about.headingAccent}</span>
            </h3>

            {profile.about.paragraphs.map((text, i) => (
              <p key={i} className="text-zinc-400 leading-relaxed mb-4">
                {text}
              </p>
            ))}

            <div className="grid grid-cols-3 gap-4 mt-4">
              {infoCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-center"
                  >
                    <Icon size={20} className="text-violet-400 mx-auto mb-2" />
                    <p className="text-xs text-zinc-500 mb-1">{card.label}</p>
                    <p className="text-sm font-medium">{card.value}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
