"use client"

import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle, ChevronDown } from "lucide-react"
import { useState } from "react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Wavedash?",
      answer: "Wavedash is an all-in-one platform to automate your game development pipeline, from builds and testing to deployment and feedback.",
    },
    {
      question: "How does Wavedash save me time and money?",
      answer: "By automating repetitive tasks like builds, CI/CD, and playtesting, Wavedash frees up your developers to focus on creating game content, significantly reducing overhead and accelerating your development cycle.",
    },
    {
      question: "Is Wavedash only for Unity?",
      answer: "Currently, we offer deep integration and unlimited cloud builds for Unity. Support for other engines like Unreal and Godot is on our grand roadmap!",
    },
    {
      question: "What if I have more questions?",
      answer: (
        <>
          We'd love to hear from you! Reach out to us at{" "}
          <a href="mailto:contact@wavedash.gg" className="text-primary hover:underline">
            contact@wavedash.gg
          </a>{" "}
          or join our{" "}
          <a href="https://discord.com/invite/wavedash" className="text-primary hover:underline">
            Discord community
          </a>.
        </>
      ),
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const answerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <section className="py-16 px-4 bg-muted/10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got questions about Wavedash? We’ve got answers to help you get started.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-xl border border-primary/10 shadow-lg hover:shadow-xl transition-shadow"
            >
              <button
                className="w-full p-6 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center">
                  <HelpCircle className="h-6 w-6 text-primary mr-4" />
                  <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-primary transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="px-6 pb-6 text-muted-foreground text-base leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}