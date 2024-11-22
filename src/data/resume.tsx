import { Icons } from "@/components/icons";
import { HomeIcon, CodeIcon } from "lucide-react";

export const DATA = {
  name: "Tegar Umar Abdillah",
  initials: "T",
  url: "https://tegar-kingofthejungle.vercel.app/",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description: "Software Engineer - Frontend Developer - Backend Developer",
  summary:
    "Hi! My name is [Tegar Umar Abdillah](https://www.instagram.com/tegar.ua/) \n\n I'm a passionate Website Developer currently working at [Soca AI](https://soca.ai/), where I collaborate on innovative web solutions to enhance user experiences. I enjoy leveraging cutting-edge technologies to build efficient, user-friendly web applications. \n\n In addition to my professional role, I'm also an active Computer Science student at [Widyatama University](https://www.widyatama.ac.id/), constantly exploring the latest trends and technologies in the world of programming. My journey in both education and work has given me a unique blend of theoretical knowledge and hands-on experience. \n\nAlways eager to learn and grow, I strive to create impactful digital solutions that make a difference. [Let's connect!](https://www.linkedin.com/in/tegarumarabdillah/)",
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
    "Laravel",
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
    { href: "/projects", icon: CodeIcon, label: "Projects" },
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
        navbar: true,
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
      start: "Aug 2022",
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
        "Vuex",
        "React.js",
        "Redux",
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
      video: "",
    },
    {
      title: "Soca AI - Web Creator",
      href: "https://app.soca.ai/",
      active: true,
      description:
        "Developed a web creator platform, incorporating cutting-edge features such as voice cloning, video editing, and auto dubbing. This project played a pivotal role in enhancing the accessibility of AI-powered content creation for diverse user needs.",
      technologies: [
        "Vue.js",
        "Vuex",
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
        "Developed a dynamic and user-friendly landing page for Soca AI's flagship product, focusing on responsive design, smooth user experience, and optimal performance across various devices.",
      technologies: ["Vue.js", "Bootstrap", "TailwindCSS", "WordPress"],
      links: [
        {
          type: "Website",
          href: "https://soca.ai/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/soca-lp.jpeg",
      video: "",
    },
    {
      title: "Soca AI - Q-GEN",
      href: "https://q-gen.soca.ai/",
      active: true,
      description:
        "Developed a question generator tool, designed to generate questions from input text and offer interactive quiz functionalities. The platform allows users to easily create quizzes, test knowledge, and engage in educational activities.",
      technologies: [
        "Vue.js",
        "Vuex",
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
      title: "NLP Marque Luxury",
      href: "",
      active: true,
      description:
        "A website that uses artificial intelligence in the field of NLP (Natural Language Processing) is used to determine the analysis of product texts on the market and compare them to standard items. i'm here as a Frontend Developer.",
      technologies: ["Vue.js", "Vuex", "Bootstrap"],
      links: [],
      image: "/birutekno-mnlp.png",
      video: "",
    },
    {
      title: "Ecomsys",
      href: "",
      active: true,
      description:
        "Web-based Application for use by company employees, and is used to manage any construction project. I'm here as a Fullstack Developer help in developing the course of the project.",
      technologies: [
        "Vue.js",
        "Vuex",
        "Bootstrap",
        "Java",
        "Spring Boot",
        "MongoDB",
      ],
      links: [],
      image: "/birutekno-ecomsys.png",
      video: "",
    },
    {
      title: "Al-Qur'an Digital",
      href: "https://quran-digital-by-tegar.vercel.app/",
      active: true,
      description:
        "Al-Qur'an Digital, a website that displays the Qur'an with a simple and elegant design.",
      technologies: ["React.js", "Next.js", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://quran-digital-by-tegar.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/tegar-quran.jpeg",
      video: "",
    },
    {
      title: "Morpho Butterfly",
      href: "https://github.com/tegarumar/morpho-butterfly",
      active: true,
      description:
        "A website describe the Morpho Butterfly, a butterfly that has a beautiful blue color.",
      technologies: ["JavaScript", "Three.js", "GSAP"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/tegarumar/morpho-butterfly",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/butterfly.mp4",
    },
    {
      title: "Tictactoe",
      href: "https://tictactoe-by-tegar.vercel.app/",
      active: true,
      description:
        "Tictactoe is a simple game played on a 3x3 grid. The goal is to be the first player to form a straight line with three of their marks, either horizontally, vertically, or diagonally. In the version I created, the player competes against a bot programmed to make strategic decisions.",
      technologies: ["Vue.js", "Bootstrap"],
      links: [
        {
          type: "Website",
          href: "https://tictactoe-by-tegar.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/tegarumar/tictactoe-games",
          icon: <Icons.github className="size-3" />,
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
        "Rock Paper Scissors is a hand game typically played between two people, where each player simultaneously chooses one of three shapes: rock, paper, or scissors. In my version, the player faces a bot that either picks moves randomly or follows a specific strategy.",
      technologies: ["Vue.js", "Bootstrap"],
      links: [
        {
          type: "Website",
          href: "https://rock-paper-scissors-games-by-tegar.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/tegarumar/rock-paper-scissors",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/tegar-rps.jpeg",
      video: "",
    },
    {
      title: "Public IP Checker",
      href: "https://public-ip-checker.vercel.app/",
      active: true,
      description:
        "Find your public IP address in seconds with this free, responsive tool. No sign-up required. Just one click, no hassle.",
      technologies: ["HTML", "JavaScript", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://public-ip-checker.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/tegarumar/public-ip-checker",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/public-ip-checker.png",
      video: "",
    },
    {
      title: "Audio Visualizer",
      href: "https://tegarumar.github.io/audio-visualizer/",
      active: true,
      description:
        "An interactive audio visualizer built with Three.js, rendering dynamic 3D visuals in real-time based on sound frequencies.",
      technologies: ["JavaScript", "Three.js"],
      links: [
        {
          type: "Website",
          href: "https://tegarumar.github.io/audio-visualizer/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/tegarumar/audio-visualizer",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/audio-visualizer.mp4",
    },
  ],
} as const;
