import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState, useCallback } from "react";
import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';

import ECommerceIcon from '../assets/features/E-Commerce.svg';
import OnlineStoresIcon from '../assets/features/OnlineStores.svg';
import OnlineWebsitesIcon from '../assets/features/OnlineWebsites.svg';
import UnifiedIcon from '../assets/features/Unified.svg';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
const FEATURES = [
  { text: "Online Websites", image: OnlineWebsitesIcon },
  { text: "E-Commerce Platforms", image: ECommerceIcon },
  { text: "Online Stores", image: OnlineStoresIcon },
  { text: "Unified Experiences", image: UnifiedIcon },
];

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const color = useMotionValue(COLORS_TOP[0]);

  const handleType = useCallback((index) => {
    setCurrentFeature(index);
  }, []);

  useEffect(() => {
    animate(color, COLORS_TOP[currentFeature], {
      ease: "easeInOut",
      duration: 2,
      repeatType: "mirror",
    });
  }, [currentFeature, color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.section
      style={{ backgroundImage }}
      id="home"
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 p-8 transition-all duration-1000 ease-in-out">
        <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
          <div className="flex flex-1 w-full flex-col items-center justify-center">
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-white">
              Transform your Offline Businesses into{" "}
              <span className="relative whitespace-nowrap text-green-400">
                <span className="relative">
                  <br />
                  <Typewriter
                    words={FEATURES.map(feature => feature.text)}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                    onLoopDone={() => setCurrentFeature(0)}
                    onType={(index) => handleType(index)}
                  />
                </span>
              </span>
            </h1>
            <p className="mx-auto mt-12 max-w-xl text-lg text-gray-200 leading-7">
              Transform your offline business into a thriving online presence with JustPrompt, the intuitive no-code platform designed for entrepreneurs and small businesses.
            </p>
            <a
              className="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80"
              href="#"
            >
              Get Started →
            </a>
          </div>
        </div>
        <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pl-10">
          <div className="relative w-full p-3 rounded md:p-8 transition-all duration-1000 ease-in-out">
            <div className="rounded-lg bg-white text-black w-full shadow-md">
              <img
                src={FEATURES[currentFeature]?.image}
                alt={FEATURES[currentFeature]?.text}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};

export default Hero;
