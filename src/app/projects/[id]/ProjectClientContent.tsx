// app/projects/[id]/ProjectClientContent.tsx
"use client";

import { useState, useEffect } from "react";
import ShareButton from "@/components/ShareButton";
import LikeButton from "@/components/LikeButton";
import {
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

interface ProjectClientContentProps {
  project: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    demo_link: string;
    pinned: boolean;
    like_count: number;
    created_at: string;
    technologies?: string;
  };
}

// Define proper types for toast
interface ToastProps {
  visible: boolean;
  id: string;
}

// Custom Toast Components with proper typing
const CustomToast = {
  success: (message: string) => {
    toast.custom(
      (t: ToastProps) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-blue-50 border-l-4 border-blue-500 shadow-xl rounded-lg pointer-events-auto flex items-start p-4`}
        >
          <div className="flex items-start gap-3 flex-1">
            <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-blue-800 mb-1">Success</div>
              <div className="text-sm text-gray-600">{message}</div>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ),
      { duration: 3000, position: "top-right" }
    );
  },

  error: (message: string) => {
    toast.custom(
      (t: ToastProps) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-red-50 border-l-4 border-red-500 shadow-xl rounded-lg pointer-events-auto flex items-start p-4`}
        >
          <div className="flex items-start gap-3 flex-1">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-red-800 mb-1">Error</div>
              <div className="text-sm text-gray-600">{message}</div>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ),
      { duration: 4000, position: "top-right" }
    );
  },

  info: (message: string) => {
    toast.custom(
      (t: ToastProps) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-blue-50 border-l-4 border-blue-500 shadow-xl rounded-lg pointer-events-auto flex items-start p-4`}
        >
          <div className="flex items-start gap-3 flex-1">
            <Info className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-blue-800 mb-1">Info</div>
              <div className="text-sm text-gray-600">{message}</div>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ),
      { duration: 3000, position: "top-right" }
    );
  },

  withAction: (
    message: string,
    actionText: string,
    onAction: () => void,
    type: "success" | "info" = "info"
  ) => {
    const bgColor = type === "success" ? "bg-blue-50" : "bg-blue-50";
    const borderColor =
      type === "success" ? "border-blue-500" : "border-blue-500";
    const textColor = type === "success" ? "text-blue-800" : "text-blue-800";
    const iconColor = type === "success" ? "text-blue-500" : "text-blue-500";
    const buttonColor =
      type === "success"
        ? "text-blue-600 hover:text-blue-700"
        : "text-blue-600 hover:text-blue-700";

    const Icon = type === "success" ? CheckCircle : Info;

    toast.custom(
      (t: ToastProps) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full ${bgColor} border-l-4 ${borderColor} shadow-xl rounded-lg pointer-events-auto flex items-start p-4`}
        >
          <div className="flex items-start gap-3 flex-1">
            <Icon className={`w-6 h-6 ${iconColor} flex-shrink-0`} />
            <div className="flex-1">
              <div className={`font-semibold ${textColor} mb-1`}>
                {type === "success" ? "Success" : "Info"}
              </div>
              <div className="text-sm text-gray-600 mb-2">{message}</div>
              <button
                onClick={() => {
                  onAction();
                  toast.dismiss(t.id);
                }}
                className={`text-sm font-semibold ${buttonColor} hover:underline`}
              >
                {actionText}
              </button>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-gray-600 ml-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ),
      { duration: 5000, position: "top-right" }
    );
  },
};

export default function ProjectClientContent({
  project,
}: ProjectClientContentProps) {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [shareText, setShareText] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      const text = `Check out "${
        project.title
      }" - ${project.description.substring(0, 100)}${
        project.description.length > 100 ? "..." : ""
      }`;

      setShareText(text);
    }
  }, [project]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);

      // Show custom success toast
      CustomToast.success("Link copied to clipboard successfully!");
    } catch (error) {
      console.error("Failed to copy:", error);

      // Show custom error toast
      CustomToast.error("Failed to copy link. Please try again.");
    }
  };

  // Handle social share with toast notification
  const handleSocialShare = (platform: string) => {
    CustomToast.info(
      `Opening ${platform}... Share this project with your network!`
    );
  };

  // Generate social media share links
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${project.title} - ${currentUrl}`
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(project.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      currentUrl
    )}&title=${encodeURIComponent(project.title)}`,
  };

  return (
    <>
      {/* Add custom animation styles */}
      <style jsx global>{`
        @keyframes enter {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes leave {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
        .animate-enter {
          animation: enter 0.3s ease-out;
        }
        .animate-leave {
          animation: leave 0.2s ease-in;
        }
      `}</style>

      <div className="lg:w-[72vw]">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to Projects
          </Link>
        </div>

        {/* Project Image */}
        <div className="w-full overflow-hidden rounded-2xl shadow-xl relative">
          <Image
            width={1200}
            height={600}
            quality={100}
            src={project.image_url || "/placeholder-project.jpg"}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover aspect-video"
          />

          {/* Image overlay with share and like buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <LikeButton projectId={project.id} projectTitle={project.title} />
            <ShareButton
              url={currentUrl}
              title={project.title}
              text={shareText}
            />
          </div>
        </div>

        {/* Project Header with Metadata */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-xl lg:text-2xl xl:text-4xl font-bold text-blue-500">
                {project.title}
              </h1>

              {/* Badges */}
              <div className="flex items-center gap-2">
                {project.pinned && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                    Pinned
                  </span>
                )}
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  {project.like_count || 0} likes
                </span>
              </div>
            </div>

            {/* Project Meta */}
            <div className="flex items-center gap-4 text-gray-500 text-sm mt-4">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                {new Date(project.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={project.demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() =>
                CustomToast.info("Opening live demo in new tab...")
              }
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </Link>

            <ShareButton
              url={currentUrl}
              title={project.title}
              text={shareText}
              variant="secondary"
            />
          </div>
        </div>

        {/* Project Description */}
        <div className="mt-8  rounded-xl md:sk p-1 lg:shadow-md lg:p-6">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">
            Description
          </h2>
          <div className="prose max-w-none">
            <p className="leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-8 bg-gradient-to-r sk rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-500 mb-2">
                Share this project
              </h3>
              <p className="text-gray-600">
                Help spread the word about this project by sharing it with your
                network.
              </p>
              <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                <span className="font-mono break-all">
                  {currentUrl || "Loading..."}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              {/* Share via WhatsApp */}
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors group relative"
                title="Share on WhatsApp"
                onClick={() => handleSocialShare("WhatsApp")}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.158 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.89-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                </svg>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  WhatsApp
                </span>
              </a>

              {/* Share via Twitter/X */}
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors group relative"
                title="Share on Twitter"
                onClick={() => handleSocialShare("Twitter")}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Twitter
                </span>
              </a>

              {/* Share via Facebook */}
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group relative"
                title="Share on Facebook"
                onClick={() => handleSocialShare("Facebook")}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Facebook
                </span>
              </a>

              {/* Share via LinkedIn */}
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors group relative"
                title="Share on LinkedIn"
                onClick={() => handleSocialShare("LinkedIn")}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  LinkedIn
                </span>
              </a>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors group relative"
                title="Copy link to clipboard"
              >
                <Copy className="w-6 h-6" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Copy link
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Technologies/Tags Section (Optional) */}
        {project.technologies && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-blue-500 mb-4">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {JSON.parse(project.technologies).map(
                (tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {/* Related Projects (Optional) */}
      </div>
    </>
  );
}
