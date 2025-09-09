import Skills from "./Stack";
import Stats from "./Stats";
import Project from "./Project";
import ServicesCard from "./Services";
import About from "./About";
import TestimonialCard from "./Testimonial";
import Profile from "./Profile";
import Cta from "./Cta";
import Stack from "./Stack";
import Image from "next/image";
import MobileProfile from "./MobileProfile";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-col sm:flex-row font-sans min-h-screen w-full mb-12">
      {/* Sidebar */}
      {/* <div className="lg:hidden md:block">
        <Profile />
      </div> */}

      <div className="lg:hidden block">
        <MobileProfile />
      </div>

      {/* Main Content */}
      <section
        className="flex-1 h-screen p-3 md:ml-[0px] lg:ml-[360px] sm:p-2 sm:mt-12"
        id="home"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">
              Hey <span className="text-blue-500">there!</span> 👋
            </h1>
            <p className="mt-2  max-w-xl">
              I&apos;m thrilled to tell you a bit about myself. I have over 1+
              years of IT experience specializing in Typescript, database
              Integration, open-source frameworks and other programming
              languages. If you&apos;re in need of a motivated team player,
              let&apos;s connect!
            </p>
          </div>
        </div>

        {/* Sections */}
        <Stats />
        <Stack />
        {/* <Project /> */}
        {/* <ServicesCard /> */}
        {/* <About /> */}
        {/* <TestimonialCard /> */}
        {/* <Cta /> */}
      </section>
    </main>
  );
}
