import { IBrand } from "@/types";
import Image from "next/image";

const BrandCard = ({ brand }: { brand: IBrand }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 hover:border-gray-200">
      {/* Logo container with centered brand logo */}
      <div className="relative h-32 w-full flex items-center justify-center p-4">
        {brand?.logo ? (
          <Image
            src={brand.logo}
            alt={brand.name || 'Brand logo'}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100px, 150px"
          />
        ) : (
          <div className="text-gray-300 text-lg font-medium">
            {brand.name || 'BRAND'}
          </div>
        )}
      </div>
      
      {/* Brand name - centered below logo */}
      {brand.name && (
        <h3 className="text-center font-medium text-gray-800 mt-2 line-clamp-1">
          {brand.name}
        </h3>
      )}
    </div>
  );
};

export default BrandCard;