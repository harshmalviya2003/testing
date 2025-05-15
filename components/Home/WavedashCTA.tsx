
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function WavedashCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detect dark mode
    const isDarkMode = document.documentElement.classList.contains("dark");

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = sectionRef.current!.offsetWidth;
      canvas.height = sectionRef.current!.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 1,
        speedX: Math.random() * 0.25 - 0.125, // Slower movement
        speedY: Math.random() * 0.25 - 0.125,
        opacity: Math.random() * 0.3 + 0.2,
      });
    }

    // GSAP animation with connections
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap particles
        if (particle.x < 0) particle.x += canvas.width;
        if (particle.x > canvas.width) particle.x -= canvas.width;
        if (particle.y < 0) particle.y += canvas.height;
        if (particle.y > canvas.height) particle.y -= canvas.height;

        // Draw particle with glow in dark mode
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode
          ? `rgba(var(--primary-foreground-rgb, 255, 255, 255), ${particle.opacity})`
          : `rgba(var(--primary-rgb, 59, 130, 246), ${particle.opacity})`;
        ctx.shadowColor = isDarkMode ? "rgba(255, 255, 255, 0.3)" : "transparent";
        ctx.shadowBlur = isDarkMode ? 8 : 0;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDarkMode
              ? `rgba(var(--primary-foreground-rgb, 255, 255, 255), ${0.1 * (1 - distance / 100)})`
              : `rgba(var(--primary-rgb, 59, 130, 246), ${0.05 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        ctx.shadowBlur = 0; // Reset shadow
      });
    };

    // Use GSAP ticker
    gsap.ticker.add(animate);

    // Parallax on mouse move (desktop only)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      particles.forEach((particle) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          particle.x += dx * 0.01;
          particle.y += dy * 0.01;
        }
      });
    };
    if (!isMobile) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }

    // Cleanup
    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener("resize", resizeCanvas);
      if (!isMobile) {
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-4 bg-muted/10 dark:bg-muted/20 dark:bg-gradient-to-r dark:from-primary/10 dark:to-primary/5 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80 dark:opacity-90" aria-hidden="true" />
      <div className="relative z-10 container mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-card dark:bg-muted/50 p-8 rounded-xl border border-primary/10 bg-primary/5 dark:bg-primary/10 backdrop-blur-sm shadow-lg max-w-3xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-foreground dark:text-foreground hover:tracking-wide transition-all duration-300"
          >
            Ready to <span className="text-primary dark:text-primary">Go Pro?</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground dark:text-muted-foreground text-base md:text-lg mb-6 max-w-2xl mx-auto"
          >
            Try Wavedash, and get back to building amazing games, faster than ever before.
          </motion.p>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Button
              size="lg"
              className="group bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90 shadow-lg hover:shadow-xl transition-shadow"
              asChild
            >
              <a href="/signup" aria-label="Try Wavedash for free">
                Try Wavedash For Free
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
