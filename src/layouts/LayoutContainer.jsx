import React from "react";

const LayoutContainer = ({ children }) => {
  return (
    <div className="h-screen w-full bg-amber-50 flex items-center justify-center p-4">
      {children}
    </div>
  );
};

export default LayoutContainer;
