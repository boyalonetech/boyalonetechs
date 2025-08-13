import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section
      className="relative bg-gradient-to-br from-[#f8faff] via-[#eef3ff] to-[#f8faff] text-gray-800 px-6 py-20 font-sans overflow-hidden"
      id="about"
    >
      {/* Floating Background Elements */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Intro Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
          About Me
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed animate-fadeIn">
          I’m a passionate Web Developer dedicated to crafting clean, creative,
          and user-focused experiences on the web. With a blend of design
          thinking and modern tech, I turn ideas into functional and beautiful
          digital products.
        </p>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Image with 3D Tilt */}
        <div className="relative w-full h-[420px] group perspective">
          <div className="relative w-full h-full transform transition-transform duration-500 group-hover:rotate-y-6 group-hover:scale-105">
            <Image
              src="/about.jpg"
              alt="About illustration"
              fill
              className="object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Text */}
        <div className="animate-slideUp space-y-4">
          <h2 className="text-3xl font-bold text-blue-600 drop-shadow-md">
            Who I Am
          </h2>
          <p className="text-gray-600 leading-relaxed">
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

      {/* Skills Section */}
      <div className="mt-20 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-10 text-center text-gray-800">
          What I Bring
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {[
            { title: "React / Next.js", desc: "Dynamic, scalable apps" },
            { title: "Tailwind CSS", desc: "Fast and clean UI design" },
            { title: "UI/UX Design", desc: "User-centered experiences" },
            { title: "Content Creation", desc: "Tech storytelling & media" },
            { title: "SEO & Performance", desc: "Optimized for the web" },
            { title: "Team Collaboration", desc: "Agile, Git, & teamwork" },
          ].map((skill, i) => (
            <div
              key={i}
              className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 transform transition duration-500 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl hover:bg-white/80"
            >
              <h4 className="text-lg font-semibold mb-1 text-blue-600">
                {skill.title}
              </h4>
              <p className="text-sm text-gray-500">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-20 max-w-lg mx-auto bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl text-center transform hover:scale-105 transition duration-500">
        <h4 className="text-2xl font-bold mb-4 text-gray-800">
          Let’s Build Something Amazing
        </h4>
        <p className="text-gray-600 mb-6">
          Have an idea or project in mind? I’d love to help bring it to life.
        </p>
        <Link
          href="https://wa.me/2348161514098"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
        >
          Let’s Talk
        </Link>
      </div>
    </section>
  );
};

export default About;
