import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Tegar Umar Abdillah",
  initials: "T",
  url: "https://dillion.io",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "Software Engineer - Frontend Developer - Backend Developer",
  summary:
    "I work as a website developer at [Soca AI](https://soca.ai/). I am currently pursuing a degree in Computer Science at [Widyatama University](https://www.widyatama.ac.id/). I strongly believe that artificial intelligence will bring significant advancements to the world of technology in the future.",
  avatarUrl: "/me.jpeg",
  skills: [
    "Vue",
    "Nuxt.js",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "Flask",
    "Go",
    "Postgres",
    "MySQL",
    "MongoDB",
    "Java",
    "Spring Boot",
    "PHP",
    "Laravel"
  ],
  skillsSlug: [
    "typescript",
    "java",
    "react",
    "express",
    "postgresql",
    "mongodb",
    "vue",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/tegarumar",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/tegarumarabdillah/",
        icon: Icons.linkedin,

        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/tegar.ua/",
        icon: Icons.instagram,
        navbar: true
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Soca AI",
      href: "https://soca.ai/",
      badges: [],
      location: "Bandung, Jawa Barat",
      title: "Website Developer",
      logoUrl: "/soca-ai.jpeg",
      start: "Aug 2021",
      end: "Present",
      description:
        "Responsible for overseeing the entire Front End product of Soca AI, catering to nearly 100,000++ users. Proficient in web application development, specializing in Vue JS, React JS, Tailwind CSS and Bootstrap to create responsive and engaging interfaces. Skilled in integrating intuitive features. Collaborated with R&D to implement AI functionalities, enhancing platform capabilities. Experienced in REST API development, utilizing Java Spring Boot, Laravel, Node.js/Express JS, and MongoDB/PostgreSQL. Demonstrated leadership as a mentor in school internship programs, providing guidance and fostering a collaborative learning environment. Expertise in consuming APIs on the frontend, seamlessly integrating dynamic data to enhance user experiences.",
    },
    {
      company: "Birutekno Inc.",
      href: "https://www.birutekno.com/",
      badges: [],
      location: "Bandung, Jawa Barat",
      title: "Fullstack Developer",
      logoUrl: "/birutekno.png",
      start: "Nov 2021",
      end: "Jul 2022",
      description:
        "Contributed to more than five projects as a full-stack developer. I utilized a range of technologies, including Vue.js for front-end development, MongoDB and PostgreSQL for database management, as well as Laravel and Spring Boot Java for back-end development. I was involved in the full development lifecycle, from designing application architecture to deployment. This experience enhanced my skills in building modern web applications and collaborating with cross-functional teams.",
    },
  ],
  education: [
    {
      school: "Widyatama University",
      href: "https://www.widyatama.ac.id/",
      degree: "Bachelor's Degree of Informatics Engineering",
      logoUrl: "/widyatama.png",
      start: "2023",
      end: "Present",
    },
    {
      school: "Vocational High School 13 Bandung",
      href: "https://www.instagram.com/smkn13bandung/",
      degree: "Software Engineering",
      logoUrl: "/smkn13.jpeg",
      start: "2019",
      end: "2022",
    },
  ],
  projects: [
    {
      title: "Soca AI - Genesist",
      href: "https://genesist.soca.ai/",
      active: true,
      description:
        "Genesist is a custom-developed AI solution, designed to enhance productivity and efficiency across various enterprise sectors. Built on a secure, on-premise large language model (LLM) platform, Genesist enables businesses to integrate AI into their operations.",
      technologies: [
        "Vue.js",
        "React.js",
        "TypeScript",
        "Vite",
        "Bootstrap",
        "TailwindCSS",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      links: [
        {
          type: "Website",
          href: "https://genesist.soca.ai/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/soca-genesist.jpeg",
      video:
        "",
    },
    {
      title: "Soca AI - Web Creator",
      href: "https://app.soca.ai/",
      active: true,
      description:
        "Developed a web creator for Soca AI's. Voice cloning, Video Editing, Auto Dubbing, and more.",
      technologies: [
        "Vue.js",
        "Bootstrap",
        "TailwindCSS",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      links: [
        {
          type: "Website",
          href: "https://app.soca.ai/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/soca-wc.jpeg",
      video: "",
    },
    {
      title: "Soca AI - Landing Page",
      href: "https://soca.ai/",
      active: true,
      description:
        "Developed a landing page for Soca AI's product.",
      technologies: [
        "Vue.js",
        "Bootstrap",
        "Tailwind CSS",
        "WordPress",
      ],
      links: [
        {
          type: "Website",
          href: "https://soca.ai/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/soca-lp.jpeg",
      video:
        "",
    },
    {
      title: "Soca AI - Q-GEN",
      href: "https://q-gen.soca.ai/",
      active: true,
      description:
        "Developed a question generator for Soca AI's. Generate questions from text, Play the quiz, and more.",
      technologies: [
        "Vue.js",
        "Bootstrap",
        "TailwindCSS",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      links: [
        {
          type: "Website",
          href: "https://q-gen.soca.ai/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/soca-qgen.png",
      video: "",
    },
    {
      title: "Tictactoe",
      href: "https://tictactoe-by-tegar.vercel.app/",
      active: true,
      description:
        "Tictactoe game",
      technologies: [
        "Vue.js",
        "Bootstrap",
      ],
      links: [
        {
          type: "Website",
          href: "https://tictactoe-by-tegar.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/tegar-tictactoe.jpeg",
      video: "",
    },
    {
      title: "Rock Paper Scissors",
      href: "https://rock-paper-scissors-games-by-tegar.vercel.app/",
      active: true,
      description:
        "Rock Paper Scissors game",
      technologies: [
        "Vue.js",
        "Bootstrap",
      ],
      links: [
        {
          type: "Website",
          href: "https://rock-paper-scissors-games-by-tegar.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/tegar-rps.jpeg",
      video: "",
    }
  ],
} as const;
