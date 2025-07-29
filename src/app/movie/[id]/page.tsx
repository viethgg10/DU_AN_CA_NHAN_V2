import HeroSection from "@/components/HeroSection";

export default function MovieDetail({ params }: { params: { id: string } }) {
    // Lấy thông tin phim dựa trên id
    // const movie = await getMovieById(params.id);

    // Dữ liệu mẫu
    const movieData = {
        title: "Tên phim",
        description: "Mô tả ngắn về phim",
        backgroundImage: "/image/banner2.png" // Đường dẫn ảnh nền
    };

    return (
        <div className="min-h-screen bg-black">
            <HeroSection
                title={movieData.title}
                description={movieData.description}
                backgroundImage={movieData.backgroundImage}
                showEmailForm={false}
            />

            {/* Phần nội dung chi tiết phim */}
            <div className="container mx-auto py-12 px-4 text-white">
                <h2 className="text-3xl font-bold mb-6">Thông tin chi tiết phim</h2>
                <p>ID phim: {params.id}</p>
                {/* Thêm các thông tin khác của phim ở đây */}
            </div>
        </div>
    );
}