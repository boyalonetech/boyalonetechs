import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import { JSX } from "react";

type MediaType = "twitter" | "instagram" | "youtube" | "facebook" | "whatsapp";

export default function NotificationCard() {
  const socials: {
    name: string;
    username: string;
    image: string;
    link: string;
    media: MediaType;
  }[] = [
    {
      name: "Divine Timothy",
      username: "@boyalonetechs",
      image: "/boyaloneamime.png",
      link: "https://twitter.com/boyalonetechs",
      media: "twitter",
    },
    {
      name: "Divine Timothy",
      username: "@divinetech",
      image: "/robinson.jpg",
      link: "https://instagram.com/divinetech",
      media: "instagram",
    },
    {
      name: "Divine Timothy",
      username: "@divinetechYT",
      image: "/akorede.jpg",
      link: "https://youtube.com/@divinetechYT",
      media: "youtube",
    },
    {
      name: "Divine Timothy",
      username: "@divinetechFB",
      image: "/facebook.jpg",
      link: "https://facebook.com/divinetech",
      media: "facebook",
    },
    {
      name: "Divine Timothy",
      username: "@divinetechWA",
      image: "/whatsapp.jpg",
      link: "https://wa.me/2348012345678",
      media: "whatsapp",
    },
  ];

  const mediaIcons: Record<MediaType, JSX.Element> = {
    twitter: <FaTwitter className="text-sky-500 text-lg" />,
    instagram: <FaInstagram className="text-pink-500 text-lg" />,
    youtube: <FaYoutube className="text-red-500 text-lg" />,
    facebook: <FaFacebook className="text-blue-600 text-lg" />,
    whatsapp: <FaWhatsapp className="text-green-500 text-lg" />,
  };

  const buttonColors = {
    twitter: "bg-sky-500 hover:bg-sky-600",
    instagram: "bg-pink-500 hover:bg-pink-600",
    youtube: "bg-red-500 hover:bg-red-600",
    facebook: "bg-blue-600 hover:bg-blue-700",
    whatsapp: "bg-green-500 hover:bg-green-600",
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-6 gap-4">
      {socials.map((social, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-4 w-full max-w-md flex items-center justify-between"
        >
          {/* Left: Profile Info */}
          <div className="flex items-center gap-3">
            {/* Profile Image */}
            <Image
              src={social.image}
              width={50}
              height={50}
              alt={social.name}
              className="rounded-full border border-gray-200"
            />

            {/* Name & Username */}
            <div>
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                {mediaIcons[social.media]}
                {social.name}
              </h2>
              <p className="text-sm text-gray-500">{social.username}</p>
            </div>
          </div>

          {/* Right: Follow Button */}
          <Link
            href={social.link}
            target="_blank"
            className={`px-4 py-2 text-white rounded-full text-sm font-medium shadow-md transition-all duration-200 ${
              buttonColors[social.media]
            }`}
          >
            Follow
          </Link>
        </div>
      ))}
    </div>
  );
}