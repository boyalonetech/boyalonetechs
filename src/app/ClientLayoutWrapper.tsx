"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import NavBar from "@/components/NavBar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 👇 hide in /admin routes
  const hideHeaderAndProfile = pathname?.startsWith("/admin");

  return (
    <>
      {!hideHeaderAndProfile && <Header />}
      {!hideHeaderAndProfile && (
        <div className="fixed top-0 left-0 h-screen w-[350px] z-20 hidden lg:block">
          <Profile />
        </div>
      )}
      {children}
      <NavBar />
    </>
  );
}
