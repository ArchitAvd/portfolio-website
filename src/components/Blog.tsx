import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fetchBlogPosts } from "../services/dataService";
import LoadingSpinner from "./LoadingSpinner";

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackData = {
    blogs: [
      {
        id: 1,
        title: "How to Become a Successful Freelancer",
        category: "Freelancing",
        date: "April 10, 2025",
        image: "/api/placeholder/400/250",
        summary:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        link: "#",
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

    const getBlogsData = async () => {
      try {
        const BlogsData = await fetchBlogPosts();
        setBlogs(BlogsData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
        clearTimeout(loadingTimeout);
      }
    };

    getBlogsData();

    // Clean up timeout if component unmounts
    return () => {
      clearTimeout(loadingTimeout);
    };
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  const displayData = blogs || fallbackData;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Blog
      </h2>

      <div className="space-y-6">
        {displayData.blogs.map(
          (blog: {
            summary: string | undefined;
            date: string | undefined;
            category: string | undefined;
            link: string | undefined;
            id: React.Key | null | undefined;
            image: string | undefined;
            title: string | undefined;
          }) => (
            <div
              key={blog.id}
              className="bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-600 text-sm">
                      {blog.category}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">
                      •
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">
                      {blog.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {blog.summary}
                  </p>
                  <a
                    href={blog.link}
                    className="text-blue-600 font-medium hover:underline inline-flex items-center"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-arrow-right ml-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Blog;
