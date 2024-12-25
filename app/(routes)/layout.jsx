import Navbar from "@/components/main/Navbar";
import React from "react";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default MainLayout;
