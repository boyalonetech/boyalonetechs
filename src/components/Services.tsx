"use client";
import React from "react";
import Image from "next/image";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaMobileAlt,
  FaVideo,
} from "react-icons/fa";
import { FaDesktop, FaEarthAfrica } from "react-icons/fa6";
import CardSwap, { Card } from "./CardSwap";

const ServicesCard = () => {
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
    <div className="px-6 lg:ml-[360px] py-4 relative overflow-hidden h-[100vh]">
      {/* Title */}
      <div className="text-3xl flex flex-col gap-2 relative top-0 font-bold text-left p-[15px] px-6 mb-20 w-full text-blue-500 z-10">
        <h1>Services</h1>
        <span className="h-[6px] rounded-2xl w-20 bg-blue-500"></span>
      </div>
      <div className="block -translate-x-40 lg:-translate-x-50  lg:mt-[40%] mt-[100%]">
        {/* CardSwap stack */}
        <CardSwap
          width={400}
          height={300}
          cardDistance={60}
          verticalDistance={70}
          delay={2000}
          pauseOnHover={true}
          skewAmount={6}
          easing="elastic"
        >
          {services.map((service, index) => (
            <Card
              key={index}
              customClass="overflow-hidden shadow-xl rounded-xl translate-x-50"
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70 text-white flex flex-col justify-center items-center p-4 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500">
                <div className="mb-3">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-center">{service.description}</p>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  );
};

export default ServicesCard;
