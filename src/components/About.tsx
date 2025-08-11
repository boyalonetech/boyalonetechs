import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="bg-white text-gray-800 px-6 py-16 font-sans" id="about">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          I’m a passionate Web Developer dedicated to crafting clean, creative,
          and user-focused experiences on the web. With a blend of design
          thinking and modern tech, I turn ideas into functional and beautiful
          digital products.
        </p>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Image */}
        <div className="w-full h-[400px] relative">
          <Image
            src="/Screenshot_20250412-200455[1].png"
            alt="About illustration"
            fill
            className="object-cover rounded-xl shadow"
          />
        </div>

        {/* Story Text */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            I specialize in building high-performing websites with React,
            Next.js, and Tailwind CSS. My work combines beautiful UI with
            intuitive UX, ensuring your digital product is not just functional
            but also delightful.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Beyond coding, I enjoy storytelling, tech content creation, and
            working with startups to bring bold visions to life. I believe in
            continuous learning, collaboration, and pushing the boundaries of
            creativity.
          </p>
        </div>
      </div>

      {/* Skills or Highlights */}
      <div className="mt-20 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold mb-6 text-center">What I Bring</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-[#f5f8ff] p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold mb-1">React / Next.js</h4>
            <p className="text-sm text-gray-500">Dynamic, scalable apps</p>
          </div>
          <div className="bg-[#f5f8ff] p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold mb-1">Tailwind CSS</h4>
            <p className="text-sm text-gray-500">Fast and clean UI design</p>
          </div>
          <div className="bg-[#f5f8ff] p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold mb-1">UI/UX Design</h4>
            <p className="text-sm text-gray-500">User-centered experiences</p>
          </div>
          <div className="bg-[#f5f8ff] p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold mb-1">Content Creation</h4>
            <p className="text-sm text-gray-500">Tech storytelling & media</p>
          </div>
          <div className="bg-[#f5f8ff] p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold mb-1">SEO & Performance</h4>
            <p className="text-sm text-gray-500">Optimized for the web</p>
          </div>
          <div className="bg-[#f5f8ff] p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold mb-1">Team Collaboration</h4>
            <p className="text-sm text-gray-500">Agile, Git, & teamwork</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h4 className="text-xl font-semibold mb-4">
          Want to build something together?
        </h4>
        <Link
          href="https://wa.me/2348161514098"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Let`s Talk
        </Link>
      </div>
    </div>
  );
};

export default About;
