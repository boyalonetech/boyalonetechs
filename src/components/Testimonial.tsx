import React from "react";
import Image from "next/image";
import { FaStar, FaRegStar, FaQuoteLeft } from "react-icons/fa";
import GoogleReviewSection from "./GoogleReview";

const TestimonialCard = () => {
  const testimonials = [
    {
      name: "Charles Mark",
      role: "CEO & Founder",
      company: "Genz AI Inc.",
      rating: 5,
      message:
        "Working with this developer was a fantastic experience. The delivery was fast, clean, and exceeded expectations!",
      avatar: "/charles_mark.webp",
    },
    {
      name: "Ucheben",
      role: "CEO",
      company: "Startup Ulooma",
      rating: 4,
      message:
        "Very professional and creative. The project was deliveblue on time, and the UI was beautiful and functional.",
      avatar: "/ucheben.webp",
    },
    {
      name: "Caleb Collins",
      role: "Digital Marketer",
      company: "Adel Digital Solutions",
      rating: 5,
      message:
        "Top-notch design skills and excellent collaboration throughout the project. Highly recommend!",
      avatar: "/ccmedia.webp",
    },
  ];

  return (
    <div className="py-16 px-6 ">
      <h2
        className="text-3xl font-bold text-center mb-12 text-blue-500"
        id="review"
      >
        What Clients Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto ">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className=" w-full h-[350px] p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center from-blue-500/10 to-blue-500/10 sk backdrop-blur-lg "
          >
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <FaQuoteLeft className="text-white text-sm" />
            </div>
            {/* Avatar */}
            <figure className="w-28 h-28 rounded-full overflow-hidden mb-4 relative ring-5 scale-110 ring-blue-500">
              <Image
                src={t.avatar}
                alt={t.name}
                width={120}
                height={120}
                loading="lazy"
                className="rounded-full object-cover "
              />
            </figure>

            {/* Name & Role */}
            <h4 className="font-semibold text-lg">{t.name}</h4>
            <p className="text-sm text-gray-500 mb-2 test1">
              {t.role} at {t.company}
            </p>

            {/* Message */}
            <p className="text-gray-700 mb-3 test2 text-sm leading-snug line-clamp-3">
              {t.message}
            </p>

            {/* Star Rating */}
            <div className="flex justify-center text-yellow-400">
              {[...Array(5)].map((_, i) =>
                i < t.rating ? (
                  <FaStar key={i} className="w-5 h-5" />
                ) : (
                  <FaRegStar key={i} className="w-5 h-5" />
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <GoogleReviewSection />
    </div>
  );
};

export default TestimonialCard;
