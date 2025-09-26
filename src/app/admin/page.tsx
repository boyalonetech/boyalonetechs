"use client";
import Admin from "@/components/Admin";
import React from "react";

const page = () => {
  return (
    <div className="">
      <Admin
        onLogout={() => {
          // TODO: implement logout logic here
          console.log("Logout clicked");
        }}
      />
    </div>
  );
};

export default page;
