"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function ProjectCard({
  title,
  year,
  type,
  description,
  tech,
  image,
  live,
  github,
  placeholder = false,
}: {
  title: string;
  year: string;
  type: string;
  description: string;
  tech?: string[];
  image?: string;
  live?: string;
  github?: string;
  placeholder?: boolean;
}) {
  return (
    <div
      className="
        relative flex flex-col md:flex-row
        min-h-[320px] md:h-[340px]
        rounded-3xl overflow-hidden
        bg-white/[0.04] border border-white/10
        backdrop-blur-xl
      "
    >
      {/* CONTENT */}
      <div className="flex flex-col justify-between p-6 md:p-8 md:w-1/2">
        <div>
          <span className="inline-block mb-4 px-4 py-1 text-xs rounded-full border border-orange text-orange-400">
            {year} · {type}
          </span>

          <h3 className="text-2xl md:text-3xl font-semibold mb-3 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
            {title}
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed">
            {description}
          </p>

          {!placeholder && tech && (
            <div className="flex flex-wrap gap-2 mt-5">
              {tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs rounded-full border border-white/10 text-gray-300"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {!placeholder && (
          <div className="flex gap-3 mt-6">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-circle"
              >
                ↗
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-circle"
              >
                <i className="devicon-github-original text-[20px]" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* IMAGE */}
      <div className="relative md:w-1/2 h-[180px] md:h-full">
        {!placeholder && image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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
      id="projects"
      ref={sectionRef}
      className="
        relative md:pt-10 md:pb-20 bg-black overflow-hidden
        scroll-mt-[120px]
      "
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
            text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem]
            sm:
            font-extrabold tracking-widest
            bg-gradient-to-b from-white/15 via-white/5 to-transparent
            bg-clip-text text-transparent select-none
          "
        >
          PROJECTS
        </h2>
      </div>

      {/* CONTENT */}
      <div
        className="
          relative z-10 max-w-7xl mx-auto
          mt-28 sm:mt-32
          grid grid-cols-1 md:grid-cols-2
          gap-8 md:gap-10
          px-6 pb-10
        "
      >
        <div
          className={`
            transition-all duration-1000 ease-out delay-100
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
          `}
        >
          <ProjectCard
            title="SlotSure"
            year="2025"
            type="Web App"
            description="Smart no-show reduction appointment booking platform designed for clinics and service-based businesses."
            tech={["React", "PostgreSQL"]}
            image="/project.png"
            live="https://slotsure.vercel.app/"
            github="https://github.com/jamiecoded/slotsure"
          />
        </div>

        <div
          className={`
            transition-all duration-1000 ease-out delay-200
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
          `}
        >
          <ProjectCard
            title="Next Project"
            year="2026"
            type="In Progress"
            description="Currently building something meaningful. Details coming soon."
            placeholder
          />
        </div>
      </div>
    </section>
  );
}
