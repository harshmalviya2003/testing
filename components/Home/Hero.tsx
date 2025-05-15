"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import * as THREE from "three"

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bookCanvasRef = useRef<HTMLCanvasElement>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !canvasRef.current || !bookCanvasRef.current) {
      console.error("Hero: Missing refs")
      setHasError(true)
      return
    }

    // Particle Canvas Setup
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      console.error("Hero: Failed to get 2D context")
      setHasError(true)
      return
    }

    const resizeCanvas = () => {
      if (!canvas || !sectionRef.current) return
      canvas.width = sectionRef.current.offsetWidth
      canvas.height = sectionRef.current.offsetHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle System
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 2,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
      })
    }

    let time = 0
    const animateParticles = () => {
      if (!ctx || !canvas) return
      time += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Retro Grid Background
      ctx.strokeStyle = "rgba(59, 130, 246, 0.2)"
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + Math.sin(time) * 20, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y + Math.cos(time) * 20)
        ctx.stroke()
      }

      // Particle Animation
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.5})`
        ctx.fill()
      })
    }

    gsap.ticker.add(animateParticles)

    // Three.js Setup for 3D Book
    const bookCanvas = bookCanvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: bookCanvas, alpha: true })

    // Responsive Book Canvas Size
    const updateBookCanvasSize = () => {
      if (!sectionRef.current) return
      const size = Math.min(
        sectionRef.current.offsetWidth * 0.8,
        sectionRef.current.offsetHeight * 0.8,
        400 // Max size cap
      )
      renderer.setSize(size, size)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }
    updateBookCanvasSize()
    window.addEventListener("resize", updateBookCanvasSize)

    camera.position.z = 5

    // Book Geometry
    const bookGeometry = new THREE.BoxGeometry(4, 5, 0.9)
    const bookMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.7,
      metalness: 0.2,
    })
    const book = new THREE.Mesh(bookGeometry, bookMaterial)
    scene.add(book)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Book Animation
    const animateBook = () => {
      book.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    gsap.ticker.add(animateBook)

    // Hover Effects
    bookCanvas.addEventListener("mouseenter", () => {
      gsap.to(book.rotation, { x: 0.2, duration: 0.3 })
      gsap.to(bookMaterial, {
        emissive: new THREE.Color("#FFD700"),
        emissiveIntensity: 0.2,
        duration: 0.3,
      })
    })
    bookCanvas.addEventListener("mouseleave", () => {
      gsap.to(book.rotation, { x: 0, duration: 0.3 })
      gsap.to(bookMaterial, {
        emissive: new THREE.Color("#000000"),
        emissiveIntensity: 0,
        duration: 0.3,
      })
    })

    // Parallax Effect
    const handleScroll = () => {
      const scrollY = window.scrollY
      gsap.to(bookCanvas, {
        y: scrollY * 0.2 - 20,
        duration: 0.5,
      })
    }
    window.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => {
      gsap.ticker.remove(animateParticles)
      gsap.ticker.remove(animateBook)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("resize", updateBookCanvasSize)
      window.removeEventListener("scroll", handleScroll)
      bookCanvas.removeEventListener("mouseenter", () => {})
      bookCanvas.removeEventListener("mouseleave", () => {})
      renderer.dispose()
    }
  }, [])

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  if (hasError) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-primary/10 to-primary/20">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-left max-w-2xl" // Changed from max-w-lg to max-w-2xl
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Automate Your Game Development Pipeline with{" "}
                <span className="text-primary">Wavedash</span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-muted-foreground text-lg sm:text-xl mb-8"
              >
                1-click build, deploy, testing, and feedback—saving game devs 10+
                hours per week. Streamline your workflow and focus on creating
                amazing games.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-start"
              >
                <Button
                  size="lg"
                  className="group bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Try Wavedash For Free
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative max-w-md w-full"
            >
              <div className="aspect-square rounded-full bg-gradient-to-r from-primary/20 to-primary/40 absolute inset-0 blur-3xl z-0" />
              <div className="relative z-10 flex items-center justify-center h-full text-muted-foreground">
                <p>Unable to load animation. Check console for errors.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative pt-20  min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-primary/10 to-primary/20"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left max-w-2xl" // Changed from max-w-lg to max-w-2xl
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Automate Your Game Development Pipeline with{" "}
              <span className="text-primary">Wavedash</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg sm:text-xl mb-8"
            >
              1-click build, deploy, testing, and feedback—saving game devs 10+
              hours per week. Streamline your workflow and focus on creating
              amazing games.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Try Wavedash For Free
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-md w-full flex items-center justify-end"
          >
            <div className="aspect-square rounded-full bg-gradient-to-r from-primary/20 to-primary/40 absolute inset-0 blur-3xl z-0" />
            <div className="relative z-10 w-full max-w-[400px]">
              <canvas
                ref={bookCanvasRef}
                className="w-full h-auto max-w-full"
                style={{ aspectRatio: "1/1" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}