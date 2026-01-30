"use client";

import { useEffect, useRef, useState } from "react";

const ROW_1 = [
  { name: "HTML", icon: "devicon-html5-plain" },
  { name: "CSS", icon: "devicon-css3-plain" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
  { name: "JavaScript", icon: "devicon-javascript-plain" },
  { name: "React", icon: "devicon-react-original" },
  { name: "Next.js", icon: "devicon-nextjs-plain" },
  { name: "Node.js", icon: "devicon-nodejs-plain" },
  { name: "Express", icon: "devicon-express-original" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
  { name: "MongoDB", icon: "devicon-mongodb-plain" },
  { name: "Rest API", icon: "devicon-nodejs-plain" },
];

const ROW_2 = [
  { name: "Docker", icon: "devicon-docker-plain" },
  { name: "AWS", icon: "devicon-amazonwebservices-plain" },
  { name: "Postman", icon: "devicon-postman-plain" },
  { name: "Framer", icon: "devicon-framer-original" },
  { name: "Figma", icon: "devicon-figma-plain" },
  { name: "Spline", icon: "devicon-threejs-original" },
  { name: "Photoshop", icon: "devicon-photoshop-plain" },
  { name: "Illustrator", icon: "devicon-illustrator-plain" },
  { name: "Canva", icon: "devicon-canva-plain" },
];

function Marquee({
  items,
  reverse = false,
}: {
  items: { name: string; icon: string }[];
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden group">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <div
        className={`
          marquee-track
          ${reverse ? "animate-marquee-reverse" : "animate-marquee"}
        `}
      >
        {items.map((item, i) => (
          <SkillPill key={`a-${i}`} item={item} />
        ))}
        {items.map((item, i) => (
          <SkillPill key={`b-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function SkillPill({
  item,
}: {
  item: { name: string; icon: string };
}) {
  return (
    <div
      className="
        flex items-center gap-4
        px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3
        rounded-lg sm:rounded-xl
        bg-white/[0.04]
        border border-white/10
        backdrop-blur-xl
        text-gray-200
        whitespace-nowrap
      "
    >
      <i className={`${item.icon} colored text-xl sm:text-2xl`} />
      <span className="text-xs sm:text-sm font-medium">{item.name}</span>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    const onScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.min(
        Math.max(1 - rect.top / window.innerHeight, 0),
        1
      );

      setScrollOffset(progress * 10);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative
  pt-8 pb-32
  sm:pt-10 sm:pb-14
  md:pt-10 md:pb-30
  bg-black overflow-hidden"
    >
      {/* BACKGROUND HEADING */}
      <div
        className={`
          absolute inset-x-0 top-5 flex justify-center pointer-events-none
          transition-all duration-1000 ease-out
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
        `}
        style={{
          transform: `translateY(${inView ? -scrollOffset : 16}px)`
        }}
      >
        <h2
          className="
            text-[3.5rem] sm:text-[5rem] md:text-[6rem]
            font-extrabold tracking-widest
            bg-gradient-to-b from-white/15 via-white/5 to-transparent
            bg-clip-text text-transparent
            select-none
          "
        >
          SKILLS
        </h2>
      </div>

      {/* MARQUEES */}
      <div
        className={`
          relative z-10 w-full mx-auto mt-24 sm:mt-32 md:mt-40 space-y-8 sm:space-y-10 md:space-y-12
          transition-all duration-1000 ease-out delay-150
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
        `}
        style={{
          transform: `translateY(${inView ? -scrollOffset : 16}px)`
        }}
      >
        <Marquee items={ROW_1} />
        <Marquee items={ROW_2} reverse />
      </div>
    </section>
  );
}
