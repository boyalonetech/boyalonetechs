import Link from "next/link";
import React from "react";

const Cta = () => {
  return (
    <section className="mt-20 mb-12 max-w-lg mx-auto bg-gradient-to-br from-blue-600 to-blue-600 p-8 rounded-3xl shadow-2xl text-center text-white">
      <h4 className="text-2xl font-bold mb-4">
        Let&apos;s Build Something Amazing
      </h4>
      <p className="mb-6">
        Have an idea or project in mind? I&apos;d love to help bring it to life.
      </p>
      <Link
        href="https://wa.me/2348161514098"
        className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:scale-105 transition duration-300"
      >
        Let&apos;s Talk
      </Link>
    </section>
  );
};

export default Cta;
