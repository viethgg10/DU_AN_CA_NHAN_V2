import HeroSection from "@/components/HeroSection";
import { CategoryList } from '@/types/category';
import { notFound } from 'next/navigation';
import ListMovie from '../../list-movie';

export default function MovieDetail({ params }: { params: { id: string } }) {
    // Tìm thể loại phim dựa trên ID
    const category = CategoryList.find(item => item.id.toString() === params.id);

    // Nếu không tìm thấy thể loại, hiển thị 404
    if (!category) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section với banner tương ứng */}
            <div
                className="relative h-[60vh] w-full"
                style={{
                    backgroundImage: `url(${category.banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <div className="container mx-auto h-full flex items-center relative z-10 px-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {category.title}
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            {category.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Nội dung chi tiết */}
            <div className="container mx-auto py-12 px-4">
                <h2 className="text-3xl font-bold text-white mb-8">
                    Danh sách phim {category.title}
                </h2>
                <ListMovie categoryId={category.id} />
            </div>
        </div>
    );
}