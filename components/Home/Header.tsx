"use client"

import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {  Menu, Globe } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!navRef.current) return

    // Floating Animation
    gsap.to(navRef.current, {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    })

    // Scroll Effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(navRef.current, {
          scale: 0.95,
          opacity: 0.9,
          duration: 0.3,
        })
      } else {
        gsap.to(navRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
        })
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-background/60 backdrop-blur-md border border-primary/20 rounded-full shadow-lg shadow-primary/10 px-6 py-3 max-w-4xl w-full"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
          <motion.div
  variants={navVariants}
  initial="hidden"
  animate="visible"
  className="flex items-center space-x-2"
>
  <motion.div variants={itemVariants}>
    <Globe className="h-8 w-8 text-primary" /> {/* Changed from Brain to Globe for gaming website */}
  </motion.div>
  <motion.span
    variants={itemVariants}
    className="text-xl font-bold text-primary"
    style={{ fontFamily: "'Press Start 2P', cursive" }} // Pixelated font
  >
    Wavedash
  </motion.span>
</motion.div>

            <motion.div
              variants={navVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center space-x-8"
            >
              <motion.a
                variants={itemVariants}
                href="#solutions"
                className="text-muted-foreground hover:text-primary transition-colors relative group"
              >
                Solutions
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 transition-all group-hover:w-full group-hover:bg-primary"></span>
              </motion.a>
              <motion.a
                variants={itemVariants}
                href="#about"
                className="text-muted-foreground hover:text-primary transition-colors relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 transition-all group-hover:w-full group-hover:bg-primary"></span>
              </motion.a>
              <motion.a
                variants={itemVariants}
                href="#contact"
                className="text-muted-foreground hover:text-primary transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 transition-all group-hover:w-full group-hover:bg-primary"></span>
              </motion.a>
              <motion.div variants={itemVariants}>
                <ThemeToggle />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  className="relative overflow-hidden group"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                      duration: 0.3,
                    })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { boxShadow: "none", duration: 0.3 })
                  }}
                >
                  Get Started
                  <span className="absolute inset-0 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Button>
              </motion.div>
            </motion.div>

            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed top-16 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-md border border-primary/20 rounded-2xl shadow-lg p-6 z-40 max-w-md w-full"
        >
          <div className="flex flex-col space-y-4">
            <a
              href="#solutions"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Solutions
            </a>
            <a
              href="#about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
            <Button
              className="relative overflow-hidden group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                  duration: 0.3,
                })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { boxShadow: "none", duration: 0.3 })
              }}
            >
              Get Started
              <span className="absolute inset-0 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Button>
          </div>
        </motion.div>
      )}
    </>
  )
}