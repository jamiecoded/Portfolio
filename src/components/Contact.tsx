"use client";

import { Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    console.log("FORM SUBMITTED"); // 👈 ADD THIS
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        pt-20 pb-20
        sm:pt-28 sm:pb-28
        md:py-32
        bg-black text-white overflow-hidden
      "
    >
      {/* BACKGROUND HEADING */}
      <div className="absolute inset-x-0 top-10 sm:top-20 flex justify-center pointer-events-none">
        <h2
          className="
            text-[4.5rem] sm:text-[5rem] md:text-[7rem]
            font-extrabold tracking-widest
            bg-gradient-to-b from-white/15 via-white/5 to-transparent
            bg-clip-text text-transparent
            select-none
          "
        >
          CONTACT
        </h2>
      </div>

      <div
        className="
          relative z-10
          max-w-7xl mx-auto
          px-6 sm:px-10
          mt-24 sm:mt-32 md:mt-40
          grid grid-cols-1 lg:grid-cols-2
          gap-16 lg:gap-24
        "
      >
        {/* LEFT CONTENT */}
        <div
          className={`
            flex flex-col justify-center
            transition-all duration-1000 ease-out
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
          `}
        >
          <h3 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
            Let’s work together
          </h3>

          <p className="text-gray-400 mb-2 max-w-md">
            I’m available for full-time roles & freelance projects.
          </p>

          <p className="text-gray-400 mb-8 max-w-md">
            My inbox is always open — whether you have a question or just want to say hi.
          </p>

          <a
            href="mailto:sanjames.dev@gmail.com"
            className="
              inline-flex items-center gap-3 w-fit
              px-6 py-4 rounded-xl
              bg-white/[0.04] backdrop-blur-xl
              border border-white/10
              text-orange-400
              hover:bg-white/[0.08] transition
            "
          >
            <Mail size={18} />
            sanjames.dev@gmail.com
          </a>
        </div>

        {/* RIGHT FORM */}
        <div
          className={`
            relative
            transition-all duration-1000 ease-out delay-150
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
          `}
        >
          {/* GLOWS */}
          <div className="absolute -top-16 -right-16 w-[220px] h-[220px] bg-orange-500/25 blur-[60px] rounded-full z-0" />
          <div className="absolute -bottom-16 -left-16 w-[160px] h-[160px] bg-orange-500/25 blur-[60px] rounded-full z-0" />

          {/* FORM */}
          <div
            className="
              relative z-10
              rounded-3xl
              p-6 sm:p-8 md:p-10
              bg-white/[0.02]
              border border-white/10
              shadow-[0_40px_120px_rgba(0,0,0,0.6)]
            "
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white outline-none"
                  required
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white outline-none"
                  required
                />
              </div>

              <input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white outline-none"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white outline-none resize-none"
                required
              />

              <button
  type="submit"
  disabled={loading || status === "success"}
  className={`
    w-full px-6 py-4 rounded-xl
    font-semibold text-black
    transition-all duration-500
    ${
      status === "success"
        ? "bg-gradient-to-r from-yellow-500 to-amber-700"
        : "bg-gradient-to-r from-orange-600 to-amber-500 hover:brightness-110"
    }
    disabled:opacity-80
  `}
>
  {loading
    ? "Sending..."
    : status === "success"
    ? "✓ Message Sent"
    : "➤ Send Message"}
</button>

              {status === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
