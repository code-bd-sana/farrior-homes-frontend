import { ReactNode } from "react";
import Title from "../Title/Title";
import MiniCard from "../MiniCard/MiniCard";

export interface CardItem {
  icon: ReactNode;
  title: string;
  description: string;
}

interface ResourceGridSectionProps {
  title: string;
  subtitle: string;
  items: CardItem[];
  bgColor?: string;
  gridCols?: string;
  titleClass?: string;
  subtitleClass?: string;
  cardContainerClass?: string;
}

export default function ResourceGridSection({
  title,
  subtitle,
  items,
  bgColor = "bg-white",
  gridCols = "grid-cols-1 md:grid-cols-3",
  titleClass = "max-w-[550px] text-3xl sm:text-4xl md:text-[48px] font-bold leading-tight mb-[16px]",
  subtitleClass = "text-lg max-w-150 text-xl md:text-[24px] mb-6 md:mb-7 max-w-[680px] text-[#70706C]",
  cardContainerClass = "py-12 md:my-20 md:mx-12.5 px-6 lg:px-9 mt-12 mb-6",
}: ResourceGridSectionProps) {
  return (
    <div className={bgColor}>
      <div className={cardContainerClass}>
        <div className='text-(--primary-text-color) flex flex-col items-center justify-center text-center px-4 md:px-8'>
          <div className='flex flex-col items-center justify-center text-center px-4 md:px-8 mb-10'>
            <Title
              title={title}
              titleClass={titleClass}
              subtitle={subtitle}
              subtitleClass={subtitleClass}
            />
          </div>
        </div>
        <div className={`grid ${gridCols} gap-6`}>
          {items.map((item, index) => (
            <MiniCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
