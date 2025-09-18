"use client";

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
        title: "New & Classic",
        description: "Khám phá những bộ phim mới nhất và kinh điển",
        children:
            "Movie (2024)",
    },
    {
        id: 2,
        image: "/image/imageC2.png",
        title: "Groundbreaking",
        description: "Những tác phẩm đột phá độc quyền trên Hulu",
        children:
            "Hulu Originals Movie (2024)",
    },
    {
        id: 3,
        image: "/image/imageC3.png",
        title: "Add-on",
        description: "Trải nghiệm phim chất lượng cao với gói Premium",
        children:
            "Premiums Movie (2022)",
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
                    <h1 className="text-white mb-2 font-bold uppercase">
                        INCLUDED IN ALL PLANS
                    </h1>
                    <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
                        All The TV You Love
                    </h1>
                    <p className="mx-auto w-full text-gray-500 lg:w-10/12 text-lg">
                        Watch full seasons of exclusive streaming series
                        , current-season episodes, hit movies, Hulu Originals, kids shows, and more.
                    </p>
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
                                className="group cursor-pointer position-relative rounded-xl overflow-hidden"
                            >
                                <div className="relative">
                                    <CategoryCard
                                        title={props.title}
                                        image={props.image}
                                    >
                                        {props.children}
                                    </CategoryCard>
                                    {/* Overlay effect */}
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 ease-in-out rounded-xl"></div>
                                </div>
                            </MotionDiv>
                        </Link>
                    ))}
                </div>
            </MotionDiv>

        </section>
    );
}

export default Category;
export { CategoryList };

// len