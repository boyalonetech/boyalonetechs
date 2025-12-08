"use client";
import React from "react";
import Image from "next/image";
import services from "@/app/data/service";
import WorkExperience from "./WorkExperience";

const ServicesCard = () => {
  return (
    <section className=" py-6">
      {/* Title */}
      <div className="text-3xl mt-10 lg:mt-0  flex flex-col gap-2 font-bold lg:text-left text-center px-6 mb-12 text-blue-500">
        <h1>Services</h1>
        <span className="h-[4px] rounded-full hidden lg:block w-20 bg-gradient-to-r from-blue-500 to-blue-600"></span>
      </div>

      {/* Services Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-6">
        {services.map((service, id) => (
          <div
            key={id}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-opacity duration-500"
          >
            {/* Background Image */}
            <Image
              src={service.image}
              alt={service.title}
              width={500}
              loading="lazy"
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

      {/* Experience Card */}

      <WorkExperience />
    </section>
  );
};

export default ServicesCard;
