import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import toast, { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className="dark">
      <div className="flex bg-black w-full dark:text-white min-h-screen">
        <nav className="z-50">
          <Navbar />
        </nav>
        <main className="max-w-2xl border-white grow mx-auto">
          <div className="z-50">
            <Header />
          </div>

          <div
            className="no-sidebar sm:border border-gray-700 bg-zinc-900 sm:rounded-t-3xl overflow-y-scroll"
            style={{ height: "calc(100vh - 48px)" }}
          >
            {children}
            <Toaster position="bottom-right" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
