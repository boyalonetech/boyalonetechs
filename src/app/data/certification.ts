export interface Certification {
  title: string;
  issuer: string;
  year: string;
  image: string;
}

const certifications = [
  {
    title: "Tech Trailblazer Award",
    issuer: "IGHUB",
    year: "2025",
    image: "/Tech_TrailBlaizer_Award.webp",
  },
  {
    title: "Frontend Development Certificate",
    issuer: "Tech Tribe", 
    year: "2024/2025",
    image: "/frontend-certificate.webp",
  },
  {
    title: "Mobile App Development Certificate",
    issuer: "Bootcamp Africa",
    year: "2025",
    image: "/bootcamp.webp",
  },

  {
    title: "Software Fundamentals",
    issuer: "Innovation Growth Hub",
    year: "2024",
    image: "/cert-completion.webp",
  },
  // {
  //   title: "AWS Certified Developer",
  //   issuer: "Amazon Web Services",
  //   year: "2023",
  //   image: "/aws-dev.jpg",
  // },
];

export default certifications;
