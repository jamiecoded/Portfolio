"use client";

import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    date: "Nov 2025 – Dec 2025",
    company: "J.P. MORGAN",
    location: "",
    mode: "Remote",
    role: "Software Engineering Job Simulation (Forage)",
    description:
      "J.P. Morgan Chase & Co. is a leading global financial services firm providing investment banking, market-making, and asset management services.",
    points: [
      "Executed enterprise-style software engineering tasks under strict deadlines, simulating real-world development workflows used in large financial institutions.",
      "Validated, processed, and transformed structured datasets by applying business-rule logic, data integrity checks, and accuracy controls to produce execution-ready outputs.",
      "Independently debugged and resolved issues while adhering to production-level quality standards, technical specifications, and reliability expectations.",
    ],
    tech: [
      "Python",
      "Data Validation & Analysis",
      "Structured Datasets",
      "Problem Solving",
      "Git",
    ],
  },
  {
    date: "May 2023 – Aug 2023",
    company: "BOARD INFINITY",
    location: "Maharastra, India",
    mode: "Remote",
    role: "Full Stack Developer Intern",
    description:
      "Board Infinity is a career-first Learning & Development platform bridging the gap between education and industry through outcome-driven, industry-aligned programs.",
    points: [
      "Developed and delivered responsive, component-based web applications using React.js and modern JavaScript (ES6+), ensuring cross-device compatibility and clean UI architecture.",
      "Built and integrated RESTful APIs with backend services and SQL databases, designing schemas, writing optimized queries, and implementing validated CRUD operations.",
      "Independently owned end-to-end feature development, debugging, refactoring, and performance optimization while meeting deadlines in a remote, fast-paced environment.",
    ],
    tech: [
      "React.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "RESTful APIs",
      "SQL",
      "Git",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);

  /* ===== TIMELINE SCROLL ===== */
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = rect.height - windowHeight;
      const current = Math.min(Math.max(-rect.top, 0), total);

      setProgress(total > 0 ? current / total : 0);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== SECTION VISIBILITY ===== */
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative pt-30 pb-20 bg-black text-white overflow-hidden"
    >
      {/* HEADING */}
      <div
        className={`
          absolute inset-x-0 top-0 flex justify-center pointer-events-none
          transition-all duration-1000 ease-out
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
        `}
      >
        <h2
          className="
            py-20
            text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem]
            font-extrabold tracking-widest
            bg-gradient-to-b from-white/30 via-white/5 to-transparent
            bg-clip-text text-transparent
          "
        >
          EXPERIENCE
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-28 px-6">
        {/* ===== MOBILE TIMELINE ===== */}
        <div className="md:hidden absolute left-4 top-0 h-full">
          <div className="relative h-full w-[3px] bg-white/10 rounded-full">
            <div
              className="absolute top-0 w-[3px] rounded-full"
              style={{
                height: `${progress * 100}%`,
                background:
                  "linear-gradient(180deg, #f12711, #f5af19, #f7ff00)",
              }}
            />
            <div
              className="absolute -left-[6px]"
              style={{ top: `calc(${progress * 100}% - 8px)` }}
            >
              <div className="w-4 h-4 rounded-full bg-white" />
            </div>
          </div>
        </div>

        {/* ===== DESKTOP / TABLET TIMELINE ===== */}
        <div className="hidden md:block absolute left-1/3 top-0 h-full -translate-x-1/2">
          <div className="relative h-full w-[2px] bg-white/10">
            <div
              className="absolute top-0 w-[2px]"
              style={{
                height: `${progress * 100}%`,
                background:
                  "linear-gradient(180deg, #f12711, #f5af19, #f7ff00)",
              }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: `calc(${progress * 100}% - 6px)` }}
            >
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
        </div>

        {/* EXPERIENCE BLOCKS */}
        <div className="space-y-16 md:space-y-32">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`
                grid grid-cols-1 md:grid-cols-[1fr_80px_2fr]
                gap-5 items-start
                pl-10 md:pl-0
                transition-all duration-1000 ease-out
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
              `}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* META */}
              <div className="text-sm text-gray-400">
                <div className="uppercase tracking-wide text-xs mb-1">
                  {exp.date}
                </div>
                <h3 className="text-2xl font-semibold mb-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-400 bg-clip-text text-transparent">
                  {exp.company}
                </h3>
                <div className="text-gray-500">{exp.location}</div>
                <div className="text-gray-500">{exp.mode}</div>
              </div>

              <div className="hidden md:block" />

              {/* CONTENT */}
              <div>
                <h4 className="text-3xl md:text-2xl font-semibold mb-2 bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-400 bg-clip-text text-transparent">
                  {exp.role}
                </h4>

                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2 text-gray-300 leading-relaxed">
                  {exp.points.map((p, idx) => (
                    <li key={idx}>• {p}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-6">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs rounded-full border border-white/25 text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
