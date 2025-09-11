"use client";
import React from "react";
import Squares from "./Text";

const StatusBox = () => {
  return (
    <div className="relative w-full my-8">
      {/* Background animation */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <Squares
          direction="right"
          speed={0.5}
          borderColor="#333"
          hoverFillColor="#5093ff"
          squareSize={50}
        />
      </div>

      {/* Foreground content */}
      <div className="relative flex justify-between items-center bg-black/80 p-3 rounded-2xl backdrop-blur-md">
        <span className="flex items-center justify-center gap-6">
          <h1 className="text-2xl text-white">Status</h1>
          <span className="text-white">:</span>
        </span>
        <span className="bg-[#5093ff] text-white w-max px-4 py-2 rounded-2xl font-medium">
          🟢 Available for Hire
        </span>
      </div>
    </div>
  );
};

export default StatusBox;
