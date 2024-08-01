import React, { useEffect } from "react";
import Dashboard from "../assets/Dashboard.png";
import ECommerceIcon from "../assets/features/E-Commerce.svg";
import OnlineStoresIcon from "../assets/features/OnlineStores.svg";
import OnlineWebsitesIcon from "../assets/features/OnlineWebsites.svg";
import UnifiedIcon from "../assets/features/Unified.svg";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const FEATURES = [
  { text: "Online Websites", image: OnlineWebsitesIcon },
  { text: "E-Commerce Platforms", image: ECommerceIcon },
  { text: "Online Stores", image: OnlineStoresIcon },
  { text: "Unified Experiences", image: UnifiedIcon },
];

export default function Hero() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const image = document.getElementById("dashboard-image");
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;

      const maxScale = 1.2;
      const minScale = 1;
      const maxOffset = 30;

      const scale = Math.min(maxScale, minScale + scrollPosition * 0.001);
      const offset = Math.min(maxOffset, scrollPosition * 0.5);

      const bottomScale = Math.min(
        maxScale,
        minScale + (maxScroll - scrollPosition) * 0.001
      );
      const bottomOffset = Math.min(
        maxOffset,
        (maxScroll - scrollPosition) * 0.5
      );

      const finalScale = scrollPosition < maxScroll / 2 ? scale : bottomScale;
      const finalOffset =
        scrollPosition < maxScroll / 2 ? offset : bottomOffset;

      image.style.transform = `scale(${finalScale}) translateY(${finalOffset}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-24 bg-white" id="home">
      <div className="px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-gray-500 uppercase">
            Here is the Future of Retail
          </p>
          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
            <span>Transform Offline Businesses into </span>{" "}
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
              Online Success
            </span>{" "}
            with JustPrompt
          </h1>
          <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
            Transform your offline business into a thriving online presence with
            JustPrompt, the intuitive no-code platform designed for
            entrepreneurs and small businesses.
          </p>
          <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
            <a
              href="#_"
              className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0 hover:bg-green-500"
            >
              Get Started
              <svg
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#_"
              className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0 hover:bg-gray-300"
            >
              Learn More
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div
          className="w-full mx-auto mt-20 text-center md:w-10/12 pb-40"
          id="dashboard-image"
        >
          <div className="relative z-0 w-full mt-8">
            <div className="relative overflow-hidden shadow-2xl">
              <div className="flex items-center flex-none px-4 bg-green-400 rounded-b-none h-11 rounded-xl">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 border-2 border-white rounded-full" />
                  <div className="w-3 h-3 border-2 border-white rounded-full" />
                  <div className="w-3 h-3 border-2 border-white rounded-full" />
                </div>
              </div>
              <img
                src={Dashboard}
                alt="Dashboard"
                className="transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
