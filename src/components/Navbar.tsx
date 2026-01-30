"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const targetScroll = useRef(0);
  const smoothScroll = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [, forceRender] = useState(0);

  /* =========================
     MOBILE DETECTION
  ========================= */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* =========================
     SCROLL SYNC (DESKTOP ONLY)
  ========================= */
  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      targetScroll.current = window.scrollY;
    };

    window.addEventListener("scroll", onScroll);

    const animate = () => {
      smoothScroll.current +=
        (targetScroll.current - smoothScroll.current) * 0.06;

      forceRender((n) => n + 1);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  const scrollY = smoothScroll.current;

  /* =========================
     ACTIVE SECTION
  ========================= */
  useEffect(() => {
    const sections = ["home", "about", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "-45% 0px -45% 0px",
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* =========================
     GLASS (UNCHANGED)
  ========================= */
  const BASE_RADIUS = 10;
  const SOFT_RADIUS = 36;
  const PILL_RADIUS = 999;

  const t = isMobile
    ? 1
    : Math.min(Math.max((scrollY - 20) / 340, 0), 1);

  const eased = t * t * (3 - 2 * t);

  const radiusPx =
    eased < 0.5
      ? BASE_RADIUS + eased * 2 * (SOFT_RADIUS - BASE_RADIUS)
      : SOFT_RADIUS + (eased - 0.5) * 2 * (PILL_RADIUS - SOFT_RADIUS);

  const glassOpacity = isMobile ? 0.1 : Math.min(t * 0.1, 0.1);
  const blurPx = isMobile ? 20 : Math.max((t - 0.1) * 20, 0);
  const shadowOpacity = isMobile ? 0.35 : Math.min(t * 0.35, 0.35);
  const noiseOpacity = isMobile ? 0.25 : Math.max((t - 0.15) * 0.4, 0);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setOpen(false);
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      {/* PILL (UNCHANGED SHAPE) */}
      <div
        className={`
          relative overflow-hidden
          transition-all duration-500 ease-out
          ${isMobile ? "w-[300px]" : "w-auto"}
          h-[56px]
        `}
        style={{
          borderRadius: `${radiusPx}px`,
          backgroundColor: `rgba(255,255,255,${glassOpacity})`,
          backdropFilter: `blur(${blurPx}px)`,
          boxShadow: `0 8px 30px rgba(0,0,0,${shadowOpacity})`,
        }}
      >
        {/* Noise */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/noise.svg')",
            opacity: noiseOpacity,
          }}
        />

        {/* TOP BAR */}
        <div className="relative z-10 flex items-center justify-between px-4 h-14">
          {/* LOGO */}
          <div className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
            <Image src="/logo.svg" alt="logo" width={18} height={18} />
          </div>

          {/* DESKTOP LINKS */}
          <ul className="hidden md:flex gap-10 px-10">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`transition-colors ${
                    active === item.id
                      ? "text-orange-400"
                      : "text-white hover:text-orange-300"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN (SLIDES DOWN) */}
      <div
        className={`
          md:hidden
          mt-2
          w-[300px]
          overflow-hidden
          transition-all duration-400 ease-out
          ${open ? "max-h-[220px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
        `}
        style={{
          borderRadius: "24px",
          backgroundColor: `rgba(255,255,255,${glassOpacity})`,
          backdropFilter: `blur(${blurPx}px)`,
          boxShadow: `0 8px 30px rgba(0,0,0,${shadowOpacity})`,
        }}
      >
        <ul className="flex flex-col items-center gap-5 py-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`text-lg transition-colors ${
                  active === item.id
                    ? "text-orange-400"
                    : "text-white hover:text-orange-300"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
