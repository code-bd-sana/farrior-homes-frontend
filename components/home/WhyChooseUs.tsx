import { BadgeCheck, ShieldCheck, TrendingUp, Users } from "lucide-react";
import Title from "../shared/Title/Title";

export default function WhyChooseUs() {
  const clientSatisfactionData = [
    {
      title: "Trusted & Secure",
      description:
        "Your security is our priority with verified listings and secure transactions.",
      icon: ShieldCheck,
    },
    {
      title: "Award Winning",
      description:
        "Recognized as the leading real estate platform for 5 consecutive years.",
      icon: BadgeCheck,
    },
    {
      title: "Expert Agents",
      description:
        "Work with certified professionals who know the market inside out.",
      icon: Users,
    },
    {
      title: "Best Prices",
      description:
        "Get the best deals with our comprehensive market analysis and insights.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className='py-12.5 my-16 md:my-20'>
      <div className='flex flex-col items-center justify-center text-center px-4 md:px-8 mb-10'>
        <Title
          title={"Why Choose Us"}
          subtitle={"The South Suburbs Experts and Community Advocates"}
          titleClass={
            "max-w-[750px] text-[35px] md:text-[48px] font-bold leading-tight"
          }
          subtitleClass={
            "text-lg md:text-[24px] mb-6 md:mb-7 max-w-[500px] mt-2 "
          }
        />
      </div>
      <div className='max-w-450 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
        {clientSatisfactionData.map((item, idx) => (
          <div
            key={idx}
            className='flex flex-col items-center justify-center text-center'>
            <div className='w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 md:mb-8'>
              <item.icon className='w-14 h-14 text-(--primary) bg-[#A3C7B3] rounded-full p-3.75 font-normal' />
            </div>

            <Title
              title={item.title}
              subtitle={item.description}
              titleClass='text-[24px] font-bold tracking-tight jost-400'
              subtitleClass='text-[14px]! font-light max-w-[350px] leading-relaxed'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
