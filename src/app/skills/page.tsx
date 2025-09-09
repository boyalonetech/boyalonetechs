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

const page = () => {
  return (
    <section className="lg:ml-[370px] mt-4">
      {/* Skills Section */}
      <div className="text-3xl lg:flex flex-col gap-2 hidden relative top-0 z-10  font-bold text-left p-[15px] px-6 mb-20 w-full text-blue-500">
        <h1>Skills</h1>
        <span className="h-[6px] rounded-2xl w-20 bg-blue-500"></span>
      </div>
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
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10backdrop-blur-lg p-6 rounded-2xl shadow-lg transform transition duration-500 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl hover:bg-gradient-to-bl hover:from-blue-500/40 hover:to-purple-500/10 sk text-center"
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

export default page;
