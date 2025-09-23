import About from "@/components/About";
import React from "react";

const page = () => {
  return (
    <section className="lg:ml-[360px]  mt-20 lg:mt-0 ">
      <div className="absolute hidden lg:block -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute hidden lg:block top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <About />
    </section>
  );
};

export default page;
