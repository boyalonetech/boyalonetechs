import React from "react";

const Stats = () => {
  return (
    <div>
      {/* Achievements */}
      <div className="max-w-6xl grid sm:grid-cols-3 gap-8 mt-20 lg:px-6 ">
        {[
          { number: "50+", label: "Projects Completed" },
          { number: "1+", label: "Years of Experience" },
          { number: "100%", label: "Client Satisfaction" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-blue-500/10 to-blue-400/10 p-8 rounded-2xl sk shadow-lg text-center"
          >
            <h4 className="text-3xl font-bold text-blue-500">{stat.number}</h4>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
