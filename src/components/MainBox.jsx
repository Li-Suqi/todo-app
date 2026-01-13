import React from "react";

const MainBox = ({ children }) => {
  return (
    <div className="w-full max-w-5xl h-[75vh] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
      {children}
    </div>
  );
};

export default MainBox;
