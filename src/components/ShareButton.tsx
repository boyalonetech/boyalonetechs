// components/ShareButton.tsx
"use client";

import { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";

interface ShareButtonProps {
  url: string;
  title: string;
  text?: string;
  variant?: "primary" | "secondary" | "icon";
  className?: string;
}

export default function ShareButton({
  url,
  title,
  text = "",
  variant = "primary",
  className = "",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const shareData = {
    title: title,
    text: text,
    url: url,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: show custom share options
      setShowShareOptions(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log("Error copying:", error);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(url + "\n\n" + text)}`,
  };

  const buttonClass =
    variant === "primary"
      ? "inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
      : variant === "secondary"
      ? "inline-flex items-center gap-2 px-4 py-2 text-blue-600 font-medium border border-blue-500 rounded-lg cursor-pointer  transition-all duration-200"
      : "p-2 hover:bg-gray-100 rounded-lg transition-colors";

  return (
    <>
      <button
        onClick={handleShare}
        className={`${buttonClass} ${className}`}
        title="Share this project"
      >
        {variant === "icon" ? (
          <Share2 className="w-5 h-5" />
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            Share
          </>
        )}
      </button>

      {/* Share Options Modal */}
      {showShareOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Share Project
              </h3>
              <button
                onClick={() => setShowShareOptions(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-3">
                <span className="text-sm text-gray-600 font-mono truncate mr-2">
                  {url}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {/* Twitter */}
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                title="Share on Twitter"
              >
                <Twitter className="w-6 h-6 mb-2" />
                <span className="text-xs">Twitter</span>
              </a>

              {/* Facebook */}
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-6 h-6 mb-2" />
                <span className="text-xs">Facebook</span>
              </a>

              {/* LinkedIn */}
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-6 h-6 mb-2" />
                <span className="text-xs">LinkedIn</span>
              </a>

              {/* WhatsApp */}
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-6 h-6 mb-2" />
                <span className="text-xs">WhatsApp</span>
              </a>

              {/* Telegram */}
              <a
                href={shareLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                title="Share on Telegram"
              >
                <svg
                  className="w-6 h-6 mb-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .49z" />
                </svg>
                <span className="text-xs">Telegram</span>
              </a>

              {/* Email */}
              <a
                href={shareLinks.email}
                className="flex flex-col items-center justify-center p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                title="Share via Email"
              >
                <Mail className="w-6 h-6 mb-2" />
                <span className="text-xs">Email</span>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-500 text-center">
                Share this project with your network
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
