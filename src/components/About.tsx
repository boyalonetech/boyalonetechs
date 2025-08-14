import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section
      className="relative bg-gradient-to-br from-[#f8faff] via-[#eef3ff] to-[#f8faff] text-gray-800 px-6 py-20 font-sans overflow-hidden"
      id="about"
    >
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div className="relative">
          <div className="relative w-64 h-64 lg:w-80 lg:h-80 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-white">
            <Image
              src="/boyaloneamime.png"
              alt="Divine Timothy"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>

        {/* Right: Text */}
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hey, I&apos;m Divine Timothy
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed text-justify">
            I&apos;m a passionate <strong>Web Developer</strong> crafting clean,
            dynamic, and user-focused experiences. I blend design thinking with
            modern tech to turn concepts into visually stunning,
            high-performance digital products.
          </p>
          <p className="text-gray-600 leading-relaxed text-justify">
            When I&apos;m not coding, I create tech content, collaborate with
            startups, and explore ways to push creative boundaries in the
            digital space.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <h2 className="text-2xl font-bold text-blue-600">3+</h2>
              <p className="text-sm text-gray-500">Years Experience</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-purple-600">50+</h2>
              <p className="text-sm text-gray-500">Projects Completed</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-pink-600">15+</h2>
              <p className="text-sm text-gray-500">Happy Clients</p>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="flex gap-4">
            <Link
              href="/connect"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Let&apos;s Connect
            </Link>
            <Link
              href="/projects"
              className="inline-block px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-100 transition-all duration-300"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
