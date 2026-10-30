"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  as?: React.ElementType;
  className?: string;
  /** Words (exact match, punctuation-insensitive) rendered with the accent gradient. */
  highlight?: string[];
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view (used above the fold). */
  immediate?: boolean;
};

const clean = (w: string) => w.replace(/[^\p{L}\p{N}-]/gu, "");

/** Word-by-word masked reveal. Screen readers get the plain sentence via aria-label. */
export default function SplitText({
  text,
  as: Tag = "h2",
  className = "",
  highlight = [],
  delay = 0,
  stagger = 0.05,
  immediate = false,
}: Props) {
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: { y: "0%" } }
    : { whileInView: { y: "0%" }, viewport: { once: true, margin: "-10% 0px" } };

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
          <motion.span
            className={`inline-block ${highlight.includes(clean(word)) ? "text-gradient" : ""}`}
            initial={{ y: "110%" }}
            {...trigger}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
