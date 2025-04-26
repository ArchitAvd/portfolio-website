/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchServices } from "../services/dataService";
import LoadingSpinner from "./LoadingSpinner";
import { DocumentData } from "firebase/firestore";

const About: React.FC = () => {
  const [service, setServices] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackData = {
    aboutMe: "",
    jobDescription: "",
    whatImDoing: [
      {
        icon: "code",
        title: "Test",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel justo dapibus, pulvinar erat eget, sagittis turpis. Nunc est est, viverra eu rhoncus euismod, egestas porttitor metus. ",
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

    const getServiceData = async () => {
      try {
        const serviceData = await fetchServices();
        setServices(serviceData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
        clearTimeout(loadingTimeout);
      }
    };

    getServiceData();

    // Clean up timeout if component unmounts
    return () => {
      clearTimeout(loadingTimeout);
    };
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  const displayData = service || fallbackData;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        About Me
      </h2>

      <div className="space-y-6">
        <p className="text-slate-600 dark:text-slate-300">
          {displayData.aboutMe}
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          {displayData.jobDescription}
        </p>
      </div>

      <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-6">
        What I'm Doing
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayData.whatImDoing.map(
          (
            service: {
              icon: string;
              title:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              description:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <div
              key={index}
              className="p-6 bg-slate-50 dark:bg-slate-700 rounded-lg flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`feather feather-${service.icon}`}
                >
                  {service.icon === "code" && (
                    <>
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </>
                  )}
                  {service.icon === "chip" && (
                    <>
                      <rect
                        x="4"
                        y="4"
                        width="16"
                        height="16"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M9 9h6v6H9z"></path>
                      <path d="M9 1v2"></path>
                      <path d="M15 1v2"></path>
                      <path d="M9 21v2"></path>
                      <path d="M15 21v2"></path>
                      <path d="M1 9h2"></path>
                      <path d="M1 15h2"></path>
                      <path d="M21 9h2"></path>
                      <path d="M21 15h2"></path>
                    </>
                  )}

                  {service.icon === "phone" && (
                    <>
                      <rect
                        x="5"
                        y="2"
                        width="14"
                        height="20"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </>
                  )}
                  {service.icon === "database" && (
                    <>
                      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    </>
                  )}
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium text-slate-800 dark:text-white mb-1">
                  {service.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default About;
