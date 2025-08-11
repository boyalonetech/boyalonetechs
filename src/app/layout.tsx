import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boy Alone Tech | Top Software & Web Developer in Nigeria",
  description:
    "Hire a Passionate, Skilled, and Experienced Software & Web Developer. Get high-quality websites, apps, and software solutions tailored to your needs.",
  keywords: [
    "Software Engineer",
    "Web Developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "Nigeria Developer",
    "Hire Developer",
    "Best Developer in Nigeria",
    "Boy Alone Tech",
    "Website Developer",
    "Fullstack Developer",
    "Software Developer",
    "App Developer",
    "Flutter Developer",
  ],
  authors: [
    {
      name: "Boy Alone Tech",
      url: "https://boyalonetech.netlify.app",
    },
  ],
  creator: "Boy Alone Tech",
  publisher: "Boy Alone Tech",
  metadataBase: new URL("https://boyalonetech.netlify.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boyalonetech.netlify.app/skilled-software-engineers",
    siteName: "Boy Alone Tech",
    title: "Top Software & Web Developer | Boy Alone Tech",
    description:
      "Discover top-tier, skilled and experienced software and web development services. Hire the best developer for your projects.",
    images: [
      {
        url: "/logo.png", // ensure this image exists and is optimized
        width: 1200,
        height: 630,
        alt: "Boy Alone Tech - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@boyalonetechs", // optional: your Twitter handle
    title: "Top Web Developer - Boy Alone Tech",
    description:
      "Skilled in web & software development. Get top-quality work from an experienced software engineer in Nigeria.",
    images: ["https://boyalonetech.netlify.app/assets/images/seo-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
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
        {/* ✅ Viewport for Responsive Design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#3B82F6" />

        {/* ✅ Favicon */}
        <link rel="icon" href="/logo.png" />

        {/* ✅ Canonical Link */}
        <link
          rel="canonical"
          href="https://boyalonetech.netlify.app/skilled-software-engineer"
        />

        {/* ✅ FontAwesome for Icons (Optional) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* ✅ JSON-LD Structured Data (Person + Website Schema) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Boy Alone Tech",
              url: "https://boyalonetech.netlify.app",
              jobTitle: "Web Developer",
              worksFor: {
                "@type": "Organization",
                name: "Boy Alone Tech",
              },
              sameAs: [
                "https://github.com/boyalonetech",
                "https://twitter.com/boyalonetechs",
              ],
              description:
                "Skilled Software and Web Developer. Hire for quality, experience, and performance.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Boy Alone Tech",
              url: "https://boyalonetech.netlify.app",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://boyalonetech.netlify.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body className={`${inter.className} antialiased`}>
        <Header />
        <div className="fixed top-0 left-0 h-screen w-[300px] z-20 hidden lg:block">
          {/* <Profile /> */}
          <Profile />
        </div>
        {children}
        <NavBar />
      </body>
    </html>
  );
}
