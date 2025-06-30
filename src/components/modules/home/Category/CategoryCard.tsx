import { ICategory } from "@/types";
import Image from "next/image";
import cartIcon from "@/assets/images/cart-icon.png"

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div className="group relative bg-white/80 border border-gray-100 rounded-xl text-center p-4 h-36 transition-all duration-200 hover:bg-white hover:shadow-md hover:border-primary/30 hover:ring-1 hover:ring-primary/10">
      {/* Light colored background layer */}
      <div className="absolute inset-0 bg-primary/5 rounded-xl group-hover:bg-primary/15 transition-colors duration-200 -z-10" />
      
      <div className="w-16 h-16 mx-auto transition-transform duration-200 group-hover:scale-105">
        <Image
          src={category?.icon || cartIcon}
          width={64}
          height={64}
          alt={`${category?.name} icon`}
          className="w-full h-full object-contain"
        />
      </div>
      
      <h3 className="text-sm font-medium mt-2 transition-colors duration-200 group-hover:text-primary line-clamp-1">
        {category?.name}
      </h3>
      
      {/* Animated underline */}
      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]" />
    </div>
  );
};

export default CategoryCard;