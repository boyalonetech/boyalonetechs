"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaReact,
  FaCss3Alt,
  FaUsers,
  FaRocket,
  FaCode,
  FaSearch,
} from "react-icons/fa";

const About = () => {
  return (
    <section
      className="relative  text-gray-800 font-sans p-5 rounded-2xl overflow-hidden w-full"
      id="about"
    >
      <h1 className="text-5xl  text-center font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        About
      </h1>
      {/* Animated Background Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Floating Image */}
        <div className="relative group perspective">
          <div className="relative w-full h-64 mb-12 flex justify-center scale-140 mt-5 lg:scale-165 z-10">
            {/* First Image */}
            <div className="absolute left-1/2 -translate-x-[60%] w-48 h-48 transform rotate-[-5deg] hover:rotate-0 transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg z-20">
              <Image
                src="/about.jpg"
                alt="Journey Photo 1"
                width={600}
                height={600}
                className="w-full h-full object-cover rounded-xl border-4 border-white"
              />
              <span className="absolute bottom-2 left-2 bg-white/70 px-3 py-1 text-xs  font-semibold rounded shadow">
                🏅 First Project
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
        <div className="space-y-6 -mt-10 lg:-mt-0 w-full">
          <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hey, I'm Divine Timothy
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed text-justify">
            I'm a passionate <strong>Web Developer</strong> crafting clean,
            dynamic, and user-focused experiences. I blend design thinking with
            modern tech to turn concepts into visually stunning,
            high-performance digital products.
          </p>
          <p className="text-gray-600 leading-relaxed text-justify">
            When I'm not coding, I create tech content, collaborate with
            startups, and explore ways to push creative boundaries in the
            digital space.
          </p>

          {/* Button with overlapping icons */}
          <div className="flex justify-between items-center gap-3">
            {/* Overlapping icons */}

            {/* Connect button */}
            <Link
              href="/connect"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Let's Connect
            </Link>

            <div className="flex items-center -space-x-3">
              {/* Plus sign */}
              <div className="flex items-center justify-center w-8 h-8 pb-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold border-2 border-white text-xl">
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
      <div className="bg-gray-300/50 backdrop-blur-lg rounded-3xl shadow-xl max-w-5xl mx-auto p-10 my-16 relative overflow-hidden">
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
            applications with Next.js, I've embraced continuous learning and
            adaptation in the fast-paced tech world.
          </p>
          <p>
            Over the years, I've collaborated with teams, improved website SEO
            for businesses, and worked on performance-focused applications that
            drive real-world impact.
          </p>

          <Link
            href="https://wa.me/2348161514098"
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

      {/* Skills Section */}
      <div className="mt-20 max-w-6xl mx-auto px-6">
        <h3 className="text-2xl font-bold mb-10 text-center text-gray-800">
          My Skillset
        </h3>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              icon: <FaReact size={28} />,
              title: "React / Next.js",
              desc: "Dynamic, scalable apps",
            },
            {
              icon: <FaCss3Alt size={28} />,
              title: "Tailwind CSS",
              desc: "Fast, clean UI design",
            },
            {
              icon: <FaCode size={28} />,
              title: "UI/UX Design",
              desc: "User-focused experiences",
            },
            {
              icon: <FaSearch size={28} />,
              title: "SEO Optimization",
              desc: "Rank & perform better",
            },
            {
              icon: <FaRocket size={28} />,
              title: "Performance",
              desc: "Lightning-fast delivery",
            },
            {
              icon: <FaUsers size={28} />,
              title: "Collaboration",
              desc: "Agile teamwork",
            },
          ].map((skill, i) => (
            <div
              key={i}
              className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 transform transition duration-500 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl hover:bg-white/80 text-center"
            >
              <div className="text-blue-600 mb-3">{skill.icon}</div>
              <h4 className="text-lg font-semibold mb-1 text-blue-600">
                {skill.title}
              </h4>
              <p className="text-sm">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 mt-20 px-6">
        {[
          { number: "50+", label: "Projects Completed" },
          { number: "5+", label: "Years of Experience" },
          { number: "100%", label: "Client Satisfaction" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-2xl shadow-lg text-center"
          >
            <h4 className="text-3xl font-bold text-blue-600">{stat.number}</h4>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
