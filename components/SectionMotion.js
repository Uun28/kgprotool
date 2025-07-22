"use client";
import { motion } from "framer-motion";

export default function SectionMotion({ id, children, delay = 0, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`will-change-transform ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{
        duration: 0.66,
        delay,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
