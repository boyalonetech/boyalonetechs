import { exp } from "@/app/data/year";
import React from "react";

const Stats = () => {
  const num = exp + "+";
  return (
    <div>
      {/* Achievements */}
      <div className="grid  sm:grid-cols-3 gap-8 mt-20 lg:px-4 xl:px-3 2xl:px-0 ">
        {[
          { number: "50+", label: "Projects Completed" },
          { number: num, label: "Years of Experience" },
          { number: "100%", label: "Client Satisfaction" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-blue-500/10 to-blue-400/10 p-8 rounded-2xl sk shadow-lg text-center"
          >
            <h4 className="text-3xl xl:text-3xl lg:text-2xl font-bold text-blue-500">
              {stat.number}
            </h4>
            <p className="text-gray-600 lg:text-sm xl:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
