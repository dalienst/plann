"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "@/providers/NextAuthProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import BootstrapClient from "@/providers/BootstrapClient";

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Plannit</title>
        <meta
          name="description"
          content="Streamline your daily tasks and projects with Plannit, your all-in-one corporate task management solution."
        />
      </head>
      <body>
        <Toaster position="top-center" />
        <NextAuthProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </NextAuthProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}

export default RootLayout;
