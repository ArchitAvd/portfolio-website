/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fetchPortfolio } from "../services/dataService";
import LoadingSpinner from "./LoadingSpinner";

const Portfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackData = {
    projects: [
      {
        title: "Sample Card",
        image:
          "https://projects-static.raspberrypi.org/projects/project-showcase/1306439c8089e53bff8dab3c3537ef207ac16890/en/images/banner.png",
        link: "",
        description: "Lorem ipsum",
      },
    ],
  };

  useEffect(() => {
      const loadingTimeout = setTimeout(() => {
        if (loading) {
          setLoading(false);
          console.log("Loading timeout reached, using fallback data");
        }
      }, 3000);
  
      const getPortfolioData = async () => {
        try {
          const portfolioData = await fetchPortfolio();
          setPortfolio(portfolioData);
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
          clearTimeout(loadingTimeout);
        }
      };

      getPortfolioData();

    // Clean up timeout if component unmounts
    return () => {
      clearTimeout(loadingTimeout);
    };
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  const displayData = portfolio || fallbackData;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Portfolio
      </h2>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayData.projects.map((project: { image: string | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; link: string | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
          <div className="group">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={project.image}
                alt={typeof project.title === 'string' ? project.title : String(project.title || 'Untitled')}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-600 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                <a
                  href={project.link}
                  className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-link"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </a>
              </div>
            </div>
            <h3 className="mt-3 text-lg font-medium text-slate-800 dark:text-white">
              {project.title}
            </h3>
            <p className="text-blue-600">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
