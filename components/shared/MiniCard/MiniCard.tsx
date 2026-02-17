import { ReactNode } from "react";
import Title from "../Title/Title";

interface MiniCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  containerClass?: string;
  iconBgClass?: string;
  iconClass?: string;
  titleClass?: string;
  subtitleClass?: string;
}

export default function MiniCard({
  icon,
  title,
  description,
  containerClass = "flex flex-col items-start justify-start text-start border border-[#D1CEC6] rounded-lg py-5 px-6 md:px-5 hover:shadow-lg hover:bg-[#F8FAF9] hover:border-[#8F8A7E] transition-shadow duration-300",
  iconBgClass = "w-12 h-12 md:w-14 md:h-14 bg-[#A3C7B3] rounded-lg text-center",
  iconClass = "w-8 h-8 md:w-10 md:h-10 text-[#304C3E] font-normal flex items-center justify-center",
  titleClass = "text-(--primary-text-color) text-[18px] md:text-[24px] font-bold tracking-tight jost-600",
  subtitleClass = "text-(--primary-text-color) text-[13px] font-regular max-w-[400px] leading-relaxed mt-3",
}: MiniCardProps) {
  return (
    <div className={containerClass}>
      <div
        className={`${iconBgClass} flex items-center justify-center mb-6 md:mb-8`}>
        <div className={iconClass}>{icon}</div>
      </div>
      <Title
        title={title}
        subtitle={description}
        titleClass={titleClass}
        subtitleClass={subtitleClass}
      />
    </div>
  );
}
