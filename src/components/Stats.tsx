import React from 'react'

const Stats = () => {
  return (
    <div>
      {/* Stats */}
      <div className="flex flex-wrap gap-6 mt-10 ">
        <div className="bg-[#f5f8ff] stat  p-6 rounded shadow w-full lg:max-w-[280px]">
          <h2 className="text-3xl stat2 text-blue-500 font-bold">2K+</h2>
          <p className="text-gray-600 stat3">Websites Developed</p>
        </div>
        <div className="bg-[#f5f8ff] stat  p-6 rounded shadow w-full lg:max-w-[280px]">
          <h2 className="text-3xl stat2 text-blue-500 font-bold">5+</h2>
          <p className="text-gray-600 stat3">Years of Experience</p>
        </div>
        <div className="bg-[#f5f8ff] stat  p-6 rounded shadow w-full lg:max-w-[280px]">
          <h2 className="text-3xl stat2 text-blue-500  font-bold">4K</h2>
          <p className="text-gray-600 stat3">Completed Projects</p>
        </div>
      </div>
    </div>
  );
}

export default Stats
