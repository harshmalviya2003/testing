"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WavedashFeatures: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Force scroll to top
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    gsap.registerPlugin(ScrollTrigger);

    const panels = gsap.utils.toArray<HTMLElement>(".panel");
    const tops = panels.map((panel) =>
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
      })
    );

    panels.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: panel,
        start: () =>
          panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        pin: true,
        pinSpacing: index === panels.length - 1 ? true : false,
      });
    });

    let isInitialLoad = true;

//     ScrollTrigger.create({
//   snap: {
//     snapTo: (progress: number, self: ScrollTrigger) => {
//       if (!self) return progress; // Guard against undefined self
//       if (isInitialLoad) {
//         isInitialLoad = false;
//         return progress;
//       }
//       const panelStarts = tops.map((st) => st.start);
//       const totalHeight = self.end - self.start;
//       const snapScroll = gsap.utils.snap(panelStarts, self.scroll());
//       return (snapScroll - self.start) / totalHeight; // Normalize to [0, 1]
//     },
//     duration: 0.5,
//     delay: 0.1,
//   },
// });

    // Refresh ScrollTrigger on resize to handle dynamic viewport changes
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section className="panel min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 bg-muted text-foreground">
        <div className="content-box bg-card/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-10 max-w-4xl w-full text-center shadow-xl border border-primary/10 hover:-translate-y-1 transition-transform">
          <span className="badge inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-5">
            NEW RELEASE
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-5">
            The Ultimate Game Dev Command Center
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            Revolutionize your game development with AI-powered tools and seamless automation that
            works while you sleep.
          </p>
          {/* <div className="features-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            <div className="feature-item bg-muted/50 p-4 sm:p-5 rounded-lg border border-primary/10">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Auto Testing</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">AI agents test your game 24/7</p>
            </div>
            <div className="feature-item bg-muted/50 p-4 sm:p-5 rounded-lg border border-primary/10">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Smart CI/CD</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Zero-config deployment</p>
            </div>
            <div className="feature-item bg-muted/50 p-4 sm:p-5 rounded-lg border border-primary/10">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Instant Feedback</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Real-time player analytics</p>
            </div>
          </div> */}
        </div>
        <div className="scroll-down absolute bottom-6 sm:bottom-10 flex items-center justify-center w-full text-foreground gap-2 animate-bounce text-sm sm:text-base">
          Scroll down
          <div className="arrow w-0 h-0 border-l-6 border-r-6 border-t-6 sm:border-l-8 sm:border-r-8 sm:border-t-8 border-l-transparent border-r-transparent border-t-foreground" />
        </div>
      </section>

      <section className="panel min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 bg-muted text-foreground">
        <div className="content-box bg-card/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-10 max-w-4xl w-full text-center shadow-xl border border-primary/10 hover:-translate-y-1 transition-transform">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-5">Zero-Config CI/CD</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            Instant, fully automated build & deployment pipelines the moment you connect your repo. One
            click is all it takes. No setup, no scripts, no hassle.
          </p>
          <div className="features-grid grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="feature-item bg-muted/50 p-4 sm:p-5 rounded-lg border border-primary/10">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Auto Detection</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Detects your engine and configures automatically</p>
            </div>
            <div className="feature-item bg-muted/50 p-4 sm:p-5 rounded-lg border border-primary/10">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Multi-Platform</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Build for Windows, Mac, Linux simultaneously</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 bg-muted text-foreground">
        <div className="content-box bg-card/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-10 max-w-4xl w-full text-center shadow-xl border border-primary/10 hover:-translate-y-1 transition-transform">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-5">Breakthrough Agentic Playtesting</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            Unleash AI agents that perform thousands of hours of gameplay testing in seconds,
            identifying bugs and balance issues with superhuman precision.
          </p>
          <div className="features-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            <div className="feature-item bg-muted/50 p-4 sm:p-5 rounded-lg border border-primary/10">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">24/7 Testing</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Never stop improving your game</p>
            </div>
            <div className="feature-item bg-muted/50 p-4 sm:p-5 rounded-lg border border-primary/10">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Smart Agents</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Adaptive testing strategies</p>
            </div>
            <div className="feature-item bg-muted/50 p-4 sm:p-5 rounded-lg border border-primary/10">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Detailed Reports</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Actionable insights delivered daily</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 bg-muted text-foreground">
        <div className="content-box bg-card/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-10 max-w-4xl w-full text-center shadow-xl border border-primary/10 hover:-translate-y-1 transition-transform">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-5">Autonomous AI Code Improvement</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            AI playtesters report to coding agents that automatically generate pull requests to fix
            bugs and enhance your game, 24/7.
          </p>
          <div className="features-grid grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="feature-item bg-muted/50 p-4 sm:p-5 rounded-lg border border-primary/10">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Auto-Fix</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Common bugs fixed automatically</p>
            </div>
            <div className="feature-item bg-muted/50 p-4 sm:p-5 rounded-lg border border-primary/10">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Code Review</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">AI suggests optimizations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WavedashFeatures;