"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Globe, FileText, X } from "lucide-react";
import Image from "next/image";
import { works, type Work } from "@/data/portfolio";

function WorkCard({ work, onClick }: { work: Work; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors"
    >
      <div className="relative aspect-video bg-zinc-800 overflow-hidden">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg group-hover:text-violet-400 transition-colors">
          {work.title}
        </h3>
      </div>
    </motion.div>
  );
}

function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-zinc-800"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="relative aspect-video bg-zinc-800">
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>

          <div className="p-6 md:p-8">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-4"
            >
              {work.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 leading-relaxed mb-6 whitespace-pre-line"
            >
              {work.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {work.techs.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {work.liveUrl && (
                <a
                  href={work.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
              {work.githubUrl && (
                <a
                  href={work.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  <Globe size={14} />
                  GitHub
                </a>
              )}
              {work.githubFrontUrl && (
                <a
                  href={work.githubFrontUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  <Globe size={14} />
                  GitHub Front
                </a>
              )}
              {work.githubBackUrl && (
                <a
                  href={work.githubBackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  <Globe size={14} />
                  GitHub Back
                </a>
              )}
              {work.planUrl && (
                <a
                  href={work.planUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  <FileText size={14} />
                  企画書
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function WorksSection() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  return (
    <section id="works" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-2">
            Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Selected Works
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={() => setSelectedWork(work)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedWork && (
          <WorkModal
            work={selectedWork}
            onClose={() => setSelectedWork(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
