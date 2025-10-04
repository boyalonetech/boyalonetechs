import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";
import { JSX } from "react";
type MediaType =
  | "twitter"
  | "github"
  | "instagram"
  | "youtube"
  | "facebook"
  | "whatsapp";

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
      image: "/bat.png",
      link: "https://x.com/boyalonetechs?s=09",
      media: "twitter",
    },

    {
      name: "Divine Timothy",
      username: "@boyalonetechs",
      image: "/profile2.jpg",
      link: "https://www.instagram.com/boyalonetechs?igsh=OGQ5ZDc2ODk2ZA==",
      media: "instagram",
    },

    {
      name: "Divine Timothy",
      username: "boyalonetech",
      image: "/boyaloneamime.png",
      link: "https://github.com/boyalonetech",
      media: "github",
    },
    {
      name: "Divine Timothy",
      username: "@BoyAloneTechs",
      image: "/divine-blue.jpg",
      link: "https://youtube.com/@boyalonetech?si=QfJTmQzg1dcsd_zP",
      media: "youtube",
    },
    {
      name: "Divine Timothy",
      username: "@boyalonetechs",
      image: "/profile.jpg",
      link: "https://web.facebook.com/boya1one",
      media: "facebook",
    },
    {
      name: "Divine Timothy",
      username: "@Boy Alone Techs",
      image: "/IMG_4895~2.JPG",
      link: "https://t.co/sQIiPQw7py",
      media: "whatsapp",
    },
  ];

  const mediaIcons: Record<MediaType, JSX.Element> = {
    twitter: <FaTwitter className="text-sky-500 text-lg" />,
    instagram: <FaInstagram className="text-pink-500 text-lg" />,
    youtube: <FaYoutube className="text-red-500 text-lg" />,
    facebook: <FaFacebook className="text-blue-600 text-lg" />,
    whatsapp: <FaWhatsapp className="text-green-500 text-lg" />,
    github: <FaGithub className="text-lg" />,
  };

  const buttonColors = {
    twitter: "bg-sky-500 hover:bg-sky-600",
    instagram: "bg-pink-500 hover:bg-pink-600",
    youtube: "bg-red-500 hover:bg-red-600",
    facebook: "bg-blue-600 hover:bg-blue-700",
    whatsapp: "bg-green-500 hover:bg-green-600",
    github: "bg-black/90 hover:bg-black",
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 gap-4 lg:mt-0">
      {socials.map((social, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-blue-400/20 sk to-blue-300/10 backdrop:blur-3xl rounded-xl shadow-md p-4 w-full max-w-md flex items-center justify-between"
        >
          {/* Left: Profile Info */}
          <div className="flex items-center gap-3">
            {/* Profile Image */}
            <Image
              src={social.image}
              width={100}
              height={100}
              alt={social.name}
              loading="lazy"
              className="w-[50px] h-[50px] rounded-full object-cover border border-gray-200"
            />

            {/* Name & Username */}
            <div>
              <h2 className="font-semibold flex items-center gap-2">
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
