import { Card, CardBody, Typography } from "@material-tailwind/react";
import Image from "next/image";

interface CategoryCardProps {
  title: string;
  icon?: React.ElementType;
  image?: string;
  children: React.ReactNode;
}

export function CategoryCard({ icon: Icon, image, title, children }: CategoryCardProps) {
  return (
    <Card color="transparent" shadow={false} className="overflow-hidden">
      <CardBody className="p-0">
        {/* Image or Icon container */}
        <div className="relative h-48 mx-auto" style={{ height: '480px' }}>
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-t-lg"
            />
          ) : Icon ? (
            <div className="h-full w-full bg-gray-900 flex items-center justify-center rounded-t-lg">
              <Icon className="h-16 w-16 text-white" strokeWidth={2} />
            </div>
          ) : (
            <div className="h-full w-full bg-gray-800 rounded-t-lg"></div>
          )}
        </div>

        {/* Text content */}
        <div className="px-4 pb-4 text-left"
          style={{ position: 'absolute', top: '20px' }}>
          <Typography variant="h5" color="white" className="mb-2 font-bold">
            {title}
          </Typography>
          <Typography className="font-normal text-gray-400 text-sm">
            {children}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}

export default CategoryCard;
