import Stats from "./Stats";
import Stack from "./Stack";
import Profile from "./Profile";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-col sm:flex-row font-sans min-h-screen w-full mb-12">
      {/* Sidebar */}
      {/* <div className="lg:hidden md:block">
        <Profile />
      </div> */}

      <div className="lg:hidden block">
        <Profile />
      </div>

      {/* Main Content */}
      <section
        className="flex-1 h-screen p-3 md:ml-[0px] lg:ml-[290px] xl:ml-[360px] sm:p-2 sm:mt-12"
        id="home"
      >
        {/* Header */}
        <div className="flex justify-between items-start mt-14 lg:mt-0">
          <div>
            <h1 className="xl:text-3xl lg:text-2xl font-bold">
              Hey <span className="text-blue-500 ">there!</span> 👋
            </h1>
            <p className="mt-2 lg:text-sm xl:text-base  max-w-xl">
              I&apos;m thrilled to tell you a bit about myself. I have over 1+
              years of IT experience specializing in Typescript, database
              Integration, open-source frameworks and other programming
              languages. If you&apos;re in need of a motivated Developer,or have
              an idea you want to work on, Connect let&apos;s bring it to live!
            </p>
          </div>
        </div>

        {/* Sections */}
        <Stats />
        <Stack />
      </section>
    </main>
  );
}
