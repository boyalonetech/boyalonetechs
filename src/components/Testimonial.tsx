import React from "react";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";

const TestimonialCard = () => {
  const testimonials = [
    {
      name: "Elvis",
      role: "Product Designer",
      company: "TechCorp Inc.",
      rating: 5,
      message:
        "Working with this developer was a fantastic experience. The delivery was fast, clean, and exceeded expectations!",
      avatar: "/ImxECTeo_400x400.jpg",
    },
    {
      name: "Ucheben",
      role: "CEO",
      company: "Startup Ulooma",
      rating: 4,
      message:
        "Very professional and creative. The project was delivered on time, and the UI was beautiful and functional.",
      avatar: "/515109296_1039546558248870_5642051882614547911_n.jpg",
    },
    {
      name: "Caleb Collins",
      role: "Digital Marketer",
      company: "Adel Digital Solutions",
      rating: 5,
      message:
        "Top-notch design skills and excellent collaboration throughout the project. Highly recommend!",
      avatar: "/caleb.jpg",
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
            className=" w-full h-[350px] p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center card"
          >
            {/* Avatar */}
            <figure className="w-28 h-28 rounded-full overflow-hidden mb-4 relative ring-5 scale-110 ring-blue-500">
              <Image
                src={t.avatar}
                alt={t.name}
                width={120}
                height={120}
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
    </div>
  );
};

export default TestimonialCard;
