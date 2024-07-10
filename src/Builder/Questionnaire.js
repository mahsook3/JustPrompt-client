//Questionnaire.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Questionnaire = ({ onSubmit }) => {
  const [step, setStep] = useState(0); // Start with overview step
  const [companyName, setCompanyName] = useState("");
  const [goal, setGoal] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [workplaceUrl, setWorkplaceUrl] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("questionnaireData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setCompanyName(data.companyName || "");
      setGoal(data.goal || "");
      setNumberOfEmployees(data.numberOfEmployees || "");
      setWorkplaceUrl(data.workplaceUrl || "");
      setKeywords(data.keywords || []);
      setSelectedComponents(data.selectedComponents || []);
      setLogoUrl(data.logoUrl || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "questionnaireData",
      JSON.stringify({
        companyName,
        goal,
        numberOfEmployees,
        workplaceUrl,
        keywords,
        selectedComponents,
        logoUrl,
      })
    );
  }, [
    companyName,
    goal,
    numberOfEmployees,
    workplaceUrl,
    keywords,
    selectedComponents,
    logoUrl,
  ]);

  const handleKeywordClick = (keyword) => {
    setKeywords((prevKeywords) =>
      prevKeywords.includes(keyword)
        ? prevKeywords.filter((k) => k !== keyword)
        : [...prevKeywords, keyword]
    );
  };

  const handleComponentClick = (component) => {
    setSelectedComponents((prevComponents) =>
      prevComponents.includes(component)
        ? prevComponents.filter((c) => c !== component)
        : [...prevComponents, component]
    );
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=aea1014911ef618a11a303bcebf25ca7",
        formData
      );
      setLogoUrl(response.data.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      companyName,
      goal,
      numberOfEmployees,
      workplaceUrl,
      keywords,
      selectedComponents,
      logoUrl,
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label className="block mb-2 text-gray-700">Company Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block mb-2 text-gray-700">Goal</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <label className="block mb-2 text-gray-700">
              Number of Employees
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              value={numberOfEmployees}
              onChange={(e) => setNumberOfEmployees(e.target.value)}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <label className="block mb-2 text-gray-700">Workplace URL</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={workplaceUrl}
              onChange={(e) => setWorkplaceUrl(e.target.value)}
            />
          </div>
        );
      case 5:
        return (
          <div>
            <label className="block mb-2 text-gray-700">Keywords</label>
            <div className="flex flex-wrap gap-2 justify-center">
  {['E-commerce Stores', 'Service-based Businesses', 'Blogs and Content Sites', 'Portfolio Websites', 'Events and Booking', 'Restaurant Websites', 'Personal Branding', 'Photography Portfolios', 'Fashion and Apparel Stores', 'Travel and Tourism Websites', 'Real Estate Listings', 'Educational Websites', 'Nonprofit and Charity Websites', 'Fitness and Wellness Sites', 'Consulting and Professional Services', 'Beauty and Spa Websites', 'Art and Craft Galleries', 'Musician or Band Websites', 'Automotive Sales and Services', 'Pet Services and Products', 'Health and Medical Clinics', 'Legal Services', 'Financial Services', 'Tech Startups and IT Services', 'Home and Garden Improvement', 'Wedding Planning Services', 'Online Courses and Learning Platforms', 'News and Magazine Websites', 'Gaming and Entertainment Blogs', 'Interior Design and Architecture', 'Food and Beverage Blogs', 'Environmental Causes and Green Businesses', 'Freelance and Creative Portfolios'].map((keyword) => (
    <button
      key={keyword}
      className={`px-4 py-2 border rounded-lg ${
        keywords.includes(keyword) ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
      onClick={() => handleKeywordClick(keyword)}
    >
      {keyword}
    </button>
  ))}
</div>
          </div>
        );
      case 6:
        return (
          <div>
            <label className="block mb-2 text-gray-700">Logo</label>
            <input type="file" onChange={handleLogoUpload} />
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Company Logo"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
          </div>
        );
      case 7:
        return (
          <div>
            <label className="block mb-2 text-gray-700">Components</label>
            <div className="flex flex-wrap gap-2">
              {[
                "Hero",
                "Features",
                "Footer",
                "About Us",
                "Services",
                "Portfolio",
                "Blog",
                "Testimonials",
                "Contact Us",
                "Team",
                "FAQ",
                "Gallery",
                "Shop",
                "Events",
                "Clients",
                "Terms of Service",
                "Privacy Policy",
                "Career Opportunities",
                "Subscription Plans",
                "Customer Support",
                "Latest News",
                "Social Media Links",
                "Newsletter Signup",
                "Press Releases",
                "Case Studies",
                "Rewards Program",
                "Product Reviews",
                "Partnerships",
                "Community Forum",
                "Feedback Form",
              ].map((component) => (
                <button
                  key={component}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedComponents.includes(component)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleComponentClick(component)}
                >
                  {component}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {step === 0 ? (
          <section className="pt-20">
            {" "}
            <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
              <div className="max-w-xl space-y-3 md:mx-auto">
                <h3 className="text-green-400 font-semibold">
                  WITH AI-POWERED SIMPLICITY
                </h3>
                <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                  Build your website within 3 steps
                </p>
                <p className="text-gray-600">
                  Transform your offline business into a thriving online
                  presence with JustPrompt, the intuitive no-code platform
                  designed for entrepreneurs and small businesses.
                </p>
              </div>
              <div className="mt-2 md:mt-0 py-12 pb-6 sm:py-16 lg:pb-24 overflow-hidden">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
                  <div className="relative mt-12 lg:mt-20">
                    <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                      <svg
                        className="w-full"
                        xmlns="http://www.w3.org/2000/svg"
                        width={875}
                        height={48}
                        viewBox="0 0 875 48"
                        fill="none"
                      >
                        <path
                          d="M2 29C20.2154 33.6961 38.9915 35.1324 57.6111 37.5555C80.2065 40.496 102.791 43.3231 125.556 44.5555C163.184 46.5927 201.26 45 238.944 45C312.75 45 385.368 30.7371 458.278 20.6666C495.231 15.5627 532.399 11.6429 569.278 6.11109C589.515 3.07551 609.767 2.09927 630.222 1.99998C655.606 1.87676 681.208 1.11809 706.556 2.44442C739.552 4.17096 772.539 6.75565 805.222 11.5C828 14.8064 850.34 20.2233 873 24"
                          stroke="#D4D4D8"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeDasharray="1 12"
                        />
                      </svg>
                    </div>
                    <div className="relative grid grid-cols-1 text-center gap-y-8 sm:gap-y-10 md:gap-y-12 md:grid-cols-3 gap-x-12">
                      <div>
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                          <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                            1
                          </span>
                        </div>
                        <h3 className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 dark:text-white md:mt-10">
                          Questionnaires
                        </h3>
                        <p className="mt-3 sm:mt-4 text-base text-gray-600 dark:text-gray-400">
                          Answer the questions to help AI understand your
                          business.
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                          <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                            2
                          </span>
                        </div>
                        <h3 className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 dark:text-white md:mt-10">
                          Drag and drop
                        </h3>
                        <p className="mt-3 sm:mt-4 text-base text-gray-600 dark:text-gray-400">
                          What you see is what you get. Drag and drop
                          components.
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                          <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                            3
                          </span>
                        </div>
                        <h3 className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 dark:text-white md:mt-10">
                          Make it live
                        </h3>
                        <p className="mt-3 sm:mt-4 text-base text-gray-600 dark:text-gray-400">
                          Now your website is ready to go live. Publish it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="px-6 py-2 bg-green-400 text-white rounded-lg mt-10"
                    onClick={() => setStep(1)}
                  >
                    Let's get started
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
<div className="w-full p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <div className="p-4 space-y-2 mb-4">
              <h3 className="text-base font-semibold">
                Step {step}:{" "}
                {
                  [
                    "Company Name",
                    "Goal",
                    "Number of Employees",
                    "Workplace URL",
                    "Keywords",
                    "Logo",
                    "Components",
                  ][step - 1]
                }
              </h3>
              <div className="flex max-w-xs space-x-3">
                {[...Array(7)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-12 h-2 rounded-full ${
                      i < step - 1
                        ? "bg-violet-600"
                        : i === step - 1
                        ? "bg-gray-800 animate-pulse"
                        : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
            {renderStep()}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                  onClick={() => setStep(step - 1)}
                >
                  Previous
                </button>
              )}
              {step < 7 ? (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
