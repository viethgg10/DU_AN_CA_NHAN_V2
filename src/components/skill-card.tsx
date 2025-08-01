import { Card, CardBody, Typography } from "@material-tailwind/react";
import Image from "next/image";

interface SkillCardProps {
  title: string;
  icon?: React.ElementType;
  image?: string;
  children: React.ReactNode;
}

export function SkillCard({ icon: Icon, image, title, children }: SkillCardProps) {
  return (
    <Card color="transparent" shadow={false} className="overflow-hidden">
      <CardBody className="p-0">
        {/* Image or Icon container */}
        <div className="relative h-48 w-full  mx-auto mb-4">
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
        <div className="px-4 pb-4 text-left">
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

export default SkillCard;
