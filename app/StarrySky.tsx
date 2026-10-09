"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  phase: number;
  speed: number;
  opacity: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  lifetime: number;
};

export default function StarrySky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];

    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;
    let nextMeteor = 6 + Math.random() * 6;

    function resize() {
      if (!canvas) return;

      width = canvas.clientWidth;
      height = canvas.clientHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Ограничиваем количество звёзд для плавной работы.
      const count = Math.min(
        220,
        Math.max(60, Math.floor((width * height) / 6500))
      );

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.4 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
        opacity: 0.2 + Math.random() * 0.5,
      }));

      meteors = [];
      draw(0);
    }

    function draw(delta: number) {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      // Звёзды: небольшие точки с плавным мерцанием.
      for (const star of stars) {
        const twinkle = reducedMotion.matches
          ? 1
          : 0.75 +
            Math.sin(elapsed * star.speed + star.phase) * 0.25;

        ctx.globalAlpha = star.opacity * twinkle;
        ctx.fillStyle = "#dce8ff";

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Небольшое свечение только у крупных звёзд.
        if (star.radius > 1.2) {
          ctx.globalAlpha = star.opacity * twinkle * 0.12;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Падающие звёзды появляются редко.
      if (!reducedMotion.matches) {
        for (const meteor of meteors) {
          meteor.age += delta;
          meteor.x += meteor.vx * delta;
          meteor.y += meteor.vy * delta;

          const visibility = Math.sin(
            Math.PI * Math.min(meteor.age / meteor.lifetime, 1)
          );

          const tailX = meteor.x - 110;
          const tailY = meteor.y - 55;

          const gradient = ctx.createLinearGradient(
            tailX,
            tailY,
            meteor.x,
            meteor.y
          );

          gradient.addColorStop(0, "rgba(116, 232, 245, 0)");
          gradient.addColorStop(1, "rgba(220, 232, 255, 0.85)");

          ctx.globalAlpha = visibility;
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.4;

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(meteor.x, meteor.y);
          ctx.stroke();
        }

        meteors = meteors.filter(
          (meteor) => meteor.age < meteor.lifetime
        );
      }

      ctx.globalAlpha = 1;
    }

    function animate(time: number) {
      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.05)
        : 0;

      previousTime = time;
      elapsed += delta;

      if (elapsed >= nextMeteor) {
        meteors.push({
          x: Math.random() * width * 0.75,
          y: Math.random() * height * 0.35,
          vx: 420,
          vy: 210,
          age: 0,
          lifetime: 1.2,
        });

        nextMeteor = elapsed + 8 + Math.random() * 10;
      }

      draw(delta);
      frame = requestAnimationFrame(animate);
    }

    function updateAnimation() {
      cancelAnimationFrame(frame);
      previousTime = 0;

      if (document.hidden || reducedMotion.matches) {
        meteors = [];
        draw(0);
        return;
      }

      frame = requestAnimationFrame(animate);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    resize();
    updateAnimation();

    document.addEventListener("visibilitychange", updateAnimation);
    reducedMotion.addEventListener("change", updateAnimation);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();

      document.removeEventListener(
        "visibilitychange",
        updateAnimation
      );

      reducedMotion.removeEventListener(
        "change",
        updateAnimation
      );
    };
  }, []);

  return (
    <div className="starry-sky" aria-hidden="true">
      <div className="sky-nebula sky-nebula-violet" />
      <div className="sky-nebula sky-nebula-blue" />
      <canvas ref={canvasRef} className="stars-canvas" />
      <div className="sky-reading-shade" />
    </div>
  );
}
