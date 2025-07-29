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
import { CategoryCard } from "@/components/category-card";
import { motion } from "framer-motion";
import Link from 'next/link';

// import { useQuery } from "@tanstack/react-query";

const MotionDiv = motion.div;

const CategoryList = [
    {
        id: 1,
        image: "/image/imageC1.png",
        title: "Fanatical: The Catfishing of Tegan and Sara",
        children:
            "TVMA • Documentaries • Movie (2024)",
    },
    {
        id: 2,
        image: "/image/imageC2.png",
        title: "BRATS",
        children:
            "Not Rated • Documentaries • Movie (2024)",
    },
    {
        id: 3,
        image: "/image/imageC3.png",
        title: "Deep Water",
        children:
            "R • Latino, Thriller • Movie (2022)",
    }
];

const ICONS: Record<string, any> = {
    RectangleGroupIcon,
    FingerPrintIcon,
    SwatchIcon,
    HashtagIcon,
    EyeIcon,
    DocumentTextIcon,
};

export function Category() {
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
                        INCLUDED IN ALL PLANS
                    </Typography>
                    <Typography variant="h1" color="white" className="mb-4">
                        All The TV You Love
                    </Typography>
                    <Typography
                        variant="lead"
                        className="mx-auto w-full !text-gray-500 lg:w-10/12"
                    >
                        Watch full seasons of exclusive streaming series
                        , current-season episodes, hit movies, Hulu Originals, kids shows, and more.
                    </Typography>
                </MotionDiv>
            </div>
            <MotionDiv
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.5 }}
            >
                <div className="container mx-auto grid grid-cols-1 gap-[43px] md:grid-cols-2 lg:grid-cols-3 h-[452px] position-relative">

                    {CategoryList.map((props, idx) => (
                        <Link
                            href={`/movie/${props.id || idx}`}  // Sử dụng id của phim hoặc index làm fallback
                            key={idx}
                            passHref
                        >
                            <MotionDiv
                                key={props.id || idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="cursor-pointer position-relative" // Thêm hiệu ứng khi hover

                            >
                                <CategoryCard
                                    title={props.title}
                                    image={props.image}
                                >
                                    {props.children}
                                </CategoryCard>
                            </MotionDiv>
                        </Link>
                    ))}
                </div>
            </MotionDiv>

        </section>
    );
}

export default Category;
