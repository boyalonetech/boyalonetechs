"use client";
import certifications from "@/app/data/certification";
import Image from "next/image";
import React, { useState } from "react";

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<
    null | (typeof certifications)[0]
  >(null);

  return (
    <section className="relative font-sans lg:p-10 p-6  overflow-hidden w-full min-h-screen mt-20 lg:mt-12">
      <h1 className="text-4xl lg:text-5xl p-2 text-center font-extrabold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
        🎓 Certifications
      </h1>
      <p className="text-center text-gray-600 mt-2 mb-10">
        A showcase of my certifications, achievements, and recognitions.
      </p>

      {/* Certificates Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
        {certifications.map((cert, index) => (
          <div
            key={index}
            onClick={() => setSelectedCert(cert)}
            className="group cursor-pointer relative jn sk rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <Image
              src={cert.image}
              alt={cert.title}
              width={600}
              height={400}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{cert.title}</h2>
              <p className="text-sm ">{cert.issuer}</p>
              <span className="text-xs ">{cert.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/80 z-60 flex items-center justify-center"
          onClick={() => setSelectedCert(null)}
        >
          <figure className="relative p-4 rounded-lg max-w-3xl w-full">
            <Image
              src={selectedCert.image}
              alt={selectedCert.title}
              width={1200}
              height={800}
              quality={100}
              className="rounded-2xl object-contain w-full max-h-[90vh]"
            />
            <figcaption className="text-center mt-4 text-white">
              <h2 className="text-2xl font-bold">{selectedCert.title}</h2>
              <p className="text-sm">
                {selectedCert.issuer} • {selectedCert.year}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
