"use client";

import { Typography } from "@material-tailwind/react";
import {
  RectangleGroupIcon,
  FingerPrintIcon,
  SwatchIcon,
  HashtagIcon,
  EyeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { SkillCard } from "@/components";
import { motion } from "framer-motion";
// import { useQuery } from "@tanstack/react-query";

const MotionDiv = motion.div;

const SKILLS = [
  {
    icon: RectangleGroupIcon,
    title: "Frontend Web Development:",
    children:
      "Creating beautiful and functional web experiences is my forte. Using the latest technologies and best practices, I design and build websites that captivate and engage users.",
  },
  {
    icon: FingerPrintIcon,
    title: "Mobile App Development",
    children:
      " I specialize in creating responsive and intuitive mobile apps that work seamlessly across iOS & Android devices. From concept to deployment, I handle every stage of the development process.",
  },
  {
    icon: SwatchIcon,
    title: "Technology Stack",
    children:
      "I'm well-versed in the industry's most popular frontend technologies, including HTML5, CSS3, JavaScript, and frameworks like React and React Native.",
  },
  {
    icon: HashtagIcon,
    title: " Web Optimization",
    children:
      "Performance matters. I optimize websites and apps for speed, ensuring your users enjoy a fast and responsive experience, which in turn boosts user satisfaction and SEO rankings.",
  },
  {
    icon: EyeIcon,
    title: "User-Centric Design",
    children:
      "My development goes hand-in-hand with an eye for design. I create user interfaces that are not only functional but also aesthetically pleasing, providing a seamless and enjoyable user journey.",
  },
  {
    icon: DocumentTextIcon,
    title: "Testing and Quality Assurance",
    children:
      "I rigorously test and debug applications to guarantee a bug-free and secure environment for users. Your peace of mind is as important to me as the functionality of your project.",
  },
];

const ICONS: Record<string, any> = {
  RectangleGroupIcon,
  FingerPrintIcon,
  SwatchIcon,
  HashtagIcon,
  EyeIcon,
  DocumentTextIcon,
};

export function Skills() {
  // const {
  //   data: skills = [],
  //   isPending,
  //   error,
  // } = useQuery({
  //   queryKey: ["skills"],
  //   queryFn: () =>
  //     fetch("https://example.com/api/skills").then((res) => res.json()),
  // });
  return (
    <section className="px-8 bg-black">
      <div className="container mx-auto mb-20 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <Typography color="white" className="mb-2 font-bold uppercase">
            my skills
          </Typography>
          <Typography variant="h1" color="white" className="mb-4">
            What I do
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full !text-gray-500 lg:w-10/12"
          >
            I&apos;m not just a developer; I&apos;m a digital dreamweaver.
            Crafting immersive online experiences is not just a job but my
            calling. Discover below how I can help you.
          </Typography>
        </MotionDiv>
      </div>
      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <div className="container mx-auto grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3">

          {SKILLS.map((props, idx) => (
            <MotionDiv
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <SkillCard key={idx} {...props} />
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>

    </section>
  );
}

export default Skills;
