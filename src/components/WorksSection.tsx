"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Globe,
  FileText,
  X,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { works, type Work } from "@/data/portfolio";

function TypeBadge({ type }: { type: Work["type"] }) {
  const isTeam = type === "team";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${
        isTeam
          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
          : "bg-violet-500/10 text-violet-400 border-violet-500/20"
      }`}
    >
      {isTeam ? <Users size={11} /> : <User size={11} />}
      {isTeam ? "チーム開発" : "個人開発"}
    </span>
  );
}

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setCurrent((c) => (c + 1) % images.length);
  };
  const goTo = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
    center: { x: 0 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%" }),
  };

  return (
    <div className="relative aspect-video bg-zinc-800 overflow-hidden group/carousel">
      <AnimatePresence mode="sync" initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => goTo(i, e)}
                style={{ boxShadow: "0 0 0 1.5px rgba(0,0,0,0.5)" }}
                className={`rounded-full transition-all duration-200 ${
                  i === current
                    ? "w-4 h-2 bg-white"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-lg group-hover:text-violet-400 transition-colors leading-tight">
            {work.title}
          </h3>
          <TypeBadge type={work.type} />
        </div>
      </div>
    </motion.div>
  );
}

function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const modalImages = work.images && work.images.length > 0 ? work.images : [work.image];

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

          <ImageCarousel images={modalImages} alt={work.title} />

          <div className="p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 flex-wrap mb-4"
            >
              <h3 className="text-2xl font-bold">{work.title}</h3>
              <TypeBadge type={work.type} />
            </motion.div>

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
