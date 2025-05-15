
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Mike Ambinder",
      role: "Former Psychologist & Game Designer, Valve",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "Everything we do during the week is focused on that Friday playtest. We learn everything from playtests.",
      rating: 4,
    },
    {
      name: "Peter Molyneux",
      role: "Creator of Populous, Fable",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "The secret of great games is playtesting.",
      rating: 4,
    },
    {
      name: "Shigeru Miyamoto",
      role: "Creator of Mario, Zelda",
      image: "https://images.unsplash.com/photo-1506794778202-6d6d5c63c87e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "A good idea is something that does not solve just one single problem, but rather can solve multiple problems at once. You only find this through iteration and testing.",
      rating: 5,
    },
    {
      name: "Markus Persson (Notch)",
      role: "Creator of Minecraft",
      image: "https://images.unsplash.com/photo-1522529599102-1b3a3673b7f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "The public alpha of Minecraft was essentially a giant playtest. And early players got to see the game improving every week.",
      rating: 5,
    },
    {
      name: "Todd Howard",
      role: "Director, Bethesda Game Studios",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote: "Great games are played and not made. We play the game a lot.",
      rating: 4,
    },
  ];

  // Responsive items per view
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (testimonials.length - itemsPerView + 1));
    }, 7000); // Increased from 5000ms to 7000ms for slower auto-move
    return () => clearInterval(timer);
  }, [testimonials.length, itemsPerView]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - itemsPerView : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= testimonials.length - itemsPerView ? 0 : prev + 1
    );
  };

  return (
    <section className="py-16 px-4 bg-muted/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Why <span className="text-primary">Playtesting</span> Matters
          </h2>
          <p className="text-muted-foreground text-base max-w-3xl mx-auto">
            Industry legends highlight the power of playtesting in crafting exceptional games.
            Wavedash supercharges this process with AI-driven insights.
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: `-${currentIndex * (100 / itemsPerView)}%`,
              transition: { type: "spring", stiffness: 200, damping: 40 }, // Slower, smoother transition
            }}
            className="flex"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 px-3 ${
                  itemsPerView === 1 ? "w-full" :
                  itemsPerView === 2 ? "w-1/2" : "w-1/3"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-card p-6 rounded-lg border border-primary/10  backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 hover:border-primary/20 transition-all h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-3 border border-primary/10"
                    />
                    <div>
                      <h4 className="font-semibold text-lg text-foreground">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "text-primary fill-primary" : "text-muted-foreground/50"
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground text-sm leading-snug mb-4 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-primary/10 pt-3">
                    <div className="text-primary text-sm font-medium">Game Industry Expert</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-8 space-x-3">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-muted-foreground/50 hover:bg-primary transition-all group"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5 text-foreground group-hover:text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center space-x-1.5">
              {Array.from({ length: testimonials.length - itemsPerView + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === idx ? "bg-primary w-4" : "bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-muted-foreground/50 hover:bg-primary transition-all group"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5 text-foreground group-hover:text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l-7 7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
