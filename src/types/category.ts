// types/category.ts
export interface CategoryType {
    id: number;
    image: string;
    banner: string;
    title: string;
    description: string;
    children: string;
}

export const CategoryList: CategoryType[] = [
    {
        id: 1,
        image: "/image/imageC1.png",
        banner: "/image/bannerC4.png",
        title: "New & Classic",
        description: "Khám phá những bộ phim mới nhất và kinh điển",
        children: "Movie (2024)",
    },
    {
        id: 2,
        image: "/image/imageC2.png",
        banner: "/image/bannerC2.png", // Thêm banner cho thể loại
        title: "Groundbreaking",
        description: "Những tác phẩm đột phá độc quyền trên Hulu",
        children:
            "Hulu Originals Movie (2024)",
    },
    {
        id: 3,
        image: "/image/imageC3.png",
        banner: "/image/bannerC3.png", // Thêm banner cho thể loại
        title: "Add-on",
        description: "Trải nghiệm phim chất lượng cao với gói Premium",
        children:
            "Premiums Movie (2022)",
    }
];