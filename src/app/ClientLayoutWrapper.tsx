"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import NavBar from "@/components/NavBar";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AIChat from "@/components/Ai";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
  }, []);

  // 👇 Common 404 page paths in Next.js
  const is404Page =
    pathname === "/404" ||
    pathname === "/_not-found" ||
    pathname === "/404.html" ||
    pathname?.startsWith("/404/") ||
    pathname?.startsWith("/not-found") ||
    pathname?.startsWith("/404/") || // For nested 404 pages if any
    false;

  // 👇 hide in /admin routes, /chat routes, and 404 pages
  const hideHeaderAndProfile =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/chat") ||
    is404Page;

  return (
    <>
      {!hideHeaderAndProfile && <Header />}
      {!hideHeaderAndProfile && (
        <div className="fixed top-0 h-screen w-[350px] z-20 hidden lg:block">
          <Profile />
        </div>
      )}
      {/* Add Toaster here */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 4000,
          },
        }}
      />
      {children}
      {!hideHeaderAndProfile && <AIChat />}
      {!hideHeaderAndProfile && <NavBar />}
    </>
  );
}
