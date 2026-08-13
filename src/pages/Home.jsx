import React, { useContext, useState } from 'react';
import { useSpring, useInView, animated, easings } from '@react-spring/web';
import { Link } from 'react-router-dom';
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';
import {
  LuSparkles,
  LuArrowRight,
  LuArrowUpRight,
  LuDownload,
  LuCalculator,
  LuLayoutGrid,
  LuLeaf,
  LuFolder,
  LuShare2,
  LuCheck,
  LuCheckCircle,
  LuRuler,
  LuLibrary,
  LuUsers,
  LuPlus,
} from 'react-icons/lu';
import TopSVG from '../assets/Frame2.svg?react';
import BottomSVG from '../assets/Frame1.svg?react';
import './Home.css';

/* Accent pairs — a strong colour plus its faint tint, so feature markers and
   icon chips stay on-brand without needing color-mix(). */
const ACCENT = {
  blue: { c: 'var(--blue-500)', soft: 'var(--blue-tint)' },
  green: { c: 'var(--green-500)', soft: 'var(--green-tint)' },
  amber: { c: 'var(--amber-500)', soft: 'var(--amber-tint)' },
  indigo: { c: 'var(--indigo-500)', soft: 'var(--indigo-tint)' },
  tomato: { c: 'var(--tomato-500)', soft: 'var(--tomato-tint)' },
  cyan: { c: 'var(--cyan-500)', soft: 'var(--cyan-tint)' },
};

/* Honour reduced-motion preferences: entrance/reveal animations are skipped. */
const REDUCED =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Landing entrance is pure CSS (GPU-composited, no JS timing): elements carry
   a skhome__enter* class; enter() supplies the per-item animation-delay inline. */
const enter = (delay, extra) => ({
  animationDelay: `${delay}ms`,
  ...(extra || {}),
});

const ENTER = { duration: 600, easing: easings.easeOutCubic };

/* Scroll-in reveal: fades/slides children in the first time they enter view. */
function Reveal({ children, delay = 0, y = 28, className }) {
  const [ref, inView] = useInView({ threshold: 0.15, once: true });
  const styles = useSpring({
    from: { opacity: 0, transform: `translateY(${y}px)` },
    to: inView
      ? { opacity: 1, transform: 'translateY(0px)' }
      : { opacity: 0, transform: `translateY(${y}px)` },
    delay: inView ? delay : 0,
    config: ENTER,
    immediate: REDUCED,
  });
  return (
    <animated.div ref={ref} className={className} style={styles}>
      {children}
    </animated.div>
  );
}

/* The two brand floor-plan frames, drifting gently on opposite corners of the hero.
   Each is wrapped in a one-time entrance (fade + slide from its corner) that runs
   on landing; the inner element keeps the existing infinite float loop. */
function HeroVisuals() {
  const topStyle = useSpring({
    loop: { reverse: true },
    to: { transform: 'translateY(-15px) scale(1.02)' },
    from: { transform: 'translateY(0px) scale(1)' },
    config: {
      duration: 3000,
      easing: easings.easeInOutSine,
    },
    immediate: REDUCED,
  });

  const bottomStyle = useSpring({
    loop: { reverse: true },
    to: { transform: 'translateY(15px) scale(1.02)' },
    from: { transform: 'translateY(0px) scale(1)' },
    config: {
      duration: 3000,
      easing: easings.easeInOutSine,
    },
    delay: 300,
    immediate: REDUCED,
  });

  return (
    <>
      <div
        className={`skhome__mark${REDUCED ? '' : ' skhome__enter skhome__enter--corner-t'}`}
        style={enter(650, { top: 50, right: '20%' })}
        aria-hidden="true"
      >
        <animated.div style={topStyle}>
          <TopSVG />
        </animated.div>
      </div>
      <div
        className={`skhome__mark${REDUCED ? '' : ' skhome__enter skhome__enter--corner-b'}`}
        style={enter(800, { bottom: 150, left: '20%' })}
        aria-hidden="true"
      >
        <animated.div style={bottomStyle}>
          <BottomSVG />
        </animated.div>
      </div>
    </>
  );
}

function FeatureCard({ step, icon, accent, title, children, plain = false }) {
  const marker = step != null
    ? { background: accent.c, color: '#fff', boxShadow: `0 8px 24px ${accent.soft}` }
    : { background: accent.soft, color: accent.c, boxShadow: `inset 0 0 0 1px ${accent.soft}` };

  return (
    <div className={`skhome__feature${plain ? ' skhome__feature--plain' : ''}`}>
      <span className="skhome__feature-marker" style={marker}>
        {step != null ? String(step).padStart(2, '0') : icon}
      </span>
      <h3 className="skhome__feature-title">{title}</h3>
      <p className="skhome__feature-text">{children}</p>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  /* Landing entrance: badge -> title line 1 -> title line 2 -> sub -> CTAs ->
     trust strip, staggered via animation-delay. Title lines slide up inside
     overflow masks. All pure CSS — runs once on page load. */
  return (
    <section className="skhome__hero">
      <div className="skhome__hero-glow" />

      <HeroVisuals />

      <div className="skhome__container skhome__hero-inner">
        <span
          className={`skhome__eyebrow${REDUCED ? '' : ' skhome__enter'}`}
          style={enter(150, { background: 'var(--surface-card)', paddingLeft: 8, borderRadius: 999 })}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 22,
              height: 22,
              borderRadius: 999,
              background: 'var(--green-500)',
              color: '#fff',
            }}
          >
            <LuSparkles size={13} />
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 400, letterSpacing: '0.04em', color: 'var(--text-body)' }}>
            Free for architects &amp; students
          </span>
        </span>

        <h1 className="skhome__hero-title">
          <span className="skhome__line">
            <span
              className={`skhome__line-in${REDUCED ? '' : ' skhome__enter--line'}`}
              style={enter(280)}
            >
              Revolutionize your
            </span>
          </span>
          <span className="skhome__line">
            <span
              className={`skhome__line-in skhome__hero-accent${REDUCED ? '' : ' skhome__enter--line'}`}
              style={enter(400)}
            >
              design process
            </span>
          </span>
        </h1>

        <p
          className={`skhome__hero-sub${REDUCED ? '' : ' skhome__enter'}`}
          style={enter(520)}
        >
          Schematically is a free-to-use platform for architects, students and vendors to streamline
          and enhance their design process &mdash; with intuitive tools and curated resources.
        </p>

        <div
          className={`skhome__hero-cta${REDUCED ? '' : ' skhome__enter'}`}
          style={enter(640)}
        >
          <Link to="/tools" className="skhome__btn skhome__btn--lg skhome__btn--primary">
            Start with Tools
          </Link>
          <Link to="/resources" className="skhome__btn skhome__btn--lg skhome__btn--secondary">
            Browse Resources
            <LuArrowRight size={16} />
          </Link>
        </div>

        <div className={REDUCED ? undefined : 'skhome__enter'} style={enter(760, { marginTop: 56 })}>
          <div className="skhome__trust-label">Trusted by architects, students and vendors</div>
          <div className="skhome__trust-logos">
            <span>ATELIER</span>
            <span>FORMWORK</span>
            <span>NODE&middot;LAB</span>
            <span>GREENBUILD</span>
            <span>STUDIO 12</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Product mock: the Sanitation Requirement calculator ---------- */
const MOCK_INPUTS = [
  ['Building type', 'Educational'],
  ['Occupancy', '420 persons'],
  ['Code basis', 'NBC 2016'],
];

const MOCK_OUTPUTS = [
  ['Water Closets', '12', ACCENT.blue.c],
  ['Urinals', '8', ACCENT.green.c],
  ['Wash Basins', '10', ACCENT.amber.c],
];

function ToolMock() {
  return (
    <div className="skhome__container" style={{ paddingTop: 8 }}>
      <Reveal>
      <div className="skhome__mock">
        <div className="skhome__mock-bar">
          <span className="skhome__mock-dot" style={{ background: 'var(--tomato-500)' }} />
          <span className="skhome__mock-dot" style={{ background: 'var(--amber-500)' }} />
          <span className="skhome__mock-dot" style={{ background: 'var(--green-500)' }} />
          <span className="skhome__mock-path">tools / sanitation-requirement</span>
        </div>

        <div className="skhome__mock-body">
          <div className="skhome__mock-inputs">
            <span className="skhome__eyebrow skhome__eyebrow--mono">{'// Code & Compliance'}</span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 24,
                color: 'var(--text-primary)',
                margin: '16px 0 18px',
              }}
            >
              Sanitation Fixtures
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MOCK_INPUTS.map(([label, value]) => (
                <div key={label} className="skhome__field">
                  <span>{label}</span>
                  <span className="skhome__field-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="skhome__mock-outputs">
            {MOCK_OUTPUTS.map(([label, value, color]) => (
              <div key={label} className="skhome__readout">
                <span className="skhome__readout-label">{label}</span>
                <span className="skhome__readout-value" style={{ color }}>{value}</span>
              </div>
            ))}
            <Link
              to="/tools/SanReq"
              className="skhome__btn skhome__btn--sm skhome__btn--secondary"
              style={{ marginTop: 4 }}
            >
              Open calculator
              <LuDownload size={15} />
            </Link>
          </div>
        </div>
      </div>
      </Reveal>
    </div>
  );
}

/* ---------- How it works ---------- */
const STEPS = [
  [
    'Simplify Concepts',
    'Our platform simplifies complex design concepts, freeing you from the heavy weight of traditional design ideologies — and letting your creativity flow.',
    ACCENT.blue,
  ],
  [
    'Resources & Assets',
    'Empowered with sophisticated tools, seamlessly integrated resources and high-quality assets that support every phase of your design process.',
    ACCENT.green,
  ],
  [
    'Improve Design Process',
    'Schematically aids in refining your design process, encourages collaboration, and provides a platform to showcase your work and gain feedback.',
    ACCENT.amber,
  ],
];

function Steps() {
  return (
    <section className="skhome__container skhome__section">
      <Reveal>
        <span className="skhome__eyebrow">How it works</span>
        <h2 className="skhome__h2">How Schematically Simplifies Design</h2>
        <p className="skhome__lede">Our platform simplifies complex concepts and enhances your workflow.</p>
      </Reveal>
      <div className="skhome__grid-3">
        {STEPS.map(([title, text, accent], i) => (
          <Reveal key={title} delay={i * 110}>
            <FeatureCard step={i + 1} accent={accent} title={title}>
              {text}
            </FeatureCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Why choose ---------- */
const TASKS = [
  [<LuCalculator size={16} />, 'Run a code-compliance calculation', ACCENT.blue],
  [<LuLayoutGrid size={16} />, 'Pull a detail from the block library', ACCENT.indigo],
  [<LuLeaf size={16} />, 'Drop in a GreenBuild material spec', ACCENT.green],
  [<LuFolder size={16} />, 'Save it to your project dashboard', ACCENT.amber],
  [<LuShare2 size={16} />, 'Share the set with your studio', ACCENT.tomato],
];

const BENEFITS = [
  ['Free for everyone to use', ACCENT.blue],
  ['A collision of ideas from architects and students around the globe', ACCENT.green],
  ['Support the community through optional donations', ACCENT.amber],
];

function WhyChoose() {
  return (
    <section className="skhome__well">
      <div className="skhome__container skhome__section">
        <Reveal>
          <span className="skhome__eyebrow">Why Schematically</span>
          <h2 className="skhome__h2">Why Choose Schematically</h2>
          <p className="skhome__lede">Unlock your creative potential — embrace a world without limits.</p>
        </Reveal>

        <div className="skhome__why">
          <Reveal>
          <div className="skhome__card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TASKS.map(([icon, label, accent], i) => (
                <div key={label} className="skhome__task">
                  <span className="skhome__task-icon" style={{ background: accent.soft, color: accent.c }}>
                    {icon}
                  </span>
                  <span>{label}</span>
                  <span
                    style={{ marginLeft: 'auto', display: 'inline-flex', color: i < TASKS.length - 1 ? accent.c : 'var(--border-strong)' }}
                  >
                    <LuCheck size={16} />
                  </span>
                </div>
              ))}
            </div>
          </div>
          </Reveal>

          <Reveal delay={130}>
          <div>
            <p className="skhome__why-copy">
              Schematically caters to the diverse needs of architects, students, and vendors. Discover
              the unparalleled benefits of an architectural design platform built for the people just
              getting started.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
              {BENEFITS.map(([label, accent]) => (
                <div key={label} className="skhome__benefit">
                  <span style={{ color: accent.c, marginTop: 1, display: 'inline-flex' }}>
                    <LuCheckCircle size={20} />
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Key features ---------- */
const FEATURES = [
  [
    <LuRuler size={22} />,
    'Calculations',
    'Code-compliance, design and material calculators that simplify complex concepts and let your creativity flow.',
    ACCENT.blue,
  ],
  [
    <LuLibrary size={22} />,
    'Extensive Asset Library',
    'Sophisticated tools, integrated resources and high-quality assets that support every phase of your design process.',
    ACCENT.green,
  ],
  [
    <LuUsers size={22} />,
    'Collaboration & Productivity',
    'Refine your process, collaborate with peers, and showcase your work to gain exposure and valuable feedback.',
    ACCENT.tomato,
  ],
];

function Features() {
  return (
    <section className="skhome__container skhome__section">
      <Reveal>
        <span className="skhome__eyebrow">Benefits</span>
        <h2 className="skhome__h2">Key Features</h2>
        <p className="skhome__lede">
          Explore the unique features built to fuel your creativity and expedite your design process.
        </p>
      </Reveal>
      <div className="skhome__split">
        {FEATURES.map(([icon, title, text, accent], i) => (
          <Reveal key={title} delay={i * 110}>
            <FeatureCard plain icon={icon} accent={accent} title={title}>
              {text}
            </FeatureCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonial marquees ---------- */
const QUOTES = [
  'Cut my code-checking time in half.',
  'Finally, byelaws and calculators in one place.',
  'The asset library is a lifesaver for studio.',
  'Made sustainability actually doable for me.',
  'Clean, fast, and genuinely free.',
  'Everything I need without ten tabs open.',
];

const QUOTE_COLORS = [
  ACCENT.blue.c,
  ACCENT.green.c,
  ACCENT.amber.c,
  ACCENT.indigo.c,
  ACCENT.tomato.c,
  ACCENT.cyan.c,
];

function Testimonials() {
  const row = (reversed) => (
    <div className={`skhome__marquee${reversed ? ' skhome__marquee--rev' : ''}`} aria-hidden={reversed || undefined}>
      {QUOTES.concat(QUOTES).map((quote, i) => (
        <div key={`${quote}-${i}`} className="skhome__quote">
          <span className="skhome__quote-avatar" style={{ background: QUOTE_COLORS[i % QUOTE_COLORS.length] }}>
            {String.fromCharCode(65 + (i % 6))}
          </span>
          <span>&ldquo;{quote}&rdquo;</span>
        </div>
      ))}
    </div>
  );

  return (
    <Reveal>
      <div className="skhome__marquee-wrap">
        {row(false)}
        {row(true)}
      </div>
    </Reveal>
  );
}

/* ---------- FAQ ---------- */
const FAQS = [
  [
    'Is Schematically really free?',
    'Yes — every tool, resource and asset is free to use. The platform is community-supported through optional donations.',
  ],
  [
    'Do I need an account to get started?',
    'You can browse tools and resources without one. An account lets you save calculations and organise assets in your personal dashboard.',
  ],
  [
    'Where do the codes and byelaws come from?',
    'Calculators are built on published standards such as NBC 2016. Each tool cites the code basis it uses so you can verify your numbers.',
  ],
  [
    'Can I use the assets in real projects?',
    'Most resources are licensed CC BY 4.0 unless noted. GreenBuild details and block libraries are made for real-world use.',
  ],
  [
    'Is it only for students?',
    'No — it is built for students and junior professionals, but architects and vendors use it to move faster every day.',
  ],
  [
    'How can I contribute or give feedback?',
    'Reach out any time at architect.ajk@gmail.com, or support the project through the Donate page.',
  ],
];

function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="skhome__container skhome__section skhome__faq">
      <Reveal>
        <span className="skhome__eyebrow">FAQs</span>
        <h2 className="skhome__h2">
          Questions? Here&rsquo;s a few of<br />the common ones.
        </h2>
      </Reveal>

      <Reveal delay={120}>
      <div className="skhome__faq-list">
        {FAQS.map(([question, answer], i) => (
          <div key={question} className={`skhome__faq-item${open === i ? ' skhome__faq-item--open' : ''}`}>
            <button
              type="button"
              className="skhome__faq-q"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span>{question}</span>
              <span className="skhome__faq-sign"><LuPlus size={20} /></span>
            </button>
            <div className="skhome__faq-a">
              <div><p>{answer}</p></div>
            </div>
          </div>
        ))}
      </div>
      </Reveal>

      <div className="skhome__faq-foot">
        <span>Do you have any questions?</span>
        <a
          href="mailto:architect.ajk@gmail.com"
          className="skhome__btn skhome__btn--sm skhome__btn--secondary"
        >
          Get in touch
          <LuArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

/* ---------- Get started marquee ---------- */
function CtaMarquee() {
  return (
    <Reveal y={36}>
    <div className="skhome__cta">
      <Link to="/tools" className="skhome__cta-track">
        {Array.from({ length: 6 }).map((_, i) => (
          <React.Fragment key={i}>
            <span
              className="skhome__cta-word"
              style={{ color: i % 2 ? 'var(--blue-500)' : 'var(--text-primary)' }}
            >
              Get started
            </span>
            <span style={{ display: 'inline-flex', color: [ACCENT.green.c, ACCENT.amber.c, ACCENT.tomato.c][i % 3] }}>
              <LuArrowUpRight size={64} />
            </span>
          </React.Fragment>
        ))}
      </Link>
    </div>
    </Reveal>
  );
}

export default function Home() {
  const { mode } = useContext(SchematicContext);

  return (
    <div className={`skhome sk-tokens${mode === 'light' ? ' skhome--light sk-tokens--light' : ''}`}>
      <Hero />
      <ToolMock />
      <Steps />
      <WhyChoose />
      <Features />
      <Testimonials />
      <Faq />
      <CtaMarquee />
    </div>
  );
}
