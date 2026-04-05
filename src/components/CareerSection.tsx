"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { careerItems } from "@/data/portfolio";

export default function CareerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="career" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-2">
            Career
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Timeline</h2>
        </motion.div>

        <div ref={ref} className="relative overflow-hidden">
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-zinc-800">
              <motion.div
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500"
              />
            </div>

            <div className="flex gap-0 overflow-x-auto pb-8 pt-0 scrollbar-hide">
              {careerItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.2,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="flex-shrink-0 w-48 md:w-56 relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      delay: 0.3 + i * 0.2,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="relative z-10 w-3 h-3 rounded-full bg-violet-500 mx-auto mb-6 shadow-lg shadow-violet-500/30"
                  >
                    <div className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-20" />
                  </motion.div>

                  <div className="text-center px-3">
                    <span className="text-violet-400 font-mono text-sm font-bold">
                      {item.year}
                    </span>
                    <h4 className="text-sm font-semibold mt-2 mb-1 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
