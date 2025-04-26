/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { fetchResume } from "../services/dataService";

const Resume: React.FC = () => {
  const [resume, setResume] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackData = {
    education: [
      {
        date: "1914 — 1918",
        title: "World War 1",
        institution:
          "Allied Powers (including Britain, France, Russia, and the United States) against the Central Powers (primarily Germany, Austria-Hungary, and the Ottoman Empire)",
      },
      {
        date: "1939 — 1945",
        title: "World War 2",
        institution:
          "Allied powers (United Kingdom, France, the Soviet Union, and later the United States and China) against the Axis powers (Germany, Italy, and Japan)",
      },
    ],
    experience: [
      {
        date: "1945 — Present",
        title: "International Organization",
        company: "United Nations (UN)",
        description: [
          "Maintaining international peace and security, developing friendly relations among nations",
          "Promoting social progress and human rights",
        ],
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

    const getResumeData = async () => {
      try {
        const resumeData = await fetchResume();
        setResume(resumeData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
        clearTimeout(loadingTimeout);
      }
    };

    getResumeData();

    // Clean up timeout if component unmounts
    return () => {
      clearTimeout(loadingTimeout);
    };
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  const displayData = resume || fallbackData;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Resume
      </h2>

      <div className="space-y-10">
        {/* Experience */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
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
              className="feather feather-briefcase mr-2 text-blue-600"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Experience
          </h3>

          <div className="space-y-6">
            {displayData.experience.map(
              (
                item: {
                  date:
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
                  company:
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
                  description: any[];
                },
                index: React.Key | null | undefined
              ) => (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6"
                >
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-sm font-medium mb-3">
                    {item.date}
                  </span>
                  <h4 className="text-lg font-medium text-slate-800 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-blue-600 mb-3">{item.company}</p>
                  {/* Changed to render bullet points */}
                  <ul className="list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-1">
                    {item.description.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
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
              className="feather feather-book mr-2 text-blue-600"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Education
          </h3>

          <div className="space-y-6">
            {displayData.education.map(
              (
                item: {
                  date:
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
                  institution:
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
                  className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6"
                >
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-sm font-medium mb-3">
                    {item.date}
                  </span>
                  <h4 className="text-lg font-medium text-slate-800 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-blue-600 mb-3">{item.institution}</p>
                  {/* <p className="text-slate-600 dark:text-slate-300">
                  {item.description}
                </p> */}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
