import stacks from "@/app/data/stack";
import React from "react";

const Stack = () => {
  return (
    <div className="mt-10 " id="stacks ">
      <h2 className="text-3xl font-bold my-8 text-center text-blue-500">
        Tech Stack
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stacks.map((stack) => {
          const radius = 40;
          const stroke = 6;
          const normalizedRadius = radius - stroke / 2;
          const circumference = 2 * Math.PI * normalizedRadius;
          const strokeDashoffset =
            circumference - (stack.percent / 100) * circumference;

          return (
            <div
              key={stack.name}
              className=" p-2 rounded-xl shadow center flex flex-col items-center bg-gradient-to-br from-blue-500/10 to-blue-400/10 sk"
            >
              {/* Circular Progress with Icon in center */}
              <div className="relative xl:w-24 xl:h-24 h-24 w-24 lg:h-20 lg:w-20 mb-2">
                <svg
                  className="absolute top-0 left-0"
                  height={radius * 2}
                  width={radius * 2}
                >
                  <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                  <circle
                    stroke="#008CFF"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-1000"
                  />
                </svg>

                {/* Centeblue SVG Icon */}
                <div className="absolute inset-0 flex items-center justify-center xl:pr-4 xl:pb-4 pr-4 pb-4 lg:pr-0 lg:pb-0 ">
                  {stack.icon}
                </div>
              </div>

              {/* stack Name */}
              <h3 className="sm font-semibold xl:text-base lg:text-sm">{stack.name}</h3>

              {/* Percentage */}
              <p className="sm xl:text-base lg:text-sm mt-1">{stack.percent}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stack;
