// data/projects.ts
export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  demoLink: string;
  techstack: string;
}

const projects: Project[] = [
  {
    id: "ecommerce-store",
    title: "E-commerce Store",
    image: "/foundich.png",
    description:
      "A complete e-commerce platform with user auth, product catalog, shopping cart, and Stripe payment integration.",
    demoLink: "https://foundichleatherworks.vercel.app",
    techstack: "nextjs",
  },
  {
    id: "ulooma",
    title: "Ulooma",
    image: "/ulooma.jpg",
    description:
      "A team of housing agents that cuts the bridge between landlords and tenants to make finding houses easier and faster.",
    demoLink: "/",
    techstack: "nextjs",
  },
  {
    id: "cc-media",
    title: "CC Media",
    image: "/caleb-collins.png",
    description:
      "A modern and responsive portfolio site built with Html and  CSS, showcasing digital marketer experience and work.",
    demoLink: "https://calebcollinsmedia.vercel.app",
    techstack: "nextjs",
  },
  {
    id: "biggie-techs",
    title: "Biggie Techs",
    image: "/biggie-techs.png",
    description:
      "Portfolio for a Graphic and UI & UX Designer site built with Html and Tailwind CSS, showcasing creative digital experience and work.",
    demoLink: "https://biggietechs.vercel.app",
    techstack: "Html",
  },

  {
    id: "idoko-chidimma",
    title: "Idoko Chidimma",
    image: "/Frame.png",
    description:
      "Data Analyst portfolio showcasing data visualization and analysis projects.",
    demoLink: "https://precious-chi.vercel.app",
    techstack: "nextjs",
  },
];

export default projects;
