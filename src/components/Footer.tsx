"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden">
      
      {/* REAL SECTION SEPARATOR */}
      <div className="w-full h-px bg-white/10" />

      <div className="relative -mt-[140px] pt-[140px]">
        <div className="relative z-10 pt-12 pb-5 flex flex-col items-center gap-8">

          {/* SOCIAL ICONS */}
          <div className="flex gap-6">
            {[
              {
                Icon: Github,
                href: "https://github.com/jamiecoded",
                external: true,
              },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/in/jameshere/",
                external: true,
              },
              {
                Icon: Mail,
                href: "mailto:sanjames.dev@gmail.com",
                external: false,
              },
              {
                Icon: Twitter,
                href: "https://x.com/jamiedotio",
                external: true,
              },
            ].map(({ Icon, href, external }, i) => (
              <a
                key={i}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="
                  w-14 h-14 rounded-full
                  flex items-center justify-center
                  bg-white/5 border border-white/10
                  text-white
                  transition-all duration-300 ease-out
                  hover:-translate-y-1
                  hover:bg-orange-500/20
                  hover:shadow-[0_12px_40px_rgba(249,115,22,0.35)]
                "
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* VIGNETTE DIVIDER */}
          <div className="flex items-center w-full max-w-xl gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* COPYRIGHT */}
          <p className="text-sm text-gray-500">
            © 2026 James K. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
