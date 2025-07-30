"use client";

import { SkillCard } from "@/components";
import { motion } from "framer-motion";
import Link from 'next/link';

// import { useQuery } from "@tanstack/react-query";

const MotionDiv = motion.div;

interface Movie {
  id: number;
  image: string;
  title: string;
  children: string;
  categoryId: number;
}

const MOVIES: Movie[] = [
  {
    id: 1,
    image: "/image/imgM6.png",
    title: "Fanatical: The Catfishing of Tegan and Sara",
    children: "TVMA • Documentaries • Movie (2024)",
    categoryId: 1 // New & Classic
  },
  {
    id: 2,
    image: "/image/imgM2.png",
    title: "BRATS",
    children: "Not Rated • Documentaries • Movie (2024)",
    categoryId: 2 // New & Classic
  },
  {
    id: 3,
    image: "/image/imgM3.png",
    title: "Deep Water",
    children: "R • Latino, Thriller • Movie (2022)",
    categoryId: 3 // Groundbreaking
  },
  {
    id: 4,
    image: "/image/imgM4.png",
    title: "No Exit",
    children: "R • Thriller, Horror • Movie (2022)",
    categoryId: 3 // Add-on
  },
  {
    id: 5,
    image: "/image/imgM1.png",
    title: "69: The Saga of Danny Hernandez",
    children: "TVMA • Music, Documentaries • Movie",
    categoryId: 2 // New & Classic
  },
  {
    id: 6,
    image: "/image/imgM2.png",
    title: "Books of Blood",
    children: "R • Horror, Thriller • Movie (2020)",
    categoryId: 1 // New & Classic
  },
  {
    id: 7,
    image: "/image/imgM3.png",
    title: "The Princess",
    children: "R • Action, Adventure • Movie (2022)",
    categoryId: 2 // Groundbreaking
  },
  {
    id: 8,
    image: "/image/imgM4.png",
    title: "The Night House",
    children: "R • Horror, Mystery • Movie (2021)",
    categoryId: 3 // Add-on
  },
  {
    id: 9,
    image: "/image/imgM3.png",
    title: "Deep Water",
    children: "R • Latino, Thriller • Movie (2022)",
    categoryId: 1 // Groundbreaking
  }
];

interface ListMovieProps {
  categoryId?: number;
}

export function ListMovie({ categoryId }: ListMovieProps) {
  return (
    <section className="px-8 bg-black">
      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <div className="container mx-auto grid grid-cols-1 gap-[43px] md:grid-cols-2 lg:grid-cols-3">

          {MOVIES
            .filter(movie => !categoryId || movie.categoryId === categoryId)
            .map((props, idx) => (
              <Link
                href={`/movie/${props.id || idx}`}  // Sử dụng id của phim hoặc index làm fallback
                key={idx}
                passHref
              >
                <MotionDiv
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="cursor-pointer" // Thêm hiệu ứng khi hover

                >
                  <SkillCard key={idx} {...props} />
                </MotionDiv>
              </Link>
            ))}
        </div>
      </MotionDiv>

    </section>
  );
}

export default ListMovie;
