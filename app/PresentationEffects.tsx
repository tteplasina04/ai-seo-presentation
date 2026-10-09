"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Grid2X2, X } from "lucide-react";

const slides = [
  ["Введение", "Нейросети в оптимизации сайтов"],
  ["Основы", "SEO начинается с пользователя"],
  ["Возможности", "Что умеет искусственный интеллект"],
  ["Запросы", "Понять намерение пользователя"],
  ["Контент", "От задания к полезному тексту"],
  ["Метатеги", "Первое впечатление в поиске"],
  ["Аналитика", "От данных к гипотезам"],
  ["Интерфейс", "UX и техническое качество"],
  ["Практика", "Пример интернет-магазина"],
  ["Выводы", "ИИ и ответственность человека"],
  ["Финал", "Спасибо за внимание"],
];

type Props = {
  current: number;
  onSelect: (index: number) => void;
};

export default function PresentationEffects({
  current,
  onSelect,
}: Props) {
  const [overview, setOverview] = useState(false);
  const [pointerVisible, setPointerVisible] = useState(false);

  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothX = useSpring(mouseX, {
    stiffness: 110,
    damping: 25,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 110,
    damping: 25,
  });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");

    const move = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion) return;

      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setPointerVisible(true);
    };

    const leave = () => setPointerVisible(false);

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener(
        "pointerleave",
        leave
      );
    };
  }, [mouseX, mouseY, reducedMotion]);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const target = event.target as HTMLElement;

      if (
        target.closest(
          "input, textarea, select, [contenteditable='true']"
        )
      ) return;

      if (
        event.key.toLowerCase() === "g" ||
        event.key.toLowerCase() === "п"
      ) {
        event.preventDefault();
        setOverview((value) => !value);
      }
    };

    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

  // Плавный наклон карточек без React-перерисовок.
  useEffect(() => {
    if (reducedMotion) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".glass-card, .practice-card"
      )
    );

    const cleanups = cards.map((card) => {
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;

        const rect = card.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.setProperty("--tilt-x", `${-y * 7}deg`);
        card.style.setProperty("--tilt-y", `${x * 7}deg`);

        card.style.setProperty("--light-x", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--light-y", `${(y + 0.5) * 100}%`);
      };

      const reset = () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      };

      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", reset);

      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", reset);
        reset();
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [current, reducedMotion]);

  return (
    <>
      {!reducedMotion && (
        <motion.div
          className="cursor-aura"
          aria-hidden="true"
          style={{
            left: smoothX,
            top: smoothY,
            opacity: pointerVisible ? 1 : 0,
          }}
        />
      )}

      <AnimatePresence>
        {!reducedMotion && (
          <motion.div
            key={current}
            className="slide-scanner"
            aria-hidden="true"
            initial={{ top: "12%", opacity: 0 }}
            animate={{
              top: ["12%", "85%"],
              opacity: [0, 0.5, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <div className="effects-controls">
        <button
          className="effects-button"
          onClick={() => setOverview(true)}
          aria-label="Обзор всех слайдов"
          title="Все слайды — G"
        >
          <Grid2X2 size={16} />
          <span>Все слайды</span>
          <kbd>G</kbd>
        </button>
      </div>

      <AnimatePresence>
        {overview && (
          <motion.div
            className="overview-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={() => setOverview(false)}
          >
            <dialog
              open
              className="overview-panel"
              aria-labelledby="overview-title"
              ref={(dialog) => {
                if (dialog && !dialog.matches(":modal")) {
                  dialog.close();
                  dialog.showModal();
                }
              }}
              onCancel={(event) => {
                event.preventDefault();
                setOverview(false);
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="overview-header">
                <div>
                  <span className="mini-label">КАРТА ПРЕЗЕНТАЦИИ</span>
                  <h2 id="overview-title">Вся история — на одном экране.</h2>
                </div>

                <button
                  autoFocus
                  className="icon-button"
                  onClick={() => setOverview(false)}
                  aria-label="Закрыть обзор"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="overview-grid">
                {slides.map(([label, title], index) => (
                  <motion.button
                    key={title}
                    className={`overview-slide ${
                      index === current ? "selected" : ""
                    }`}
                    initial={{
                      opacity: reducedMotion ? 1 : 0,
                      y: reducedMotion ? 0 : 12,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reducedMotion ? 0 : index * 0.025,
                    }}
                    onClick={() => {
                      onSelect(index);
                      setOverview(false);
                    }}
                    aria-label={`Открыть слайд ${index + 1}: ${title}`}
                  >
                    <span className="overview-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="overview-label">{label}</span>
                    <strong>{title}</strong>
                    {index === current && (
                      <span className="overview-current">Вы здесь</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
