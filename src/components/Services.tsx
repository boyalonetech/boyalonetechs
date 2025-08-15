"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaMobileAlt,
  FaVideo,
} from "react-icons/fa";
import { FaDesktop, FaEarthAfrica } from "react-icons/fa6";

const ServicesCard = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const services = [
    {
      title: "Web Development",
      description:
        "Custom websites and web apps built with modern technologies like React, Next.js, and Tailwind.",
      icon: <FaLaptopCode size={32} className="text-blue-600" />,
      image: "/website-designs.webp",
    },
    {
      title: "UI/UX Design",
      description:
        "Clean and intuitive interfaces that enhance user experience and drive engagement.",
      icon: <FaPaintBrush size={32} className="text-pink-500" />,
      image: "/ui-ux-design.jpg",
    },
    {
      title: "Mobile App Design",
      description:
        "Responsive and accessible mobile designs for Android and iOS using Figma and modern tools.",
      icon: <FaMobileAlt size={32} className="text-green-500" />,
      image: "/app-development.avif",
    },
    {
      title: "Responsive Design",
      description:
        "Fully responsive websites that adapt seamlessly across desktops, tablets, and smartphones.",
      icon: <FaDesktop size={32} className="text-purple-600" />,
      image: "/responsive.jpg",
    },
    {
      title: "SEO Specialist",
      description:
        "Improve your website's visibility and ranking with expert on-page and technical SEO strategies tailored to your goals.",
      icon: <FaEarthAfrica size={32} className="text-blue-500" />,
      image: "/seodesign.jpg",
    },
    {
      title: "Media Editing",
      description:
        "High-quality photo and video editing for brands, content creators, and businesses — delivered with precision and creativity.",
      icon: <FaVideo size={32} className="text-yellow-500" />,
      image: "/media.webp",
    },
  ];

  return (
    <div className="px-6 py-12 mt-12 ">
      <h2
        className="text-2xl font-bold text-center mb-10 text-blue-500"
        id="services"
      >
        My Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const isFlipped = flippedIndex === index;
          return (
            <div
              key={index}
              className="group perspective"
              onClick={() => setFlippedIndex(isFlipped ? null : index)}
            >
              <div
                className={`relative w-full h-64 transition-transform duration-700 transform-style-preserve-3d rounded-xl shadow-lg border border-gray-200 ${
                  isFlipped ? "rotate-y-180" : "group-hover:rotate-y-180"
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 bg-white p-6 flex flex-col justify-center items-center text-center rotate-y-180 backface-hidden rounded-xl">
                  <div className="mb-3">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tailwind extra styles */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default ServicesCard;
