/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/dataService";
import { DocumentData } from "firebase/firestore";
import LoadingSpinner from "./LoadingSpinner";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setIsMobileMenuOpen }) => {
  const [profile, setProfile] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackData = {
    name: "Name",
    role: "Role",
    avatar: "potrait.jpg",
    socialLinks: [
      { name: "Github", icon: "github", url: "https://www.github.com" },
      {
        name: "Instagram",
        icon: "instagram",
        url: "https://www.instagram.com",
      },
      {
        name: "LinkedIn",
        icon: "linkedin",
        url: "https://www.linkedin.com",
      },
    ],
    contactItems: [
      {
        icon: "work",
        title: "Currently Working In",
        value: "Company Name",
        url: "",
      },
      {
        icon: "mail",
        title: "Email",
        value: "sample@email.com",
        url: "mailto:sample@email.com",
      },
      {
        icon: "calendar",
        title: "Birthday",
        value: "January 1, 1970",
        url: "https://www.onthisday.com/birthdays/date/1970/january",
      },
      {
        icon: "location",
        title: "Location",
        value: "Earth",
        url: "https://www.google.com/maps",
      },
    ],
    cvUrl: "resume.pdf",
  };

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        console.log("Loading timeout reached, using fallback data");
      }
    }, 3000);

    const getProfileData = async () => {
      try {
        const profileData = await fetchProfile();
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
        clearTimeout(loadingTimeout);
      }
    };

    getProfileData();

    // Clean up timeout if component unmounts
    return () => {
      clearTimeout(loadingTimeout);
    };
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  // Use either the fetched profile or fallback data
  const displayData = profile || fallbackData;
  // console.log(displayData);

  // Function to close mobile menu when a link is clicked (for mobile UX)
  const handleMobileLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <aside className="w-full bg-white dark:bg-slate-800 rounded-3xl shadow-md p-6 transition-all duration-300 mb-6 lg:mb-0">
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-end lg:hidden mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-white"
            aria-label="Close menu"
          >
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
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 mb-4">
          <img
            src={displayData.avatar}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
          {displayData.name}
        </h1>
        <p className="text-blue-600 font-medium mb-4">{displayData.role}</p>
        <div className="flex gap-2 mb-6">
          {displayData.socialLinks &&
            displayData.socialLinks.map(
              (
                link: { url: string | undefined; icon: string },
                index: React.Key | null | undefined
              ) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleMobileLinkClick}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`feather feather-${link.icon}`}
                  >
                    {link.icon === "github" && (
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    )}
                    {link.icon === "instagram" && (
                      <>
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </>
                    )}
                    {link.icon === "linkedin" && (
                      <>
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </>
                    )}
                  </svg>
                </a>
              )
            )}
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-6">
        <ul className="space-y-4">
          {displayData.contactItems &&
            displayData.contactItems.map(
              (
                item: {
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
                  url: string | undefined;
                  value:
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
                <li key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-slate-700 flex items-center justify-center text-blue-600">
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
                      className={`feather feather-${item.icon}`}
                    >
                      {item.icon === "mail" && (
                        <>
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </>
                      )}
                      {item.icon === "calendar" && (
                        <>
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </>
                      )}
                      {item.icon === "work" && (
                        <>
                          <rect
                            x="2"
                            y="7"
                            width="20"
                            height="14"
                            rx="2"
                            ry="2"
                          ></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </>
                      )}
                      {item.icon === "location" && (
                        <>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </>
                      )}
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.title}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleMobileLinkClick}
                      className="text-slate-800 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {item.value}
                    </a>
                  </div>
                </li>
              )
            )}
        </ul>
      </div>

      {/* Download CV Button */}
      <div className="mt-8">
        <a
          href={displayData.cvUrl}
          download
          onClick={handleMobileLinkClick}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors"
        >
          Download CV
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
