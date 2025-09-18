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

const ServicesCard = () => {
  const services = [
    {
      title: "Web Development",
      description:
        "Custom websites and web apps built with modern technologies like React, Next.js, and Tailwind.",
      icon: <FaLaptopCode size={32} className="text-blue-600" />,
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "UX Experience",
      description:
        "Clean and intuitive interfaces that enhance user experience and drive engagement.",
      icon: <FaPaintBrush size={32} className="text-blue-500" />,
      image: "/ux.avif",
    },
    {
      title: "Mobile App Development",
      description:
        "Responsive and accessible mobile Apps for Android and iOS using Flutter , React Native and modern tools.",
      icon: <FaMobileAlt size={32} className="text-blue-500" />,
      image: "/app.avif",
    },
    {
      title: "Responsive Design",
      description:
        "Fully responsive websites that adapt seamlessly across desktops, tablets, and smartphones.",
      icon: <FaDesktop size={32} className="text-indigo-600" />,
      image: "/responsive.jpg",
    },
    {
      title: "SEO Specialist",
      description:
        "Improve your website's visibility and ranking with expert SEO strategies tailoblue to your goals.",
      icon: <FaEarthAfrica size={32} className="text-blue-500" />,
      image: "/seo.avif",
    },
    {
      title: "Media Editing",
      description:
        "High-quality photo and video editing for brands, creators, and businesses.",
      icon: <FaVideo size={32} className="text-yellow-500" />,
      image: "/media.avif",
    },
  ];

  return (
    <section className="px-6 py-6">
      {/* Title */}
      <div className="text-3xl mt-10 lg:mt-0  flex flex-col gap-2 font-bold lg:text-left text-center mb-12 text-blue-500">
        <h1>Services</h1>
        <span className="h-[4px] rounded-full hidden lg:block w-20 bg-gradient-to-r from-blue-500 to-blue-600"></span>
      </div>

      {/* Services Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Background Image */}
            <Image
              src={service.image}
              alt={service.title}
              width={500}
              height={300}
              className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center service-overlay items-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="mb-3">{service.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-200">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesCard;
