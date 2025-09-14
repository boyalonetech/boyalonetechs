"use client";
import { useState } from "react";

export default function MyJourneyBlog() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="bg-gradient-to-br from-blue-500/10 to-blue-500/10 backdrop-blur-lg rounded-md mx-1 lg:rounded-3xl shadow-xl max-w-5xl lg:mx-auto p-6 lg:p-12 my-16 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-blue-400/30 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-blue-400/30 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />

      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8 relative z-10">
        🚀 My Journey in Tech
      </h2>

      {/* Blog Content */}
      <div className="relative z-10 space-y-6 jn dark:text-gray-300 leading-relaxed">
        <p>
          When I wrote my very first &quot;Hello World&quot;, I didn&apos;t realize how
          much it would change the direction of my life. What began as curiosity
          soon turned into long nights of problem-solving, hours spent debugging
          stubborn code, and the thrill of seeing something I built come alive
          on the web. That excitement has carried me from small static projects
          to full-stack applications serving real users.
        </p>

        <p>
          Over time, I realized that technology is more than syntax and tools.
          It&apos;s a way of thinking—a way of approaching problems with
          creativity, logic, and persistence. Every bug I fixed was a reminder
          that failure is just another step toward mastery. Every new framework
          I learned opened doors to opportunities I couldn&apos;t have imagined
          before.
        </p>

        {/* Expanded content */}
        {showMore && (
          <div className="space-y-6">
            {/* Early Days */}
            <h3 className="text-xl font-bold text-blue-600">🌱 Early Days</h3>
            <p>
              I started by experimenting with HTML and CSS, fascinated by how a
              few lines of code could shape an entire page. I would spend hours
              tinkering with layouts, adjusting colors, and learning how design
              decisions affect usability. What started as curiosity became a
              passion for creating digital experiences that are not only
              functional but also beautiful.
            </p>

            <p>
              My first projects were far from perfect—broken layouts, clunky
              buttons, and messy code. But those projects were stepping stones.
              Each one taught me something new, and with time, I grew more
              confident. I transitioned from static pages to interactive
              websites powered by JavaScript, then discovered React, and later
              Next.js. That journey from beginner to professional wasn&apos;t a
              straight line—it was full of challenges, but each challenge made
              me stronger.
            </p>

            {/* Education */}
            <h3 className="text-xl font-bold text-blue-600">🎓 Education</h3>
            <p>
              My formal education in Frontend Engineering at Innovation Growth
              Hub gave me the theoretical foundation I needed. I graduated with
              First-Class Honors, focusing on Software Engineering and Web
              Technologies. But what truly shaped me wasn&apos;t only the
              classroom learning—it was the projects, hackathons, and real-world
              problems we solved as students.
            </p>
            <p>
              My final-year project explored AI-powered recommendation systems,
              blending data, algorithms, and human behavior. It pushed me to
              think beyond just “writing code” and focus on “creating
              solutions.” That mindset still drives everything I do today.
            </p>

            {/* Work Experience */}
            <h3 className="text-xl font-bold text-blue-600">
              💼 Work Experience
            </h3>
            <p>
              My career path has been a blend of internships, freelance work,
              and full-time development roles. At <b>IGHUB</b>, I worked as a
              Frontend Developer, where I built and optimized React/Next.js
              applications. I focused on creating scalable solutions, improving
              SEO rankings, and collaborating with designers to deliver
              user-centered products. It was here that I realized the power of
              teamwork—how developers, designers, and clients come together to
              create impactful products.
            </p>
            <p>
              At <b>ABC Solutions</b>, I joined as a Fullstack Intern. I
              contributed to backend APIs with Node.js and MongoDB, built
              dashboards with real-time analytics, and helped migrate legacy
              systems to modern architectures. That role gave me exposure to the
              full stack of development, from server to client, teaching me the
              importance of clean architecture and scalability.
            </p>

            {/* Tech Trailblazer Award */}
            <h3 className="text-xl font-bold text-blue-600">
              🏆 The Tech Trailblazer Award
            </h3>
            <p>
              In 2025, I received one of the proudest honors of my career—the{" "}
              <b>Tech Trailblazer Award</b>. This recognition wasn&apos;t just
              about writing great code; it was about persistence, innovation,
              and the ability to create solutions that make a difference. The
              award reminded me of how far I&apos;ve come—from late nights
              fixing bugs to leading projects that solve real-world challenges.
              It validated not only my skills but also my vision for what
              technology can do.
            </p>

            {/* Community */}
            <h3 className="text-xl font-bold text-blue-600">
              🌍 Community & Mentorship
            </h3>
            <p>
              Beyond coding, I&apos;ve always believed in giving back. I&apos;ve
              mentored junior developers, guided peers during hackathons, and
              contributed to open-source projects. I&apos;ve also spoken at tech
              events on topics like Frontend Development and SEO Optimization,
              sharing lessons I&apos;ve learned through experience. Building
              communities around tech excites me because it proves that
              knowledge grows best when it&apos;s shared.
            </p>

            {/* Looking Ahead */}
            <h3 className="text-xl font-bold text-blue-600">
              ✨ Looking Ahead
            </h3>
            <p>
              My journey is still unfolding. Technology continues to evolve,
              with AI, serverless computing, and Web3 opening new possibilities.
              My goal is to stay at the forefront of these innovations—not just
              learning them, but applying them to create solutions that matter.
            </p>
            <p>
              More than anything, I want my journey to inspire others. If my
              first “Hello World” could lead me here, then anyone&apos;s spark
              of curiosity can become the foundation for something remarkable.
            </p>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="inline-block px-8 py-3 w-full text-center lg:w-max justify-center bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          {showMore ? "Show Less" : "Read More"}
        </button>
      </div>
    </section>
  );
}
