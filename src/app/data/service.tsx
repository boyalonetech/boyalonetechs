import { JSX } from "react";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaMobileAlt,
  FaVideo,
} from "react-icons/fa";
import { FaDesktop, FaEarthAfrica } from "react-icons/fa6";

export interface ServicesCard {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  image: string;
}

const services: ServicesCard[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Custom websites and web apps built with modern technologies like React, Next.js, and Tailwind.",
    icon: <FaLaptopCode size={32} className="text-blue-600" />,
    image: "/frontend.webp",
  },
  {
    id: 2,
    title: "UX Experience",
    description:
      "Clean and intuitive interfaces that enhance user experience and drive engagement.",
    icon: <FaPaintBrush size={32} className="text-blue-500" />,
    image: "/ux.avif",
  },
  {
    id: 3,
    title: "Mobile App Development",
    description:
      "Responsive and accessible mobile Apps for Android and iOS using Flutter , React Native and modern tools.",
    icon: <FaMobileAlt size={32} className="text-blue-500" />,
    image: "/app.avif",
  },
  {
    id: 4,
    title: "Responsive Design",
    description:
      "Fully responsive websites that adapt seamlessly across desktops, tablets, and smartphones.",
    icon: <FaDesktop size={32} className="text-indigo-600" />,
    image: "/responsive.jpg",
  },
  {
    id: 5,
    title: "SEO Specialist",
    description:
      "Improve your website's visibility and ranking with expert SEO strategies tailoblue to your goals.",
    icon: <FaEarthAfrica size={32} className="text-blue-500" />,
    image: "/seo.avif",
  },
  {
    id: 6,
    title: "Media Editing",
    description:
      "High-quality photo and video editing for brands, creators, and businesses.",
    icon: <FaVideo size={32} className="text-yellow-500" />,
    image: "/media.avif",
  },
];

export default services;
