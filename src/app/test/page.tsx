import Squares from "@/components/Text";
import React from "react";

const page = () => {
  return (
    <div className="ml-[360px]">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#fff"
        hoverFillColor="#222"
      />
    </div>
  );
};

export default page;
