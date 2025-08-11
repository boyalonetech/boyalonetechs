import React from "react";
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
    },
    {
      title: "UI/UX Design",
      description:
        "Clean and intuitive interfaces that enhance user experience and drive engagement.",
      icon: <FaPaintBrush size={32} className="text-pink-500" />,
    },
    {
      title: "Mobile App Design",
      description:
        "Responsive and accessible mobile designs for Android and iOS using Figma and modern tools.",
      icon: <FaMobileAlt size={32} className="text-green-500" />,
    },
    {
      title: "Responsive Design",
      description:
        "Fully responsive websites that adapt seamlessly across desktops, tablets, and smartphones.",
      icon: <FaDesktop size={32} className="text-purple-600" />,
    },
    {
      title: "SEO Specialist",
      description:
        "Improve your website's visibility and ranking with expert on-page and technical SEO strategies tailored to your goals.",
      icon: <FaEarthAfrica size={32} className="text-blue-500" />,
    },
    {
      title: "Media Editing",
      description:
        "High-quality photo and video editing for brands, content creators, and businesses — delivered with precision and creativity.",
      icon: <FaVideo size={32} className="text-yellow-500" />,
    },
  ];

  return (
    <div className="px-6 py-12  mt-12">
      <h2 className="text-2xl font-bold text-center mb-10" id="services">
        My Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow hover:shadow-xl transition duration-300 border border-gray-200 group"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesCard;
