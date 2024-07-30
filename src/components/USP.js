import React from 'react'
import Dashboard from '../assets/Dashboard.png'

// JSON data
const content = {
  shortHeading: "With AI Powered simplicity",
  mainHeading: "Transform Offline Businesses into Online Success with JustPrompt",
  shortParagraph: "Transform your offline business into a thriving online presence with JustPrompt, the intuitive no-code platform designed for entrepreneurs and small businesses.",
  button: {
    text: "Get Started",
    link: "#_"
  }
};

export default function USP() {
  return (
    <section className="pt-24 bg-white" id='about'>
      <div className="px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-gray-500 uppercase">{content.shortHeading}</p>
          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
            {content.mainHeading}
          </h1>
          <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
            {content.shortParagraph}
          </p>
          <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
            <a
              href={content.button.link}
              className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0"
            >
              {content.button.text}
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
          </div>
        </div>
        <div className="w-full mx-auto mt-20 text-center md:w-10/12">
          <div className="relative z-0 w-full mt-8">
            <div className="relative overflow-hidden shadow-2xl">
              <div className="flex items-center flex-none px-4 bg-green-400 rounded-b-none h-11 rounded-xl">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 border-2 border-white rounded-full" />
                  <div className="w-3 h-3 border-2 border-white rounded-full" />
                  <div className="w-3 h-3 border-2 border-white rounded-full" />
                </div>
              </div>
              <img src={Dashboard} alt="Dashboard" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
