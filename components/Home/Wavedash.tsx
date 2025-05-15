"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function Wavedash() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              Why We're Building <span className="text-primary">Wavedash</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-4">
              Game development is incredibly rewarding, but let's be honest... parts of it are a slog. Compiling for different platforms, uploading builds, managing versions, emailing links, and chasing down playtesters drains valuable time and energy.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              We've felt this pain. That's why we're building Wavedash — an end-to-end solution designed to automate the most annoying and time-consuming parts of game development. We get your devs back to making games, not wrestling with devops.
            </p>
            <Button size="lg">
              Learn More
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square rounded-full bg-gradient-to-r from-primary/20 to-primary/40 absolute inset-0 blur-3xl" />
            <img
              src="/minecraft-team-min.png"
              alt="Game Development"
              className="relative rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}