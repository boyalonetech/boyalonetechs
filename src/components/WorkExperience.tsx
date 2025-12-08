"use client";

import { useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
  Check,
  ChevronDown,
} from "lucide-react";

interface WorkExperience {
  id: number;
  company: string;
  logo?: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  skills: string[];
  link?: string;
  current?: boolean;
}

const workExperiences: WorkExperience[] = [
  {
    id: 1,
    company: "Innovations Growth Hub",
    role: "Senior Frontend Developer",
    duration: "2022 - Present",
    location: "San Francisco, CA",
    description:
      "Lead development of responsive web applications using React, Next.js, and TypeScript. Implemented performance optimizations that improved load times by 40%. Mentored junior developers and established coding standards.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    link: "https://ighub.ng",
    current: true,
  },
  {
    id: 2,
    company: "Ulooma Ltd",
    role: "Full Stack Developer",
    duration: "2020 - 2022",
    location: "New York, NY",
    description:
      "Developed and maintained multiple web applications using the MERN stack. Collaborated with designers to implement pixel-perfect UIs. Integrated third-party APIs and payment gateways.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    link: "https://ulooma.com",
  },
  {
    id: 3,
    company: "Affidex Labs",
    role: "Frontend Developer",
    duration: "2024 - 2025",
    location: "Austin, TX",
    description:
      "Built user interfaces for SaaS products using React and styled-components. Participated in agile development cycles and code reviews. Contributed to the design system component library.",
    skills: [
      "React",
      "JavaScript",
      "Styled Components",
      "Git",
      "Webpack",
      "REST APIs",
    ],
    link: "https://affidexlab.com/",
  },
  {
    id: 4,
    company: "CodeCraft Studio",
    role: "Junior Web Developer",
    duration: "2017 - 2018",
    location: "Remote",
    description:
      "Developed websites and web applications for various clients. Learned modern frontend technologies and best practices. Collaborated with senior developers on larger projects.",
    skills: [
      "HTML/CSS",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "PHP",
      "WordPress",
    ],
  },
];

export default function WorkExperience() {
  const [selectedExperience, setSelectedExperience] = useState<WorkExperience>(
    workExperiences[0]
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className="max-w-6xl mx-auto lg:px-2 xl:px-1 py-8 sm:py-12"
      id="experience"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12">
        <div className="mb-6 sm:mb-0 px-3">
          <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-blue-500 mb-2">
            Work Experience
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
          <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-sm xl:text-base">
            My professional journey in software development, highlighting key
            roles, responsibilities, and technologies I&apos;ve worked with.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3 text-blue-500">
          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium text-sm sm:text-base lg:text-sm xl:text-base">
            {workExperiences.length} positions
          </span>
        </div>
      </div>

      {/* Mobile Experience Selector */}
      <div className="lg:hidden mb-6 px-2">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between p-4 rounded-xl shadow sk transition-colors"
        >
          <div className="text-left">
            <h3 className="font-semibold">{selectedExperience.company}</h3>
            <p className="text-sm">{selectedExperience.role}</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isMobileMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isMobileMenuOpen && (
          <div className="mt-2 rounded-xl shadow-lg sk overflow-hidden transition-colors">
            {workExperiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => {
                  setSelectedExperience(exp);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left p-4 sk-b last:sk-b-0 transition-colors ${
                  selectedExperience.id === exp.id ? " sk-l-4 sk-blue-500" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm sm:text-base">
                      {exp.company}
                    </h4>
                    <p className="text-sm">{exp.role}</p>
                  </div>
                  {selectedExperience.id === exp.id && (
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0 ml-2" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.duration}
                  </span>
                  {exp.current && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs transition-colors">
                      Current
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Timeline/Experience List - Hidden on mobile, shown in dropdown */}
        <div className="hidden lg:block lg:w-1/3">
          <div className="lg:rounded-lg xl:rounded-xl shadow-lg sk p-1 transition-colors">
            <div className="p-4 sk-b">
              <h3 className="font-semibold text-blue-500 lg:text-sm xl:text-base">
                Positions
              </h3>
            </div>
            <div className="space-y-1 p-1 gap-y-3 flex flex-col">
              {workExperiences.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExperience(exp)}
                  className={`w-full text-left p-4 lg:p-3 xl:p-4 rounded-lg transition-all duration-200 ${
                    selectedExperience.id === exp.id
                      ? "shadow shadow-blue-500/20 border-l-4 border-blue-500"
                      : "sk border-l border-blue-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold lg:text-sm xl:text-base truncate">
                        {exp.company}
                      </h4>
                      <p className="lg:text-xs xl:text-sm truncate">
                        {exp.role}
                      </p>
                    </div>
                    {selectedExperience.id === exp.id && (
                      <ChevronRight className="w-5 h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-blue-500 flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <span className="flex items-center gap-1 truncate">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      {exp.duration}
                    </span>
                    {exp.current && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs whitespace-nowrap transition-colors">
                        Current
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Skills Summary */}
          <div className="mt-6 bg-gradient-to-br lg:rounded-lg xl:rounded-xl shadow-lg p-4 sm:p-6 transition-colors">
            <h3 className="font-semibold text-blue-500 mb-3 sm:mb-4 lg:text-sm xl:text-base">
              Skills Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              {workExperiences
                .reduce((acc, exp) => {
                  exp.skills.forEach((skill) => {
                    if (!acc.includes(skill)) acc.push(skill);
                  });
                  return acc;
                }, [] as string[])
                .slice(0, 8)
                .map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate">{skill}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Selected Experience Details */}
        <div className="w-full lg:w-2/3">
          <div className="lg:rounded-lg xl:rounded-xl shadow-lg sk overflow-hidden transition-colors">
            {/* Experience Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-bold text-white truncate">
                    {selectedExperience.company}
                  </h3>
                  <p className="text-blue-100 lg:text-sm xl:text-base truncate">
                    {selectedExperience.role}
                  </p>
                </div>
                {selectedExperience.current && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm self-start sm:self-center text-white">
                    Current Position
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{selectedExperience.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">
                    {selectedExperience.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Experience Details */}
            <div className="p-4 sm:p-6 lg:p-4 xl:p-6">
              <div className="mb-4 sm:mb-6 lg:mb-4 xl:mb-6">
                <h4 className="font-semibold mb-2 text-base sm:text-lg lg:text-base xl:text-lg">
                  Responsibilities
                </h4>
                <p className="leading-relaxed text-sm sm:text-base lg:text-sm xl:text-base">
                  {selectedExperience.description}
                </p>
              </div>

              <div className="mb-4 sm:mb-6 lg:mb-4 xl:mb-6">
                <h4 className="font-semibold mb-3 text-base sm:text-lg lg:text-base xl:text-lg">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedExperience.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg lg:rounded lg:px-2 lg:py-1 xl:rounded-lg xl:px-2.5 xl:py-1 text-xs sm:text-sm lg:text-xs xl:text-sm font-medium whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Milestones/Timeline */}
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg lg:text-base xl:text-lg">
                  Key Achievements
                </h4>
                <div className="space-y-3 sm:space-y-4 lg:space-y-3 xl:space-y-4">
                  <div className="flex gap-2 sm:gap-3">
                    <div className="flex flex-col items-center pt-0.5">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <div className="w-0.5 h-full bg-blue-200 dark:bg-blue-800 mt-1 flex-1"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base lg:text-sm xl:text-base">
                        Performance Optimization
                      </p>
                      <p className="text-xs sm:text-sm lg:text-xs xl:text-sm">
                        Improved application load times by 40% through code
                        splitting and lazy loading
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <div className="flex flex-col items-center pt-0.5">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <div className="w-0.5 h-full bg-blue-200 dark:bg-blue-800 mt-1 flex-1"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base lg:text-sm xl:text-base">
                        Team Leadership
                      </p>
                      <p className="text-xs sm:text-sm lg:text-xs xl:text-sm">
                        Mentored 3 junior developers and established coding
                        standards
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <div className="flex flex-col items-center pt-0.5">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base lg:text-sm xl:text-base">
                        Project Delivery
                      </p>
                      <p className="text-xs sm:text-sm lg:text-xs xl:text-sm">
                        Successfully delivered 5+ major features on schedule
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Link */}
              {selectedExperience.link && (
                <div className="mt-6 sm:mt-8 lg:mt-4 xl:mt-6 pt-4 sm:pt-6 lg:pt-4 xl:pt-6 sk-t">
                  <a
                    href={selectedExperience.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base lg:text-sm xl:text-base"
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Visit Company Website
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <div className="lg:rounded-lg xl:rounded-xl shadow p-3 sm:p-4 text-center transition-colors">
              <div className="text-xl sm:text-2xl lg:text-lg xl:text-2xl font-bold text-blue-500">
                {workExperiences.length}+
              </div>
              <div className="text-xs sm:text-sm mt-1">Positions</div>
            </div>
            <div className="lg:rounded-lg xl:rounded-xl shadow p-3 sm:p-4 text-center transition-colors">
              <div className="text-xl sm:text-2xl lg:text-lg xl:text-2xl font-bold text-blue-500">
                1+
              </div>
              <div className="text-xs sm:text-sm mt-1">Years Experience</div>
            </div>
            <div className="lg:rounded-lg xl:rounded-xl shadow p-3 sm:p-4 text-center transition-colors">
              <div className="text-xl sm:text-2xl lg:text-lg xl:text-2xl font-bold text-blue-500">
                10+
              </div>
              <div className="text-xs sm:text-sm mt-1">Technologies</div>
            </div>
            <div className="lg:rounded-lg xl:rounded-xl shadow p-3 sm:p-4 text-center transition-colors">
              <div className="text-xl sm:text-2xl lg:text-lg xl:text-2xl font-bold text-blue-500">
                15+
              </div>
              <div className="text-xs sm:text-sm mt-1">Projects</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
