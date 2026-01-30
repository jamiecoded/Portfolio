"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const [floatY, setFloatY] = useState(0);

  useEffect(() => {
    setMounted(true);
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    let frame = 0;
    const animate = () => {
      frame += 0.015;
      setFloatY(Math.sin(frame) * 16);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || isTouch) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* =========================
          BACKGROUND TEXT
      ========================= */}

      {/* DESKTOP / TABLET */}
      <div
        className={`
          hidden md:flex
          absolute inset-0 items-center justify-center
          transition-opacity duration-1000
          ${mounted ? "opacity-100" : "opacity-0"}
        `}
        style={{ zIndex: 1 }}
      >
        <h1 className="
          text-[14rem] lg:text-[18rem]
          font-extrabold tracking-widest
          bg-gradient-to-b from-white/15 via-white/6 to-transparent
          bg-clip-text text-transparent
          select-none
        ">
          JAMES
        </h1>
      </div>

      {/* MOBILE — SPLIT TEXT */}
      <div
        className={`
          md:hidden
          absolute inset-0
          flex flex-col items-center
          pt-20
          transition-opacity duration-1000
          ${mounted ? "opacity-100" : "opacity-0"}
        `}
        style={{ zIndex: 1 }}
      >
        <span className="
          text-[12rem]
          font-black tracking-widest
          bg-gradient-to-b from-white/18 to-transparent
          bg-clip-text text-transparent
          -ml-4 -mt-10
        ">
          JAM
        </span>
        <span className="
          text-[20rem]
          font-extrabold tracking-widest
          bg-gradient-to-b from-white/18 to-transparent
          bg-clip-text text-transparent
          -mr-4 -mt-40
        ">
          ES
        </span>
      </div>

      {/* =========================
          PORTRAIT
      ========================= */}
      <div
        className={`
          absolute left-1/2 top-90
          -translate-x-1/2 -translate-y-1/2
          transition-all duration-1000
          ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        style={{ zIndex: 3 }}
      >
        <div
          ref={imageRef}
          className="
            relative
            w-[280px] h-[460px]
            md:w-[380px] md:h-[480px]
            lg:w-[460px] lg:h-[560px]
          "
          onMouseMove={handleMouseMove}
          onMouseEnter={() => !isTouch && setHovered(true)}
          onMouseLeave={() => !isTouch && setHovered(false)}
          style={{
            transform: `translateY(${floatY}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <Image
            src="/normal.png"
            alt="Portrait"
            fill
            priority
            className="object-cover rounded-xl"
          />

          {!isTouch && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.25s ease-out",
                clipPath: hovered
                  ? `circle(80px at ${mousePos.x}% ${mousePos.y}%)`
                  : `circle(0px at 50% 50%)`,
              }}
            >
              <Image
                src="/robotic.png"
                alt="Robotic portrait"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          )}
        </div>
      </div>

      {/* =========================
          MOBILE TEXT STACK
      ========================= */}
      <div
        className={`
          md:hidden
          w-full
          absolute left-1/2
          -translate-x-1/2
          top-[66%]
          text-center
          max-w-[90%]
          transition-all duration-1000 delay-300
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        style={{ zIndex: 4 }}
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
          Building Real-World  <br /> Web Products
        </h2>

        <p className="text-[0.9rem] mt-2 text-gray-400">
          Clean, functional & intelligent web experiences.
        </p>

        <p className="text-[0.6rem] mt-15 text-gray-500">
          Creative Developer · AI / Design / Fullstack
        </p>
      </div>

      {/* =========================
          DESKTOP TEXT (UNCHANGED)
      ========================= */}
      <div className="hidden md:block absolute bottom-20 left-20 max-w-md z-10">
        <h2 className="text-lg font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
          Building Real-World Web Products
        </h2>
        <p className="text-sm mt-1 text-gray-500">
          I’m a fresher developer focused on building clean, functional, and
          intelligent web experiences.
        </p>
      </div>

      <div className="hidden md:block absolute bottom-20 right-20 text-right z-10">
        <p className="text-sm text-gray-500">
          <span className="text-lg bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
            Creative Developer
          </span>
          <br />
          AI / Design / Fullstack
        </p>
      </div>
    </section>
  );
}
