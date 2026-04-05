"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, LayoutGroup, useMotionValue, useSpring } from "framer-motion";
import { skills, skillCategories, categoryColors } from "@/data/portfolio";

function CountUp({ target, delay = 0 }: { target: number; delay?: number }) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      motionVal.set(target);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [motionVal, target, delay]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return <span>{display}%</span>;
}

function generateCloudPositions(count: number) {
  const GOLDEN_ANGLE = 137.508;
  const positions: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = i * GOLDEN_ANGLE * (Math.PI / 180);
    const radius = 0.3 + (i / count) * 0.35;
    const x = 50 + Math.cos(angle) * radius * 40;
    const y = 50 + Math.sin(angle) * radius * 40;
    // 小数点2桁に丸めてSSR/CSRの不一致を防ぐ
    positions.push({
      x: Math.round(Math.max(5, Math.min(85, x)) * 100) / 100,
      y: Math.round(Math.max(5, Math.min(85, y)) * 100) / 100,
    });
  }
  return positions;
}

function seededOffset(index: number): number {
  return ((index * 7 + 3) % 11) - 5;
}

function seededDuration(index: number, base: number): number {
  return base + ((index * 13 + 5) % 7) * 0.3;
}

export default function SkillsSection() {
  const [transformed, setTransformed] = useState(false);
  const [showBars, setShowBars] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cloudPositions = useMemo(() => generateCloudPositions(skills.length), []);

  useEffect(() => {
    if (isInView && !transformed) {
      const timer = setTimeout(() => {
        setTransformed(true);
        // 最後のタグが着地するまで待ってからバーを表示
        // delay: (skills.length - 1) * 0.045 + duration: 0.9 + バッファ 0.5
        const lastTagFinishMs = ((skills.length - 1) * 0.045 + 0.3 + 0.1) * 1000;
        setTimeout(() => setShowBars(true), lastTagFinishMs);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isInView, transformed]);

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-2">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Tech Stack</h2>
        </motion.div>

        {/* LayoutGroup でlayoutIdアニメーションを同期させる */}
        <LayoutGroup>
          <div ref={ref} className="relative">
            {!transformed ? (
              /* ── Phase 1: タグクラウド ── */
              <motion.div
                className="relative w-full h-[400px] md:h-[450px]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                {skills.map((skill, i) => {
                  const pos = cloudPositions[i];
                  const colors = categoryColors[skill.category];
                  return (
                    <motion.div
                      key={skill.name}
                      layoutId={`skill-${skill.name}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={
                        isInView
                          ? {
                              opacity: 1,
                              scale: 1,
                              x: [0, seededOffset(i), 0],
                              y: [0, seededOffset(i + 5), 0],
                            }
                          : {}
                      }
                      transition={{
                        opacity: { delay: i * 0.05, duration: 0.3 },
                        scale: { delay: i * 0.05, duration: 0.3 },
                        x: {
                          delay: i * 0.05 + 0.3,
                          duration: seededDuration(i, 3),
                          repeat: Infinity,
                          repeatType: "reverse",
                        },
                        y: {
                          delay: i * 0.05 + 0.3,
                          duration: seededDuration(i + 3, 2.5),
                          repeat: Infinity,
                          repeatType: "reverse",
                        },
                      }}
                      className="absolute"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    >
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap ${colors.tag}`}
                      >
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              /* ── Phase 2: カテゴリ + プログレスバー ── */
              /* layoutId が一致するタグがクラウド位置から飛んでくる */
              <div className="space-y-10">
                {skillCategories.map((cat, catIdx) => {
                  const catSkills = skills.filter((s) => s.category === cat.key);
                  const colors = categoryColors[cat.key];
                  return (
                    <motion.div
                      key={cat.key}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: catIdx * 0.1, duration: 0.4 }}
                    >
                      <h3 className={`text-lg font-semibold mb-4 ${colors.text}`}>
                        {cat.label}
                      </h3>
                      <div className="space-y-3">
                        {catSkills.map((skill, i) => {
                          const globalIdx = skills.findIndex((s) => s.name === skill.name);
                          return (
                          <div key={skill.name} className="flex items-center gap-4">
                            {/* layoutId でクラウドから飛んでくる */}
                            <motion.div
                              layoutId={`skill-${skill.name}`}
                              layout
                              transition={{
                                duration: 0.9,
                                ease: [0.22, 1, 0.36, 1],
                                delay: globalIdx * 0.045,
                              }}
                              className="shrink-0"
                            >
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${colors.tag}`}
                              >
                                {skill.name}
                              </span>
                            </motion.div>

                            {showBars && (
                              <>
                                <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{
                                      delay: i * 0.08,
                                      duration: 0.8,
                                      ease: "easeOut",
                                    }}
                                    className={`h-full rounded-full ${colors.bar} shadow-lg ${colors.glow}`}
                                  />
                                </div>
                                <span className="text-xs text-zinc-500 w-10 text-right">
                                  <CountUp target={skill.level} delay={i * 0.08} />
                                </span>
                              </>
                            )}
                          </div>
                        )})}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
