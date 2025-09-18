"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MyJourneyBlog from "./Learn";

const About = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [awardPopup, setAwardPopup] = useState(false);
  return (
    <section
      className="relative font-sans lg:p-5  overflow-hidden w-full"
      id="about"
    >
      <h1 className="text-4xl lg:text-5xl p-2 text-center lg:text-left mt-10 lg:mt-0 font-extrabold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
        About
        <span className="h-[4px] rounded-full w-20 bg-gradient-to-r from-blue-500 to-blue-600"></span>
      </h1>

      {/* Animated Background Blobs */}
      {/* <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" /> */}

      {/* Hero Section */}
      <div className="max-w-6xl mt-20 mx-auto px-6 py-4 lg:py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Floating Image */}
        <div className="relative group perspective scale-110">
          <div className="relative w-full h-64 mb-12 flex justify-center scale-120 mt-5 lg:scale-165 z-10">
            {/* First Image */}
            <div className="absolute overflow-hidden left-1/2 ring-4 ring-white rounded -translate-x-[60%] w-48 h-48 transform rotate-[-5deg] hover:rotate-0 transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg z-20">
              <Image
                src="/award2.jpg"
                alt="Journey Photo 1"
                width={600}
                height={600}
                className="w-full h-full object-cover rounded-xl scale-[1.5] pb-[15%] ring-4 ring-white"
                onClick={() => setShowPopup(true)}
              />
              <button
                onClick={() => setAwardPopup(true)}
                className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 hover:text-black hover:bg-white text-xs font-semibold rounded text-white shadow"
              >
                🏅 Award
              </button>
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
        <div className="space-y-6 -mt-14 lg:-mt-0 w-full">
          <h1 className="text-3xl w-full lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
            Hey, I&apos;m Divine Timothy
          </h1>
          <p className="text-md lg:text-lg jn leading-relaxed text-justify">
            I&apos;m a passionate <strong>Developer</strong> crafting clean,
            dynamic, and user-focused experiences. I blend design thinking with
            modern tech to turn concepts into visually stunning,
            high-performance digital products.
          </p>
          <p className="jn text-md lg:text-lg leading-relaxed text-justify">
            When I&apos;m not coding, I create tech content, collaborate with
            startups, and explore ways to push creative boundaries in the
            digital space.
          </p>

          {/* Button with overlapping icons */}
          <div className="flex justify-between items-center gap-3">
            <Link href="/connect">
              <button className="inline-block px-8 w-max py-3 translate-x-0 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                Let&apos;s Connect
              </button>
            </Link>

            <div className="flex items-center -space-x-3">
              <div className="lg:flex items-center hidden justify-center w-8 h-8 pb-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-600 text-white font-extrabold border-2 border-white text-xl">
                +
              </div>
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

      {/* Popup Image */}
      {awardPopup && (
        <div
          className="fixed inset-0 bg-black/80 z-60 flex items-center justify-center"
          onClick={() => setAwardPopup(false)}
        >
          <figure className="relative p-4 rounded-lg max-w-2xl">
            <Image
              src="/Tech_TrailBlaizer_Award.jpg"
              alt="Divine Timothy"
              width={1000}
              height={1000}
              quality={100}
              className="rounded-2xl object-cover w-full max-h-[100vh] lg:max-h-[96vh]"
            />
          </figure>
        </div>
      )}

      {/* Jorney */}
      <MyJourneyBlog />
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
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/80 z-60 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <figure className="relative p-4 rounded-lg -translate-y-10 lg:-translate-y-0 max-w-2xl">
            <Image
              src="/award2.jpg"
              alt="Divine Timothy"
              width={1000}
              height={1000}
              quality={100}
              className="rounded-2xl object-cover w-full scale-170 lg:scale-[2.6] h-64"
            />
          </figure>
        </div>
      )}
    </section>
  );
};

export default About;
