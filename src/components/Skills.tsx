"use client";
import TestimonialCard from "@/components/Testimonial";
import React, { useEffect, useState } from "react";
import {
  FaReact,
  FaCss3Alt,
  FaUsers,
  FaRocket,
  FaCode,
  FaSearch,
  FaMobileAlt,
  FaFilm,
  FaLaptop,
  FaFigma,
  FaGitAlt,
  FaPalette,
  FaLayerGroup,
  FaMagic,
  FaStar,
  FaBolt,
  FaEye,
} from "react-icons/fa";
import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobeaftereffects,
  SiAdobepremierepro,
} from "react-icons/si";
import { IoIosColorPalette } from "react-icons/io";
import { FaSprayCanSparkles } from "react-icons/fa6";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Define blue color variations
  const blueShades = {
    light: "from-blue-400 to-blue-500",
    medium: "from-blue-500 to-blue-400",
    dark: "from-blue-600 to-blue-700",
    deep: "from-blue-700 to-blue-800",
    accent: "from-blue-400 to-cyan-500",
    premium: "from-blue-500 to-indigo-600",
  };

  const skills = [
    {
      icon: <FaReact className="animate-spin-slow" />,
      title: "React / Next.js",
      desc: "Dynamic, scalable web applications",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-500",
      delay: 0,
    },
    {
      icon: <FaCss3Alt className="animate-pulse" />,
      title: "Tailwind CSS",
      desc: "Fast, clean responsive UI design",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-500",
      delay: 100,
    },
    {
      icon: <FaMobileAlt className="animate-bounce" />,
      title: "Mobile App Development",
      desc: "React Native & cross-platform apps",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-600",
      delay: 200,
    },
    {
      icon: <FaLaptop className="animate-pulse" />,
      title: "Progressive Web Apps",
      desc: "Native-like web experiences",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-600",
      delay: 300,
    },
    {
      icon: <SiAdobeillustrator className="animate-bounce" />,
      title: "AI chatbot Integration",
      desc: "Seamless integration of intelligent chatbots to automate support, boost engagement, and enhance user experience.",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-600",
      delay: 800,
    },
    {
      icon: <FaCode className="animate-pulse" />,
      title: "Responsive Design",
      desc: "Mobile-first, cross-device optimization",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-600",
      delay: 400,
    },
    {
      icon: <FaFigma className="animate-spin-slow" />,
      title: "UI/UX Design",
      desc: "User-focused & accessible experiences",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-600",
      delay: 500,
    },
    {
      icon: <FaFilm className="animate-pulse" />,
      title: "Video Editing",
      desc: "Adobe Premiere, After Effects",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-600",
      delay: 600,
    },
    {
      icon: <SiAdobephotoshop className="animate-spin-slow" />,
      title: "Photo Editing",
      desc: "Adobe Photoshop & Lightroom",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-700",
      delay: 700,
    },

    {
      icon: <SiAdobeaftereffects className="animate-pulse" />,
      title: "Motion Graphics",
      desc: "Animations & visual effects",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-700",
      delay: 900,
    },
    {
      icon: <FaSearch className="animate-pulse" />,
      title: "SEO Optimization",
      desc: "Rank & perform better in search",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-500",
      delay: 1000,
    },
    {
      icon: <FaRocket className="animate-bounce" />,
      title: "Performance Optimization",
      desc: "Lightning-fast load times",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-600",
      delay: 1100,
    },
    {
      icon: <FaUsers className="animate-pulse" />,
      title: "Collaboration",
      desc: "Agile teamwork & Git workflows",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-600",
      delay: 1200,
    },
    {
      icon: <FaGitAlt className="animate-spin-slow" />,
      title: "Version Control",
      desc: "Git, GitHub, & collaboration tools",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-700",
      delay: 1300,
    },
    {
      icon: <FaPalette className="animate-pulse" />,
      title: "Creative Design",
      desc: "Visual storytelling & aesthetics",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-600",
      delay: 1400,
    },
    {
      icon: <SiAdobepremierepro className="animate-spin-slow" />,
      title: "Video Production",
      desc: "Full video production pipeline",
      color: "from-blue-400/20 to-blue-500/20",
      hoverColor: "from-blue-300/40 to-blue-400/40",
      iconColor: "text-blue-700",
      delay: 1500,
    },
  ];

  const responsivePrinciples = [
    {
      icon: <FaMobileAlt className="animate-bounce" />,
      title: "Mobile-First Design",
      description:
        "Design and develop starting from mobile devices, ensuring optimal experience on smaller screens first.",
      color: blueShades.medium,
    },
    {
      icon: <FaLayerGroup className="animate-pulse" />,
      title: "Cross-Device Testing",
      description:
        "Test across multiple devices and browsers to ensure consistent user experience everywhere.",
      color: blueShades.dark,
    },
    {
      icon: <FaRocket className="animate-bounce" />,
      title: "Performance Optimized",
      description:
        "Optimize images, code splitting, and lazy loading for fast loading on any connection.",
      color: blueShades.accent,
    },
  ];

  const proficiencyLevels = [
    {
      category: "Web Development",
      level: 95,
      color: blueShades.medium,
      icon: <FaCode className="text-lg" />,
    },
    {
      category: "Mobile Development",
      level: 85,
      color: blueShades.dark,
      icon: <FaMobileAlt className="text-lg" />,
    },
    {
      category: "UI/UX Design",
      level: 90,
      color: blueShades.accent,
      icon: <FaFigma className="text-lg" />,
    },
    {
      category: "Media Production",
      level: 88,
      color: blueShades.premium,
      icon: <FaFilm className="text-lg" />,
    },
  ];

  return (
    <section className="lg:ml-[290px] xl:ml-[360px] mt-25 lg:mt-0 lg:px-0 relative overflow-hidden">
      {/* Animated Background Elements - All Blue */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-20 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Skills Section Header - Blue Gradient */}
      <div className="text-4xl md:text-4xl flex flex-col gap-2 relative z-10 mt-10 lg:mt-0 lg:text-left font-bold text-center p-[15px] px-6 mb-12 w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
        <h1 className="animate-fade-in">My Skills</h1>
        <div className="flex items-center justify-center lg:justify-start gap-4">
          <span className="h-[6px] rounded-2xl w-32 bg-gradient-to-r from-blue-500 to-blue-700 animate-glow"></span>
          {/* <FaSprayCanSparkles className="text-blue-400 animate-spin-slow" /> */}
        </div>
      </div>

      {/* Animated Introduction - Blue Theme */}
      <div className="px-4 mb-12 text-center">
        <p className="text-lg md:text-xl  max-w-3xl mx-auto animate-slide-up delay-300">
          Bringing together{" "}
          <span className="font-semibold text-blue-600">
            technical expertise
          </span>
          , <span className="font-semibold text-blue-600">creative design</span>
          , and{" "}
          <span className="font-semibold text-blue-600">
            responsive solutions
          </span>{" "}
          to build exceptional digital experiences
        </p>
      </div>

      {/* Skills Grid - All Blue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 px-4 relative z-10">
        {skills.map((skill, i) => (
          <div
            key={i}
            className={`
              relative overflow-hidden group
              bg-gradient-to-br ${skill.color} backdrop-blur-lg
              p-6 rounded-2xl shadow-xl
              transform transition-all duration-500
              hover:-translate-y-2 hover:scale-[1.02]
              hover:shadow-2xl hover:bg-gradient-to-bl ${skill.hoverColor}
              border border-blue-200/20 dark:border-blue-400/10
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }
              animate-fade-in-up
            `}
            style={{ animationDelay: `${skill.delay}ms` }}
          >
            {/* Animated Border Effect - Blue */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-400/10 to-transparent group-hover:animate-shimmer"></div>

            {/* Skill Icon */}
            <div className={`relative z-10 mb-4 ${skill.iconColor}`}>
              <div className="text-3xl">{skill.icon}</div>
              <div className="absolute -inset-2 bg-blue-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </div>

            {/* Skill Content */}
            <div className="relative z-10">
              <h4 className="text-lg font-bold mb-2 transition-colors duration-300">
                {skill.title}
              </h4>
              <p className="text-sm opacity-90 group-hover:opacity-100 transition-all duration-300">
                {skill.desc}
              </p>
            </div>

            {/* Hover Effect Indicator - Blue */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"></div>
          </div>
        ))}
      </div>

      {/* Responsive Design Showcase - Blue Theme */}
      <div className="mt-20 px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <FaMagic className="text-3xl text-blue-500 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Responsive Design Philosophy
            </h2>
            <IoIosColorPalette className="text-3xl text-blue-400 animate-spin-slow" />
          </div>
          <p className=" max-w-2xl mx-auto animate-fade-in delay-500">
            Every pixel matters. I craft experiences that adapt seamlessly
            across all devices and screen sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {responsivePrinciples.map((principle, i) => (
            <div
              key={i}
              className={`
                relative overflow-hidden group
                bg-gradient-to-br from-blue-50/10 to-blue-100/5 dark:from-blue-900/10 dark:to-blue-800/5
                backdrop-blur-lg p-8 rounded-3xl
                border border-blue-200/20 dark:border-blue-700/20 shadow-2xl
                transform transition-all duration-500
                hover:-translate-y-3 hover:shadow-3xl
                animate-slide-up
              `}
              style={{ animationDelay: `${i * 200 + 600}ms` }}
            >
              {/* Background Gradient - Blue */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${principle.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Icon - Blue */}
              <div className="relative z-10 mb-6">
                <div
                  className={`text-4xl bg-gradient-to-br ${principle.color} bg-clip-text text-transparent`}
                >
                  {principle.icon}
                </div>
                <div className="absolute -inset-3 bg-blue-500/10 rounded-full blur-xl"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">{principle.title}</h3>
                <p className="">{principle.description}</p>
              </div>

              {/* Corner Accents - Blue */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${principle.color}/20 rotate-45 -translate-y-16 translate-x-16 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-700`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Level Visualization - Blue Theme */}
      <div className="mt-20 px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4 animate-fade-in">
            Technical Proficiency
          </h2>
          <p className=" max-w-2xl mx-auto">
            A visual representation of my expertise across different domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proficiencyLevels.map((item, i) => (
            <div
              key={i}
              className=" dark:bg-gray-800/10 backdrop-blur-lg p-6 rounded-2xl border border-blue-200/20 dark:border-blue-700/20 shadow-lg animate-slide-up"
              style={{ animationDelay: `${i * 200 + 1200}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-blue-500">{item.icon}</div>
                  <span className="font-semibold">{item.category}</span>
                </div>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {item.level}%
                </span>
              </div>
              <div className="h-3 bg-blue-200/30 dark:bg-gray-700/30 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: "0%" }}
                  ref={(el) => {
                    if (el) {
                      setTimeout(() => {
                        el.style.width = `${item.level}%`;
                      }, 500 + i * 200);
                    }
                  }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Call to Action - Blue Theme */}
      <div className="mt-20 px-4 text-center relative z-10">
        <div className="inline-flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-blue-100/10 to-blue-400/10 backdrop-blur-lg rounded-3xl border border-blue-200/20 dark:border-blue-700/20 shadow-2xl animate-pulse-slow max-w-2xl mx-auto">
          <div className="relative">
            <FaSprayCanSparkles className="text-4xl text-blue-400 animate-spin-slow" />
            <FaStar className="absolute -top-2 -right-2 text-lg text-yellow-500 animate-pulse" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold  mb-3">
              Ready to Bring Your Vision to Life?
            </h3>
            <p className=" max-w-xl">
              Let&apos;s combine technical expertise with creative design to build
              something amazing together.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 text-blue-500 animate-bounce">
            <FaBolt className="text-lg" />
            <span className="font-medium">Let&apos;s Connect & Create</span>
            <FaEye className="text-lg" />
          </div>
        </div>
      </div>

      <TestimonialCard />
    </section>
  );
};

export default Skills;
