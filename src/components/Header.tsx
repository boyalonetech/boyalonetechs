"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");

  useEffect(() => {
    if (theme === "auto") {
      const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");
      document.documentElement.classList.toggle("dark", darkMedia.matches);

      const listener = (e: MediaQueryListEvent) =>
        document.documentElement.classList.toggle("dark", e.matches);
      darkMedia.addEventListener("change", listener);

      return () => darkMedia.removeEventListener("change", listener);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return (
    <header
      className={`fixed left-0 right-0 z-50 pt-1  items-center h-16 shadow-xl backdrop-blur-lg   transition-all duration-500 ${
        visible
          ? "top-0 rounded-none mx-0"
          : " h-17 py-1 rounded-2xl shadow-lg lg:mx-10  mx-5 top-4 bod"
      }`}
    >
      <div className="max-w-7xl mx-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center ">
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 overflow-hidden h-14 lg:-translate-x-8">
          <Image
            src="/bat-bg.png"
            alt="Logo"
            width={100}
            height={100}
            quality={100}
            className="rounded-full transform scale-[1.5]   transition-all duration-500 ease-out"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-gray-700 font-medium">
          {[
            {
              href: "/",
              label: "Home",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272h16v176c0 35.3 28.7 64 64 64h288c35.3 0 64-28.7 64-64V272h16c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1zM240 320h32c26.5 0 48 21.5 48 48v96H192v-96c0-26.5 21.5-48 48-48"
                  />
                </svg>
              ),
            },
            {
              href: "#skills",
              label: "Skills",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M14.057 31.88c-2.854-.37-5.792-1.594-7.932-3.307C1.307 24.729-.88 18.656.37 12.625c.536-2.604 1.932-5.344 3.719-7.318a15.6 15.6 0 0 1 4.677-3.583C11.12.531 13.37-.005 16.026-.005c1.906 0 3.438.25 5.193.849a16.01 16.01 0 0 1 9.948 9.943c.938 2.75 1.109 5.677.51 8.578c-.479 2.292-1.714 4.87-3.234 6.734c-.625.771-2.063 2.146-2.818 2.703a16.2 16.2 0 0 1-7.708 3.078c-.823.104-3.063.099-3.859 0zm4.36-1.338a14.9 14.9 0 0 0 9.672-6.047c2.703-3.797 3.427-8.891 1.901-13.333c-.359-1.042-1.25-2.781-1.901-3.698c-.724-1.026-2.516-2.823-3.547-3.547c-1-.708-2.703-1.568-3.865-1.948A14.75 14.75 0 0 0 8.01 3.584a15.3 15.3 0 0 0-4.385 4.385A14.74 14.74 0 0 0 2.01 20.63c.385 1.161 1.245 2.87 1.948 3.87c.729 1.026 2.521 2.823 3.547 3.547c.922.646 2.656 1.536 3.698 1.901a14.9 14.9 0 0 0 7.214.594m-5.542-5.365a5.6 5.6 0 0 1-2.109-.771c-.578-.37-4.943-4.646-5.156-5.047c-.245-.458.182-1.292.792-1.547l.286-.12l-.88-.896c-.484-.495-.943-1.021-1.016-1.167c-.172-.333-.177-1.047-.016-1.365c.068-.13.229-.328.354-.438c.214-.177.234-.24.214-.688c-.026-.396.01-.552.182-.849c.25-.427.766-.714 1.271-.719c.281 0 .354-.036.474-.245c.313-.547 1.208-.745 1.891-.411l.37.177l.182-.177c.25-.229.75-.432 1.078-.432c.656 0 1.583.755 1.583 1.286c0 .635-.578.745-1.151.219c-.38-.354-.573-.391-.729-.141c-.078.12.109.344 1.229 1.474c1.12 1.125 1.323 1.365 1.323 1.578a.656.656 0 0 1-.63.62c-.203 0-.536-.292-2.073-1.823c-1.568-1.563-1.854-1.813-1.979-1.734c-.339.214-.224.37 1.609 2.208c.995 1 1.813 1.885 1.813 1.969c0 .172-.156.49-.286.573a.76.76 0 0 1-.339.063c-.214.005-.542-.292-2.286-2.031c-1.75-1.74-2.063-2.021-2.188-1.943c-.344.219-.229.37 1.766 2.375c1.089 1.089 2 2.063 2.026 2.167c.057.188-.068.516-.234.63a.8.8 0 0 1-.349.063c-.214 0-.484-.234-1.927-1.677c-1.391-1.391-1.714-1.677-1.891-1.661c-.5.057-.323.281 2.26 2.87c2.24 2.245 2.526 2.563 2.526 2.797a.51.51 0 0 1-.224.438c-.401.318-.557.245-1.568-.734c-.516-.495-1.047-.974-1.188-1.063c-.255-.156-.901-.224-1.021-.099c-.042.036.911 1.042 2.115 2.234c2.005 1.984 2.234 2.188 2.823 2.469a3.94 3.94 0 0 0 3.495.01c1.682-.802 2.615-2.75 2.156-4.516c-.229-.88-.516-1.302-1.672-2.495c-1.333-1.365-1.641-1.74-1.969-2.396c-.365-.734-.521-1.448-.521-2.339c0-.964.099-1.401.526-2.302c.406-.859 1.255-1.76 2.094-2.224c1.646-.917 3.813-.839 5.385.188c.313.203 1.443 1.266 2.849 2.677c2.089 2.094 2.328 2.365 2.328 2.604c0 .568-.464 1.198-.979 1.328c-.193.052-.156.104.719.995c.51.516.984 1.073 1.057 1.245c.245.589.135 1.161-.313 1.63c-.229.24-.26.323-.266.802c-.005.422-.052.599-.219.839a1.48 1.48 0 0 1-1.188.651c-.323 0-.385.031-.547.276c-.365.563-1.313.76-1.927.396l-.307-.182l-.219.214c-.484.464-1.266.526-1.859.146c-.479-.302-.833-.724-.833-.99c0-.234.339-.62.547-.62c.198 0 .464.156.766.438c.302.286.563.286.604-.005c.021-.156-.229-.453-1.24-1.469c-1.063-1.073-1.266-1.318-1.266-1.526a.85.85 0 0 1 .063-.339c.115-.172.438-.292.635-.24c.104.026.984.839 1.948 1.802c.969.969 1.818 1.76 1.896 1.76c.214 0 .354-.214.255-.396c-.047-.083-.865-.922-1.813-1.87c-1.484-1.479-1.724-1.755-1.724-1.974a.8.8 0 0 1 .063-.344c.089-.13.401-.286.578-.286c.078 0 1.057.911 2.177 2.026c2.052 2.042 2.203 2.156 2.417 1.818c.078-.125-.203-.443-1.943-2.188c-1.797-1.802-2.036-2.073-2.036-2.307c0-.161.073-.328.188-.432c.38-.359.495-.286 2.344 1.552c1.75 1.745 1.906 1.859 2.12 1.526c.078-.125-.276-.51-2.448-2.688c-2.365-2.375-2.536-2.568-2.536-2.844c0-.417.24-.615.703-.583c.083.005.583.427 1.099.932c.521.505 1.083.979 1.25 1.052c.328.135.708.156.87.052c.156-.099-4.167-4.354-4.729-4.651a4.013 4.013 0 0 0-5.547 1.844c-.271.578-.307.75-.344 1.495c-.031.703-.005.922.146 1.37c.271.797.505 1.125 1.719 2.365c1.313 1.344 1.563 1.651 1.896 2.37c.938 2 .542 4.313-1.005 5.854c-1.177 1.182-2.781 1.734-4.37 1.516z"
                  ></path>
                </svg>
              ),
            },
            {
              href: "#projects",
              label: "Projects",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M22 13.478V18a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-4.522l.553.277a21 21 0 0 0 18.897-.002zM14 2a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v2.242l-1.447.724a19 19 0 0 1-16.726.186l-.647-.32l-1.18-.59V9a3 3 0 0 1 3-3h2V5a3 3 0 0 1 3-3zm-2 8a1 1 0 0 0-1 1a1 1 0 1 0 2 .01c0-.562-.448-1.01-1-1.01m2-6h-4a1 1 0 0 0-1 1v1h6V5a1 1 0 0 0-1-1"
                  />
                </svg>
              ),
            },
            {
              href: "#services",
              label: "Services",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={28}
                  height={28}
                  viewBox="0 0 32 32"
                >
                  <defs>
                    <radialGradient
                      id="SVGAdMt6cly"
                      cx={20.365}
                      cy={6.269}
                      r={2.721}
                      gradientTransform="matrix(-.148 .989 1.059 .158 11.812 -5.692)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset={0} stopColor="#bedcdc"></stop>
                      <stop
                        offset={0.5}
                        stopColor="#8e9e9e"
                        stopOpacity={0.74}
                      ></stop>
                      <stop
                        offset={1}
                        stopColor="#404f5c"
                        stopOpacity={0.84}
                      ></stop>
                    </radialGradient>
                    <radialGradient
                      id="SVGbTKVFdeu"
                      cx={6.566}
                      cy={14.644}
                      r={3.9}
                      gradientTransform="matrix(-.148 .989 1.059 .158 9.451 15.181)"
                      href="#SVGAdMt6cly"
                    ></radialGradient>
                  </defs>
                  <path
                    fill="#3B82F6"
                    d="M27.5 5.5h-9.3l-2.1 4.2H4.4v16.8h25.2v-21Zm0 4.2h-8.2l1.1-2.1h7.1Z"
                  ></path>
                  <path
                    fill="#c0c0c0"
                    d="m13.886 12.006l-1.803 1.803l-.901-1.803l.901-.901zm2.886-.094h-2.551L14.859 10h1.274zm2.105 1.974l-1.803-1.803l1.803-.901l.902.901zm.094 2.886v-2.551l1.912.638v1.274zm-1.974 2.105l1.803-1.803l.901 1.803l-.901.902zm-2.885.094h2.55l-.637 1.912H14.75zm-2.106-1.974l1.803 1.803l-1.803.901l-.901-.901zm-.094-2.885v2.55L10 16.025V14.75z"
                  ></path>
                  <path
                    fill="#c0c0c0"
                    d="M11.663 15.442a3.778 3.778 0 1 1 1.107 2.672a3.78 3.78 0 0 1-1.107-2.672m3.779 1.425a1.425 1.425 0 1 0-1.008-.418a1.43 1.43 0 0 0 1.008.418"
                  ></path>
                  <path
                    fill="#a9a9a9"
                    d="M15.5 18.939a3.5 3.5 0 1 0-3.555-3.439a3.5 3.5 0 0 0 3.555 3.439m-.113-6.457a2.96 2.96 0 1 1-2.907 3.012a2.96 2.96 0 0 1 2.91-3.012Z"
                  ></path>
                  <path
                    fill="url(#SVGAdMt6cly)"
                    d="M15.489 18.162a2.721 2.721 0 1 0-2.767-2.673a2.72 2.72 0 0 0 2.767 2.673m-.075-4.275a1.555 1.555 0 1 1-1.528 1.583a1.555 1.555 0 0 1 1.528-1.583"
                  ></path>
                  <path
                    fill="#a9a9a9"
                    d="M15.47 17a1.555 1.555 0 1 0-1.583-1.526A1.555 1.555 0 0 0 15.47 17m-.051-2.87a1.316 1.316 0 1 1-1.292 1.339a1.316 1.316 0 0 1 1.292-1.337Z"
                  ></path>
                  <path
                    fill="#c0c0c0"
                    d="m27.572 19.763l-1.706-.947l1.098-1.176l1.024.568zm1.636 2.356l-1.005-1.672l1.539-.47l.603 1.004zm.238 2.859l-.034-1.951l1.568.363l.02 1.17zm-1.223 2.594l.946-1.706l1.176 1.098l-.567 1.024zm-2.357 1.636l1.673-1.005l.469 1.539l-1.003.603zm-2.859.238l1.952-.034l-.363 1.568l-1.171.02zm-2.594-1.223l1.706.946l-1.098 1.176l-1.024-.567zm-1.636-2.357l1.005 1.673l-1.539.469l-.603-1.003zm-.238-2.859l.034 1.952l-1.567-.363l-.021-1.171zm1.224-2.594l-.947 1.706l-1.176-1.098l.568-1.024zm2.356-1.636l-1.672 1.005l-.47-1.539l1.004-.603zm2.859-.238l-1.951.034l.363-1.567l1.17-.021z"
                  ></path>
                  <path
                    fill="#c0c0c0"
                    d="M23.9 18.372a5.626 5.626 0 1 1-3.946 1.716a5.63 5.63 0 0 1 3.946-1.716m-2.017 5.658a2.112 2.112 0 1 0 .592-1.5a2.1 2.1 0 0 0-.592 1.5"
                  ></path>
                  <path
                    fill="#a9a9a9"
                    d="M24.081 29.045a5.053 5.053 0 1 0-5.14-4.964a5.054 5.054 0 0 0 5.14 4.964m-.163-9.327a4.275 4.275 0 1 1-4.2 4.35a4.275 4.275 0 0 1 4.2-4.35"
                  ></path>
                  <path
                    fill="url(#SVGbTKVFdeu)"
                    d="M24.061 27.893a3.9 3.9 0 1 0-3.967-3.832a3.9 3.9 0 0 0 3.967 3.832m-.105-6.027a2.128 2.128 0 1 1-2.09 2.164a2.127 2.127 0 0 1 2.089-2.164Z"
                  ></path>
                  <path
                    fill="#a9a9a9"
                    d="M24.033 26.324a2.331 2.331 0 1 0-2.372-2.291a2.33 2.33 0 0 0 2.372 2.291m-.075-4.3a1.973 1.973 0 1 1-1.938 2.007a1.97 1.97 0 0 1 1.938-2.007"
                  ></path>
                </svg>
              ),
            },
            {
              href: "#about",
              label: "About",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
                    clipRule="evenodd"
                  />
                </svg>
              ),
            },
          ].map(({ href, label, svg }, idx) => (
            <Link
              key={idx}
              href={href}
              className="group flex flex-row  items-center text-sm text-blue-500"
            >
              <span className="transform transition-all duration-300">
                {svg}
              </span>
            </Link>
          ))}
          {/* Menu icon */}
          <span
            className="menu relative cursor-pointer hidden lg:block"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {/* Theme Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              viewBox="0 0 14 14"
            >
              <path
                fill="#3B82F6"
                fillRule="evenodd"
                d="M10.73.123a.5.5 0 0 1 .379.179l.156.186c1.08 1.29 1.902 2.273 2.576 3.586c.512.999-.288 2.049-1.308 2.049H8.884c-1.005 0-1.807-1.024-1.316-2.021c.687-1.397 1.57-2.415 2.78-3.807a.5.5 0 0 1 .382-.172M8.21 7.496a.625.625 0 0 0 0 1.25h5a.625.625 0 0 0 0-1.25zm0 5a.625.625 0 1 0 0 1.25h5a.625.625 0 0 0 0-1.25zm-.624-1.875c0-.345.28-.625.625-.625h4.998a.625.625 0 0 1 0 1.25H8.211a.625.625 0 0 1-.625-.625M1.717.233c.48-.055 1-.11 1.538-.11c.537 0 1.057.055 1.537.11c.71.082 1.278.648 1.357 1.361c.053.479.105.995.105 1.529s-.052 1.05-.105 1.528a1.55 1.55 0 0 1-1.357 1.36c-.48.056-1 .112-1.537.112a13 13 0 0 1-1.538-.111A1.55 1.55 0 0 1 .36 4.65C.307 4.172.255 3.656.255 3.123s.052-1.05.105-1.529A1.55 1.55 0 0 1 1.717.234m4.789 10.39c0 2.083-1.171 3.254-3.253 3.254S0 12.706 0 10.623C0 8.542 1.171 7.37 3.253 7.37s3.253 1.171 3.253 3.254"
                clipRule="evenodd"
              ></path>
            </svg>

            {/* Pop-up Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-15 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black/10 p-3">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 ${
                    theme === "light" ? "font-bold" : ""
                  }`}
                >
                  ☀ Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 ${
                    theme === "dark" ? "font-bold" : ""
                  }`}
                >
                  🌙 Night
                </button>
                <button
                  onClick={() => setTheme("auto")}
                  className={`flex items-center gap-2 px-3 py-2 text-sm w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 ${
                    theme === "auto" ? "font-bold" : ""
                  }`}
                >
                  ⚙ Automatic
                </button>
              </div>
            )}
          </span>
        </nav>
        {/* Menu icon */}
        <span
          className="menu relative cursor-pointer lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {/* Theme Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 14 14"
          >
            <path
              fill="#3B82F6"
              fillRule="evenodd"
              d="M10.73.123a.5.5 0 0 1 .379.179l.156.186c1.08 1.29 1.902 2.273 2.576 3.586c.512.999-.288 2.049-1.308 2.049H8.884c-1.005 0-1.807-1.024-1.316-2.021c.687-1.397 1.57-2.415 2.78-3.807a.5.5 0 0 1 .382-.172M8.21 7.496a.625.625 0 0 0 0 1.25h5a.625.625 0 0 0 0-1.25zm0 5a.625.625 0 1 0 0 1.25h5a.625.625 0 0 0 0-1.25zm-.624-1.875c0-.345.28-.625.625-.625h4.998a.625.625 0 0 1 0 1.25H8.211a.625.625 0 0 1-.625-.625M1.717.233c.48-.055 1-.11 1.538-.11c.537 0 1.057.055 1.537.11c.71.082 1.278.648 1.357 1.361c.053.479.105.995.105 1.529s-.052 1.05-.105 1.528a1.55 1.55 0 0 1-1.357 1.36c-.48.056-1 .112-1.537.112a13 13 0 0 1-1.538-.111A1.55 1.55 0 0 1 .36 4.65C.307 4.172.255 3.656.255 3.123s.052-1.05.105-1.529A1.55 1.55 0 0 1 1.717.234m4.789 10.39c0 2.083-1.171 3.254-3.253 3.254S0 12.706 0 10.623C0 8.542 1.171 7.37 3.253 7.37s3.253 1.171 3.253 3.254"
              clipRule="evenodd"
            ></path>
          </svg>

          {/* Pop-up Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-15 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black/10 p-3">
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 px-3 py-2 text-sm w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 ${
                  theme === "light" ? "font-bold" : ""
                }`}
              >
                ☀ Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 px-3 py-2 text-sm w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 ${
                  theme === "dark" ? "font-bold" : ""
                }`}
              >
                🌙 Night
              </button>
              <button
                onClick={() => setTheme("auto")}
                className={`flex items-center gap-2 px-3 py-2 text-sm w-full text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-200 ${
                  theme === "auto" ? "font-bold" : ""
                }`}
              >
                ⚙ Automatic
              </button>
            </div>
          )}
        </span>
      </div>
    </header>
  );
}
