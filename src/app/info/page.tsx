// app/learn-more/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import clsx from "clsx";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Section = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section className="relative py-20 sm:py-28">
    <div className="pointer-events-none absolute inset-0">
      {/* Animated blue glow */}
      <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl animate-pulse-slow" />
    </div>

    <div className="relative mx-auto max-w-6xl px-4">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-3 max-w-3xl text-base sm:text-lg text-gray-600 dark:text-gray-300"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

export default function LearnMorePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* HERO */}
      <section className="relative">
        {/* Animated background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-120px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl animate-pulse-slow" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs sm:text-sm text-blue-500 backdrop-blur"
          >
            <Sparkles className="h-4 w-4" />
            Boyalone Techs
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight"
          >
            Tech so fine, it’s by design —{" "}
            <span className="text-blue-500">where code and art perfectly rhyme.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 max-w-2xl text-gray-600 dark:text-gray-300 text-base sm:text-lg"
          >
            We blend creativity with logic’s core,  
            building tools that clients adore.  
            From web to app, we make it shine,  
            with Boyalone’s magic in every line.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/#work"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 text-white px-5 py-3 text-sm sm:text-base font-medium hover:bg-blue-600"
            >
              See Our Work <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 px-5 py-3 text-sm sm:text-base text-blue-500 dark:text-blue-400 backdrop-blur hover:bg-blue-500/20"
            >
              Start a Project
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <Section
        title="What We Bring"
        subtitle="Our skills are sharp, our process clean — the best tech team you’ve ever seen."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["Custom Websites", "Designs that speak and features that click, fast and smooth without a trick."],
            ["Mobile Apps", "From idea to store in record time, every screen feels like a rhyme."],
            ["Brand Identity", "Logos, colors, styles that last — your brand’s story, unsurpassed."],
            ["UX & Strategy", "User journeys mapped with care, turning visits into clients there."],
            ["Performance Boost", "Speed, SEO, and flawless flow — we make sure your numbers grow."],
            ["Ongoing Support", "Even after launch we stay, keeping bugs and lags at bay."],
          ].map(([title, desc]) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 backdrop-blur hover:bg-blue-500/10 transition"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section
        title="Let’s Make Tech Rhyme"
        subtitle="Boyalone Techs — where innovation meets imagination."
      >
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 sm:p-8 backdrop-blur">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-medium">Your vision, our mission</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                One call away from turning ideas into reality.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 text-white px-5 py-3 text-sm font-medium hover:bg-blue-600"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}


