import TestimonialCard from "@/components/Testimonial";
import React from "react";
import {
  FaReact,
  FaCss3Alt,
  FaUsers,
  FaRocket,
  FaCode,
  FaSearch,
} from "react-icons/fa";

const Skills = () => {
  return (
    <section className="lg:ml-[370px] mt-25 lg:mt-0  lg:px-0">
      {/* Skills Section */}
      <div className="text-3xl flex flex-col gap-2  relative  lg:top-0 z-10 mt-10 lg:mt-0 lg:text-left  font-bold text-center p-[15px] px-6 mb-10 w-full text-blue-500">
        <h1>Skills</h1>
        <span className="h-[6px] rounded-2xl w-20 bg-blue-500 hidden lg:block"></span>
      </div>
      <div className="grid sm:grid-cols-3 gap-8 px-4">
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
            title: "UI/UX Experience",
            desc: "User-focused & user friendly experiences",
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
            className="bg-gradient-to-br from-blue-500/10 to-blue-500/10backdrop-blur-lg p-6 rounded-2xl shadow-lg transform transition duration-500 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl hover:bg-gradient-to-bl hover:from-blue-500/40 hover:to-blue-500/10 sk text-center"
          >
            <div className="text-blue-600 mb-3">{skill.icon}</div>
            <h4 className="text-lg font-semibold mb-1 text-blue-600">
              {skill.title}
            </h4>
            <p className="text-sm">{skill.desc}</p>
          </div>
        ))}
      </div>
      <TestimonialCard />
    </section>
  );
};

export default Skills;
