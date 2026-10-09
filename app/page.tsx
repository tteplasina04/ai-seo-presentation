"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Code2,
  FileText,
  Fingerprint,
  Globe2,
  Layers3,
  Maximize2,
  Minimize2,
  MousePointer2,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  WandSparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import PresentationEffects from "./PresentationEffects";
import StarrySky from "./StarrySky";
import StarFinale from "./StarFinale";

const TOTAL = 11;

const titles = [
  "Нейросети в оптимизации сайтов",
  "SEO начинается с пользователя",
  "Нейросети ускоряют работу",
  "Понять, что ищет человек",
  "От промпта к полезному тексту",
  "Первое впечатление в поиске",
  "Данные превращаются в гипотезы",
  "Удобство тоже важно",
  "Как это работает на практике",
  "Технологии плюс ответственность",
  "Спасибо за внимание",
];

const slideLabels = [
  "Введение",
  "Основы SEO",
  "Возможности ИИ",
  "Поисковые намерения",
  "SEO-тексты",
  "Метатеги",
  "Аналитика",
  "UX и техника",
  "Практика",
  "Выводы",
  "Финал",
];

type CardProps = {
  icon: LucideIcon;
  title: string;
  text: string;
  accent?: "violet" | "cyan" | "green";
};

function Card({
  icon: Icon,
  title,
  text,
  accent = "violet",
}: CardProps) {
  return (
    <article className={`glass-card accent-${accent}`}>
      <div className="icon-box">
        <Icon size={25} strokeWidth={1.7} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Heading({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span />
        {eyebrow}
      </div>

      <h1>
        {title} <span className="gradient-text">{highlight}</span>
      </h1>

      <p className="subtitle">{description}</p>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="note">
      <Sparkles size={18} />
      <p>{children}</p>
    </div>
  );
}

function SlideContent({ index }: { index: number }) {
  const reducedMotion = useReducedMotion();

  switch (index) {
    case 0:
      return (
        <div className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span />
              ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ × ВЕБ
            </div>

            <h1>
              Новый взгляд
              <br />
              на <span className="gradient-text">оптимизацию</span>
              <br />
              сайтов.
            </h1>

            <p className="subtitle">
              Как нейросети помогают создавать SEO-тексты,
              метатеги и анализировать поведение пользователей.
            </p>

            <div className="pill-row">
              <span><FileText size={15} /> Контент</span>
              <span><Search size={15} /> Поиск</span>
              <span><BarChart3 size={15} /> Аналитика</span>
            </div>
          </div>

          <div className="ai-visual" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />

            <motion.div
              className="ai-core"
              animate={
                reducedMotion
                  ? undefined
                  : { y: [0, -12, 0] }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={28} />
              <strong>AI</strong>
              <span>SEO ASSISTANT</span>
            </motion.div>

            <div className="floating-label label-one">
              <FileText size={17} />
              Умный контент
            </div>

            <div className="floating-label label-two">
              <BarChart3 size={17} />
              Анализ данных
            </div>

            <div className="floating-label label-three">
              <Search size={17} />
              Поисковые запросы
            </div>
          </div>
        </div>
      );

    case 1:
      return (
        <>
          <Heading
            eyebrow="01 / ОСНОВЫ"
            title="SEO начинается"
            highlight="с пользователя."
            description="Оптимизация соединяет три задачи: быть найденным, дать полезный ответ и помочь человеку действовать."
          />

          <div className="grid-three">
            <Card
              icon={Globe2}
              title="Видимость"
              text="Поисковая система может обнаружить страницу и понять её содержание."
            />
            <Card
              icon={Target}
              title="Соответствие запросу"
              text="Материал отвечает на тот вопрос, с которым пришёл посетитель."
              accent="cyan"
            />
            <Card
              icon={MousePointer2}
              title="Удобство"
              text="Понятная структура помогает найти информацию, выбрать товар или отправить заявку."
              accent="green"
            />
          </div>

          <Note>
            SEO — не повторение ключевых слов, а полезный,
            понятный и технически доступный сайт.
          </Note>
        </>
      );

    case 2:
      return (
        <>
          <Heading
            eyebrow="02 / ВОЗМОЖНОСТИ"
            title="Меньше рутины."
            highlight="Больше смысла."
            description="ИИ ускоряет подготовку материалов и обработку информации. Решения и проверка остаются за человеком."
          />

          <div className="grid-four">
            <Card
              icon={WandSparkles}
              title="Создаёт черновики"
              text="Планы статей, описания товаров, варианты заголовков и ответы на вопросы."
            />
            <Card
              icon={Layers3}
              title="Организует темы"
              text="Группирует запросы и предлагает структуру разделов."
              accent="cyan"
            />
            <Card
              icon={BarChart3}
              title="Помогает анализировать"
              text="Ищет закономерности в предоставленных отчётах и таблицах."
              accent="green"
            />
            <Card
              icon={Code2}
              title="Объясняет ошибки"
              text="Переводит технические отчёты на понятный язык и предлагает решения."
            />
          </div>

          <Note>
            Без подключённых инструментов или предоставленных
            данных нейросеть не знает актуальное состояние сайта.
          </Note>
        </>
      );

    case 3:
      return (
        <>
          <Heading
            eyebrow="03 / ПОИСКОВЫЕ НАМЕРЕНИЯ"
            title="За каждым запросом"
            highlight="стоит задача."
            description="ИИ помогает группировать формулировки. Но окончательная структура зависит от спроса, выдачи и содержания сайта."
          />

          <div className="intent-grid">
            {[
              {
                icon: Search,
                title: "Узнать",
                query: "Как выбрать ноутбук для учёбы",
                result: "Руководство",
                color: "violet",
              },
              {
                icon: Layers3,
                title: "Сравнить",
                query: "Какой ноутбук лучше для студента",
                result: "Обзор или сравнение",
                color: "cyan",
              },
              {
                icon: MousePointer2,
                title: "Купить",
                query: "Купить ноутбук для учёбы",
                result: "Категория или товар",
                color: "green",
              },
            ].map(({ icon: Icon, title, query, result, color }) => (
              <article
                className={`glass-card intent-card accent-${color}`}
                key={title}
              >
                <div className="icon-box"><Icon size={25} /></div>
                <h3>{title}</h3>
                <div className="query">«{query}»</div>
                <ArrowDown className="intent-arrow" size={20} />
                <div className="result-tag">{result}</div>
              </article>
            ))}
          </div>

          <Note>
            Частотность запросов и состав поисковой выдачи
            проверяют отдельно: предложения ИИ — это гипотезы.
          </Note>
        </>
      );

    case 4:
      return (
        <>
          <Heading
            eyebrow="04 / SEO-ТЕКСТЫ"
            title="Не просто генерация."
            highlight="Редакционный процесс."
            description="Полезный текст появляется там, где скорость нейросети соединяется с проверенными фактами и опытом автора."
          />

          <div className="workflow">
            {[
              ["01", "Исходные данные", "Тема, аудитория, цель и реальные характеристики."],
              ["02", "Черновик", "План, объяснения, примеры и структура."],
              ["03", "Проверка", "Факты, логика, соответствие запросу."],
              ["04", "Публикация", "Редактура и собственная ценность материала."],
            ].map(([number, title, text]) => (
              <article className="workflow-card" key={number}>
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="prompt-box">
            <div className="prompt-header">
              <Code2 size={17} />
              ПРИМЕР ЗАДАНИЯ
            </div>
            <p>
              «Подготовь статью для студентов о выборе ноутбука.
              Объясни память, вес и автономность. Не придумывай
              цены и результаты испытаний».
            </p>
          </div>
        </>
      );

    case 5:
      return (
        <>
          <Heading
            eyebrow="05 / TITLE И DESCRIPTION"
            title="Первое впечатление"
            highlight="в поиске."
            description="Нейросеть предлагает варианты. Человек проверяет, что заголовок и описание точно соответствуют странице."
          />

          <div className="split-layout">
            <div className="meta-list">
              <div className="meta-item">
                <span className="mini-label">TITLE</span>
                <h3>Тема — сразу</h3>
                <p>
                  Конкретный заголовок без повторов
                  и неподтверждённых обещаний.
                </p>
              </div>

              <div className="meta-item">
                <span className="mini-label">DESCRIPTION</span>
                <h3>Польза — понятно</h3>
                <p>
                  Краткое объяснение того, что посетитель
                  найдёт на странице.
                </p>
              </div>
            </div>

            <div className="search-window">
              <div className="window-toolbar">
                <i /><i /><i />
                <span>Предпросмотр результата</span>
              </div>

              <div className="search-body">
                <div className="search-address">
                  <div className="site-icon"><Globe2 size={20} /></div>
                  <div>
                    <strong>Учебный пример</strong>
                    <span>example.com / guide</span>
                  </div>
                </div>

                <h3>Как выбрать ноутбук для учёбы</h3>
                <p>
                  Разбираем память, вес и автономность.
                  Объясняем, какие характеристики важны
                  студенту и на чём можно сэкономить.
                </p>

                <span className="preview-disclaimer">
                  Условный макет, не реальная выдача
                </span>
              </div>
            </div>
          </div>

          <Note>
            Поисковая система может изменить сниппет.
            Description обычно не является прямым
            фактором ранжирования.
          </Note>
        </>
      );

    case 6:
      return (
        <>
          <Heading
            eyebrow="06 / ПОВЕДЕНЧЕСКАЯ АНАЛИТИКА"
            title="Данные подсказывают,"
            highlight="где искать проблему."
            description="ИИ помогает сравнивать этапы пользовательского пути и находить места, требующие проверки."
          />

          <div className="split-layout">
            <div className="glass-card chart-card">
              <div className="chart-heading">
                <h3>Воронка покупки</h3>
                <span className="tiny-badge">ПРИМЕР</span>
              </div>

              {[
                ["Просмотр товара", 100],
                ["Добавление в корзину", 40],
                ["Покупка", 15],
              ].map(([label, value], i) => (
                <div className="bar-row" key={label}>
                  <div className="bar-caption">
                    <span>{label}</span>
                    <strong>{value}%</strong>
                  </div>

                  <div className="bar-track">
                    <motion.div
                      className={`bar-fill bar-${i}`}
                      initial={{ width: reducedMotion ? `${value}%` : 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.9,
                        delay: reducedMotion ? 0 : i * 0.15,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              ))}

              <p className="chart-footnote">
                Условные числа для иллюстрации,
                не результаты исследования.
              </p>
            </div>

            <div className="insights">
              <span className="mini-label">ВОЗМОЖНЫЕ ГИПОТЕЗЫ</span>
              {[
                "Стоимость доставки появляется слишком поздно.",
                "Форма заказа сложная или работает с ошибкой.",
                "Покупателю не хватает информации об условиях.",
              ].map((text) => (
                <div className="insight" key={text}>
                  <ChevronRight size={20} />
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <Note>
            Аналитика показывает действия, но не мысли.
            Причины проверяют тестами, наблюдениями и обратной связью.
          </Note>
        </>
      );

    case 7:
      return (
        <>
          <Heading
            eyebrow="07 / UX И ТЕХНИКА"
            title="Сайт должен"
            highlight="помогать, а не мешать."
            description="После перехода из поиска важны понятный интерфейс, логичная навигация и стабильная работа."
          />

          <div className="grid-three">
            <Card
              icon={Fingerprint}
              title="Понятный интерфейс"
              text="Ясные кнопки, короткие формы и сообщения об ошибках, которые помогают исправить ввод."
            />
            <Card
              icon={Layers3}
              title="Логичные связи"
              text="Разделы и внутренние ссылки ведут к действительно связанным материалам."
              accent="cyan"
            />
            <Card
              icon={Zap}
              title="Быстрая работа"
              text="Загрузка, отзывчивость и стабильность интерфейса проверяются измерениями."
              accent="green"
            />
          </div>

          <div className="metrics-row">
            <span><strong>LCP</strong> Загрузка</span>
            <span><strong>INP</strong> Отзывчивость</span>
            <span><strong>CLS</strong> Стабильность</span>
          </div>

          <Note>
            Рекомендации ИИ по коду сначала проверяют.
            Пользу изменений оценивают на реальных данных.
          </Note>
        </>
      );

    case 8:
      return (
        <>
          <Heading
            eyebrow="08 / ПРАКТИЧЕСКИЙ СЦЕНАРИЙ"
            title="От идеи"
            highlight="к измеримому результату."
            description="Пример интернет-магазина ноутбуков: последовательное улучшение вместо бесконтрольной генерации страниц."
          />

          <div className="practice-grid">
            {[
              ["Определить цель", "Что улучшить и по какому показателю это оценивать."],
              ["Собрать данные", "Характеристики, запросы и обезличенные отчёты."],
              ["Спланировать контент", "Темы статей и структура товарных страниц."],
              ["Создать и проверить", "Черновики, метатеги и редакторская проверка."],
              ["Улучшить путь", "Выбор товара, доставка и оформление заказа."],
              ["Измерить изменения", "Трафик, заявки и покупки с учётом контекста."],
            ].map(([title, text], i) => (
              <article className="practice-card" key={title}>
                <span className="practice-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>

          <Note>
            ИИ ускоряет процесс, но не гарантирует
            конкретный процент роста трафика или продаж.
          </Note>
        </>
      );

    default:
      return (
        <>
          <Heading
            eyebrow="09 / ГЛАВНЫЙ ВЫВОД"
            title="Сильный инструмент."
            highlight="Осознанное применение."
            description="Лучший результат появляется, когда возможности нейросети дополняют профессиональные знания."
          />

          <div className="grid-three">
            <Card
              icon={Check}
              title="Проверять факты"
              text="Не публиковать выдуманные характеристики, цены, ссылки и гарантии."
              accent="green"
            />
            <Card
              icon={ShieldCheck}
              title="Защищать данные"
              text="Не передавать лишнюю персональную или конфиденциальную информацию."
              accent="cyan"
            />
            <Card
              icon={Target}
              title="Измерять пользу"
              text="Оценивать качество и реальные результаты, а не количество сгенерированного текста."
            />
          </div>

          <div className="final-equation">
            <span>Искусственный интеллект</span>
            <b>+</b>
            <span>Экспертиза человека</span>
            <b>=</b>
            <span className="gradient-text">Полезный сайт</span>
          </div>
        </>
      );

    case 10:
      return <StarFinale />;
  }
}

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenAvailable, setFullscreenAvailable] = useState(false);

  const reducedMotion = useReducedMotion();
  const currentRef = useRef(0);
  const headingRegion = useRef<HTMLDivElement>(null);
  const focusOnChange = useRef(false);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback((index: number, focus = false) => {
    const next = Math.max(0, Math.min(TOTAL - 1, index));
    if (next === currentRef.current) return;

    focusOnChange.current = focus;
    setDirection(next > currentRef.current ? 1 : -1);
    currentRef.current = next;
    setCurrent(next);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (document.querySelector("dialog[open]")) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const target = event.target as HTMLElement;
      if (
        target.closest(
          "input, textarea, select, [contenteditable='true']"
        )
      ) return;

      if (event.key === " " && target.closest("button")) return;

      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(currentRef.current + 1, true);
      }

      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(currentRef.current - 1, true);
      }

      if (event.key === "Home") {
        event.preventDefault();
        goTo(0, true);
      }

      if (event.key === "End") {
        event.preventDefault();
        goTo(TOTAL - 1, true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo]);

  useEffect(() => {
    setFullscreenAvailable(Boolean(document.fullscreenEnabled));

    const update = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", update);
    return () => {
      document.removeEventListener("fullscreenchange", update);
    };
  }, []);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Браузер может запретить полноэкранный режим.
      setFullscreenAvailable(false);
    }
  }

  const progress = ((current + 1) / TOTAL) * 100;

  const transitionStyle = current % 4;

  const entrance = reducedMotion
    ? { opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0, filter: "blur(0px)" }
    : [
        {
          opacity: 0,
          x: direction * 65,
          y: 0,
          scale: 1,
          rotateY: 0,
          filter: "blur(5px)",
        },
        {
          opacity: 0,
          x: 0,
          y: 20,
          scale: 0.94,
          rotateY: 0,
          filter: "blur(4px)",
        },
        {
          opacity: 0,
          x: direction * 25,
          y: 0,
          scale: 1,
          rotateY: direction * 9,
          filter: "blur(0px)",
        },
        {
          opacity: 0,
          x: 0,
          y: direction * 45,
          scale: 1.025,
          rotateY: 0,
          filter: "blur(6px)",
        },
      ][transitionStyle];

  return (
    <div className="presentation">
      <StarrySky />

      <PresentationEffects
        current={current}
        onSelect={(index) => goTo(index, true)}
      />

      <header className="topbar">
        <div className="brand">
          <div className="brand-icon"><Sparkles size={19} /></div>
          <span>AI <b>×</b> SEO</span>
        </div>

        <div className="topbar-right">
          <span className="slide-counter">
            {String(current + 1).padStart(2, "0")}
            <span> / 11</span>
          </span>

          {fullscreenAvailable && (
            <button
              className="icon-button"
              onClick={toggleFullscreen}
              aria-label={
                fullscreen
                  ? "Выйти из полноэкранного режима"
                  : "Включить полноэкранный режим"
              }
            >
              {fullscreen
                ? <Minimize2 size={18} />
                : <Maximize2 size={18} />}
            </button>
          )}
        </div>
      </header>

      <main
        className="stage"
        aria-label="Слайды презентации"
        onTouchStart={(event) => {
          if (event.touches.length !== 1) {
            touch.current = null;
            return;
          }

          touch.current = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
          };
        }}
        onTouchEnd={(event) => {
          if (!touch.current || !event.changedTouches.length) return;

          const dx = event.changedTouches[0].clientX - touch.current.x;
          const dy = event.changedTouches[0].clientY - touch.current.y;

          if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            goTo(currentRef.current + (dx < 0 ? 1 : -1), true);
          }

          touch.current = null;
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={current}
            className="slide-scroll"
            initial={entrance}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateY: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: reducedMotion ? 1 : 0,
              x: reducedMotion ? 0 : direction * -25,
              scale: reducedMotion ? 1 : 0.985,
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => {
              if (focusOnChange.current) {
                headingRegion.current?.focus({ preventScroll: true });
                focusOnChange.current = false;
              }
            }}
          >
            <div
              className="slide-content"
              ref={headingRegion}
              tabIndex={-1}
              role="group"
              aria-label={`Слайд ${current + 1}: ${titles[current]}`}
            >
              <SlideContent index={current} />
            </div>
          </motion.section>
        </AnimatePresence>
      </main>

      <footer className="bottom-bar">
        <div className="navigation-hint">
          <span>←</span><span>→</span>
          <p>или свайп</p>
        </div>

        <nav className="slide-navigation" aria-label="Выбор слайда">
          {slideLabels.map((label, index) => (
            <button
              key={label}
              className={`slide-dot ${index === current ? "active" : ""}`}
              onClick={() => goTo(index, true)}
              aria-label={`Слайд ${index + 1}: ${label}`}
              aria-current={index === current ? "step" : undefined}
              title={label}
            />
          ))}
        </nav>

        <div className="navigation-buttons">
          <button
            className="back-button"
            disabled={current === 0}
            onClick={() => goTo(current - 1, true)}
            aria-label="Предыдущий слайд"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            className="next-button"
            disabled={current === TOTAL - 1}
            onClick={() => goTo(current + 1, true)}
            aria-label="Следующий слайд"
          >
            <span>Далее</span>
            <ArrowRight size={19} />
          </button>
        </div>
      </footer>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Прогресс презентации"
        aria-valuemin={1}
        aria-valuemax={TOTAL}
        aria-valuenow={current + 1}
      >
        <motion.div
          className="progress-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: reducedMotion ? 0 : 0.35 }}
        />
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Слайд {current + 1} из {TOTAL}: {titles[current]}
      </div>
    </div>
  );
}
