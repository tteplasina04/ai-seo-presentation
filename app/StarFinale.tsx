"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Детерминированные значения: одинаковы на сервере и в браузере.
function random(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

const stars = Array.from({ length: 125 }, (_, index) => {
  const angle = random(index + 1) * Math.PI * 2;
  const distance = 65 + random(index + 200) * 45;

  return {
    id: index,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: 1 + random(index + 400) * 3,
    delay: random(index + 600) * 0.75,
    duration: 0.8 + random(index + 800) * 0.65,
  };
});

export default function StarFinale() {
  const reducedMotion = useReducedMotion();
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setFinished(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setFinished(true);
    }, 4400);

    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <div className="star-finale">
      {/* Поток звёзд удаляется после завершения эффекта. */}
      {!reducedMotion && !finished && (
        <div className="finale-starfield" aria-hidden="true">
          {stars.map((star) => (
            <motion.span
              key={star.id}
              className="finale-flying-star"
              style={{
                width: star.size,
                height: star.size,
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0.2,
              }}
              animate={{
                x: `${star.x}vw`,
                y: `${star.y}vh`,
                opacity: [0, 0.9, 0.9, 0],
                scale: [0.2, 1, 2.5, 3],
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                ease: [0.45, 0, 0.9, 0.4],
              }}
            />
          ))}
        </div>
      )}

      {/* Центральная звезда превращается в ореол. */}
      {!reducedMotion && (
        <motion.div
          className="finale-core"
          aria-hidden="true"
          initial={{
            opacity: 0,
            scale: 0.02,
            rotate: -35,
          }}
          animate={{
            opacity: [0, 1, 1, 0.3],
            scale: [0.02, 0.12, 0.4, 1.5],
            rotate: [-35, 0, 20, 40],
          }}
          transition={{
            duration: 2.8,
            delay: 0.65,
            times: [0, 0.25, 0.55, 1],
            ease: "easeInOut",
          }}
        >
          <div className="finale-core-light" />

          <svg viewBox="0 0 100 100" className="finale-star-shape">
            <path
              d="M50 0 L60 38 L100 50 L60 62 L50 100 L40 62 L0 50 L40 38 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      )}

      <motion.div
        className="finale-copy"
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                scale: 0.85,
                y: 25,
                filter: "blur(15px)",
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          delay: reducedMotion ? 0 : 2.2,
          duration: reducedMotion ? 0 : 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="finale-eyebrow">
          AI × SEO · БУДУЩЕЕ УЖЕ ЗДЕСЬ
        </div>

        <h1 className="finale-title">
          Спасибо
          <br />
          <span>за внимание.</span>
        </h1>

        <p className="finale-subtitle">
          Искусственный интеллект помогает.
          <br />
          Человек определяет смысл.
        </p>

        <div className="finale-bottom-line">
          Проверять факты · Защищать данные · Измерять пользу
        </div>
      </motion.div>
    </div>
  );
}
