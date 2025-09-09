"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section
      className="relative font-sans p-2 lg:p-5 rounded-2xl overflow-hidden w-full"
      id="about"
    >
      <h1 className="text-5xl  text-left font-extrabold bg-gradient-to-r from-blue-600 to-purple-600  to blue-500 bg-clip-text text-transparent">
        About
      </h1>
      {/* Animated Background Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Hero Section */}
      <div className="max-w-6xl mt-20 mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Floating Image */}
        <div className="relative group perspective">
          <div className="relative w-full h-64 mb-12 flex justify-center scale-120 mt-5 lg:scale-165 z-10">
            {/* First Image */}
            <div className="absolute left-1/2 -translate-x-[60%] w-48 h-48 transform rotate-[-5deg] hover:rotate-0 transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg z-20">
              <Image
                src="/2025081414340313.jpg"
                alt="Journey Photo 1"
                width={600}
                height={600}
                className="w-full h-full object-cover rounded-xl border-4 border-white"
              />
              <span className="absolute bottom-2 left-2 bg-black/50 px-3 py-1 text-xs  font-semibold rounded text-white shadow">
                🏅 Award
              </span>
            </div>

            {/* Second Image */}
            <div className="absolute left-1/2 -translate-x-[40%] w-48 h-48 transform rotate-[8deg] hover:rotate-0 transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg z-10">
              <Image
                src="/divine-blue.jpg"
                alt="Journey Photo 2"
                width={600}
                height={600}
                className="w-full h-full object-cover rounded-xl border-4 border-white"
              />
              <span className="absolute bottom-2 left-2 bg-white px-3 py-1 text-xs font-semibold rounded shadow">
                Creative Leap
              </span>
            </div>
          </div>
        </div>

        {/* Intro Text */}
        {/* Intro Text */}
        <div className="space-y-6 -mt-14 lg:-mt-0 w-full">
          <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hey, I&apos;m Divine Timothy
          </h1>
          <p className="text-md lg:text-lg text-gray-600 leading-relaxed text-justify hyphens-1">
            I&apos;m a passionate <strong>Web Developer</strong> crafting clean,
            dynamic, and user-focused experiences. I blend design thinking with
            modern tech to turn concepts into visually stunning,
            high-performance digital products.
          </p>
          <p className="text-gray-600 text-md lg:text-lg leading-relaxed text-justify">
            When I&apos;m not coding, I create tech content, collaborate with
            startups, and explore ways to push creative boundaries in the
            digital space.
          </p>

          {/* Button with overlapping icons */}
          <div className="flex justify-between items-center gap-3">
            {/* Overlapping icons */}

            {/* Connect button */}
            <Link href="/connect">
              <button className="inline-block px-8 w-max py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                Let&apos;s Connect
              </button>
            </Link>

            <div className="flex items-center -space-x-3">
              {/* Plus sign */}
              <div className="lg:flex items-center hidden justify-center w-8 h-8 pb-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold border-2 border-white text-xl">
                +
              </div>

              {/* Images */}
              <Image
                src="/boyaloneamime.png"
                width={100}
                height={100}
                alt="HTML"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <Image
                src="/robinson.jpg"
                width={100}
                height={100}
                alt="CSS"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <Image
                src="/akorede.jpg"
                alt="JavaScript"
                width={100}
                height={100}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <Image
                src="/chrisban.jpg"
                alt="JavaScript"
                width={100}
                height={100}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* My Journey */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-3xl shadow-xl max-w-5xl mx-auto p-5 lg:p-10 my-16 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 -right-20 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8 relative z-10">
          My Journey
        </h2>

        {/* Creative Overlapping Images */}
        <div className="space-y-6 relative z-10">
          <p>
            From building my first static website to deploying full-stack
            applications with Next.js, I&apos;ve embraced continuous learning
            and adaptation in the fast-paced tech world.
          </p>
          <p>
            Over the years, I&apos;ve collaborated with teams, improved website
            SEO for businesses, and worked on performance-focused applications
            that drive real-world impact.
          </p>

          <Link
            href="https://web.facebook.com/boya1one/posts/pfbid038N5U9xavjc6MMdi1iQnKSJV5BYd3CYqhif4PWWRvsJwKaAqkhiN6ejrM1agDTuzbl"
            className="inline-block px-8 py-3 w-full text-center lg:w-max justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            <span>Learn More</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </section>
  );
};

export default About;
