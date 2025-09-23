// data/projects.ts
export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  demoLink: string;
}

const projects: Project[] = [
  {
    id: "ecommerce",
    title: "Foundich Leather Works",
    image: "/foundich.png",
    description:
      "Foundich - E-commerce Shoe Website Foundich is a modern e-commerce platform designed to make buying shoes simple, stylish, and seamless. Built with a focus on user experience, Foundich provides customers with an intuitive shopping journey — from effortless browsing to secure checkout.The platform features a clean and responsive design, interactive product displays, and smart filtering options that allow users to find the perfect pair of shoes with ease. With a minimalist yet engaging interface, Foundich ensures smooth navigation across mobile and desktop devices. Beyond aesthetics, the website is optimized for performance, speed, and accessibility, giving customers a reliable and enjoyable shopping experience. From trendy sneakers to classic footwear, Foundich brings fashion and functionality together in one digital space.",
    demoLink: "https://foundichleatherworks.vercel.app",
  },
  {
    id: "ulooma",
    title: "Ulooma",
    image: "/ulooma.jpg",
    description: "🚫Construction is underway..",
    demoLink: "https://ulooma.vercel.app",
  },
  {
    id: "elvis",
    title: "Elvis",
    image: "/elvis.jpg",
    description:
      "Elvis Nwoko is a passionate UI/UX designer dedicated to creating digital experiences that are not only visually appealing but also intuitive and user-centeblue. With a strong eye for detail and a creative approach to problem-solving, he transforms complex ideas into simple, engaging, and functional interfaces.      Elvis combines modern design principles with user research, wireframing, prototyping, and usability testing to deliver designs that enhance user satisfaction and meet business goals. His expertise spans across responsive web design, mobile applications, and interactive prototypes, ensuring seamless experiences across all platforms.Driven by curiosity and innovation, Elvis stays up to date with design trends, accessibility standards, and emerging technologies to craft products that resonate with users and stand out in the digital space.",
    demoLink: "https://elvis-nine.vercel.app",
  },
  {
    id: "cc-media",
    title: "CC Media",
    image: "/caleb-collins.png",
    description:
      "Caleb Collins is a results-driven digital marketer with a passion for helping brands grow, engage, and thrive in the online space. With expertise in social media management, SEO, paid advertising, and content strategy, he leverages data-driven insights to craft campaigns that connect with audiences and drive measurable results. Caleb specializes in building strong digital identities, optimizing online visibility, and creating compelling content that resonates with target markets. His approach combines creativity with analytics, ensuring every strategy not only attracts attention but also converts into growth. Always ahead of trends, Caleb stays updated with the latest marketing tools, consumer behaviors, and digital innovations, making him a valuable partner for businesses looking to scale their online presence and maximize ROI.",
    demoLink: "https://calebcollinsmedia.vercel.app",
  },
  {
    id: "biggie-techs",
    title: "Biggie Techs",
    image: "/biggie-techs.png",
    description:
      "Biggie Techs is a creative graphic designer passionate about transforming ideas into powerful visual stories. With a strong eye for design and detail, he specializes in crafting modern, impactful, and brand-focused graphics that communicate messages effectively.From logos, brand identities, and social media visuals to marketing materials and digital creatives, Biggie Techs blends creativity with strategy to deliver designs that not only stand out but also align with business goals. His work reflects a balance of aesthetics, functionality, and innovation, ensuring every design leaves a lasting impression. Driven by consistency and originality, Biggie Techs keeps up with evolving design trends and tools, enabling him to create visuals that resonate with diverse audiences in today’s fast-paced digital world.",

    demoLink: "https://biggietechs.vercel.app",
  },

  {
    id: "idoko-chidimma",
    title: "Idoko Chidimma",
    image: "/Frame.png",
    description:
      "A detail-oriented and analytical professional with expertise in transforming raw data into meaningful insights that drive informed business decisions. Skilled in data collection, cleaning, visualization, and statistical analysis, with proficiency in tools such as Excel, SQL, Python, Power BI, and Tableau. The role focuses on identifying trends, patterns, and opportunities within complex datasets to optimize processes, improve performance, and support strategic growth. Adept at creating interactive dashboards, generating reports, and presenting findings in a clear and actionable manner for both technical and non-technical stakeholders. Passionate about leveraging data to solve problems, enhance efficiency, and contribute to business intelligence, while continuously exploring emerging technologies in analytics and data science.",
    demoLink: "https://preciousportfolio-chi.vercel.app",
  },

  {
    id: "divine-portfolio",
    title: "Divine Portfolio",
    image: "/logo.png",
    description: "An outdated portfolio of Divine Timothy",
    demoLink: "https://boyalonetech.netlify.app",
  },

  {
    id: "calculator",
    title: "Calculator",
    image: "/calculator-with-modern-flat-style_3322-74.jpg",
    description:
      "A simple yet efficient calculator application designed to perform basic arithmetic operations with a clean, user-friendly interface. Built with a focus on usability and responsiveness, the project demonstrates problem-solving, UI design, and functionality integration. The calculator ensures smooth interaction across devices, making it a practical tool while showcasing core programming and design skills.",
    demoLink: "https://boyalonetech.github.io/Calculator/",
  },

  {
    id: "meme",
    title: "Meme Generator",
    image: "/unnamed.png",
    description:
      "The Meme Generator is a fun and interactive platform that allows users to create, customize, and share memes effortlessly. Built with simplicity in mind, it provides easy-to-use tools for adding text, images, and creative elements to generate humorous and engaging content. Whether for social media, marketing, or personal entertainment, the Meme Generator empowers users to express ideas in a playful and viral-ready format. Its responsive design ensures smooth use across devices, making meme creation quick, enjoyable, and shareable anytime, anywhere.",
    demoLink: "https://boyalonetech.github.io/quote-generator",
  },
];

export default projects;
