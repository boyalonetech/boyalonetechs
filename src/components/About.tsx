"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MyJourneyBlog from "./Learn";
import Certifications from "./certification";

const About = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [awardPopup, setAwardPopup] = useState(false);
  return (
    <section
      className="relative font-sans lg:p-5 overflow-hidden w-full "
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
          <div className="relative w-full h-64 mb-12 img flex justify-center scale-120 mt-5 lg:scale-165 z-10">
            {/* First Image */}
            <div className="absolute overflow-hidden left-1/2  ring-4 ring-white rounded -translate-x-[60%] w-48 h-48 transform rotate-[-5deg] hover:rotate-0 transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg z-20">
              <Image
                src="/award2.jpg"
                alt="Journey Photo 1"
                width={600}
                height={600}
                className="w-full h-full object-cover pb-[15%] scale-[1.5] ring-4 ring-white"
                onClick={() => setShowPopup(true)}
              />
              <button
                onClick={() => {
                  window.location.href = "certifications";
                }}
                className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 hover:text-black hover:bg-white text-xs font-semibold rounded text-white shadow"
              >
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    height={15}
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        fill="#66adff"
                        d="m4.355 14.38l-3.122 5.39a.492.492 0 0 0 .508.733l2.757-.467l.96 2.638a.492.492 0 0 0 .887.084l2.681-4.537"
                      ></path>
                      <path
                        stroke="#191919"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.355 14.38l-3.122 5.39a.492.492 0 0 0 .508.733l2.757-.467l.96 2.638a.492.492 0 0 0 .887.084l2.681-4.537"
                        strokeWidth={1}
                      ></path>
                      <path
                        fill="#66adff"
                        d="m19.645 14.38l3.122 5.391a.493.493 0 0 1-.508.733l-2.757-.467l-.96 2.638a.492.492 0 0 1-.887.084l-2.681-4.537"
                      ></path>
                      <path
                        stroke="#191919"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.645 14.38l3.122 5.391a.493.493 0 0 1-.508.733l-2.757-.467l-.96 2.638a.492.492 0 0 1-.887.084l-2.681-4.537"
                        strokeWidth={1}
                      ></path>
                      <path
                        fill="#f5e020"
                        d="M11.984 18.726a8.863 8.863 0 1 0 0-17.726a8.863 8.863 0 0 0 0 17.726"
                      ></path>
                      <path
                        fill="#efd909"
                        d="M5.717 16.13A8.863 8.863 0 1 1 18.252 3.596z"
                      ></path>
                      <path
                        stroke="#191919"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.984 18.726a8.863 8.863 0 1 0 0-17.726a8.863 8.863 0 0 0 0 17.726"
                        strokeWidth={1}
                      ></path>
                      <path
                        fill="#fff"
                        stroke="#191919"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m12.562 5.293l1.263 2.604h2.461a.604.604 0 0 1 .421 1.05l-2.133 2.103l1.182 2.719a.643.643 0 0 1-.917.806l-2.856-1.61l-2.856 1.61a.644.644 0 0 1-.917-.806l1.182-2.72l-2.133-2.102a.603.603 0 0 1 .422-1.052h2.462l1.265-2.602a.652.652 0 0 1 1.154 0"
                        strokeWidth={1}
                      ></path>
                    </g>
                  </svg>
                  Award
                </span>{" "}
              </button>
            </div>

            {/* Second Image */}
            <div className="absolute left-1/2 -translate-x-[40%] w-48 h-48 transform rotate-[8deg] rounded-xl hover:rotate-0 transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg z-10">
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
                alt="Boy Alone"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <Image
                src="/robinson.jpg"
                width={100}
                height={100}
                alt="Honor"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <Image
                src="/akorede.jpg"
                alt="Akorede"
                width={100}
                height={100}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <Image
                src="/chrisban.jpg"
                alt="Chrisban"
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

      <Certifications />

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
