"use client";

import { motion } from "framer-motion";
import { profile, contactLinks } from "@/data/portfolio";

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-2">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-zinc-400 mb-12">
            お仕事のご相談やお問い合わせはお気軽にどうぞ。
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {contactLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 transition-colors ${link.color}`}
              >
                <Icon size={20} />
                <span className="font-medium">{link.label}</span>
              </motion.a>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-zinc-600 text-sm"
        >
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </motion.p>
      </div>
    </section>
  );
}
