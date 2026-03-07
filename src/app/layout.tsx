import type { Metadata } from "next";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "Boy Alone Techs | Software Developer",
  description:
    "Software Developer crafting custom websites, apps, and digital solutions tailored to your unique business needs. Freelance developer ready to bring your ideas to life.",
  keywords: [
    "Software Engineer",
    "Web Developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "React Native Developer",
    "Nigeria Developer",
    "Hire Developer",
    "Best Developer in Nigeria",
    "Boy Alone Techs",
    "Website Developer",
    "Fullstack Developer",
    "Software Developer",
    "App Developer",
    "Skilled Developer",
    "Video Editor",
    "Flutter Developer",
    "Software Company In Aba",
  ],
  authors: [
    { name: "Boy Alone Techs", url: "https://boyalonetechs.onrender.com" },
  ],
  creator: "Boy Alone Techs",
  publisher: "Boy Alone Techs",
  metadataBase: new URL("https://boyalonetechs.onrender.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boyalonetechs.onrender.com",
    siteName: "Boy Alone Techs",
    title: "Software Developer | Boy Alone Techs",
    description:
      "Top-tier, skilled and experienced software and web development services. Hire the best developer for your projects.",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 650,
        alt: "Boy Alone Tech - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@boyalonetechs",
    title: "Web Developer - Boy Alone Techs",
    description:
      "Software Developer creating personalized websites, applications, and digital solutions. Freelance developer focused on clean code and solving your business challenges.",
    images: ["https://boyalonetechs.onrender.com/assets/images/seo-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: { index: true, follow: true, noimageindex: false },
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="rG9oc6Y-Vm1-BTQCZOnHjRvyMX796m1yq5M7UD88UEo"
        />
      </head>
      <body className="antialiased overflow-x-hidden nocopy max-w-[1350px] mx-auto">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
