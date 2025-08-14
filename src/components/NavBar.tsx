import Link from "next/link";
import React from "react";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-lg border-t border-gray-200 z-50">
      <div className="max-w-lg mx-auto flex justify-around py-3">
        <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
          </svg>
          Home
        </Link>
        <Link href="/about" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.779.64 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          About
        </Link>
        <Link href="/projects" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-8-4h8M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Projects
        </Link>
        <Link href="/contact" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4-4m-4 4l4 4" />
          </svg>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;