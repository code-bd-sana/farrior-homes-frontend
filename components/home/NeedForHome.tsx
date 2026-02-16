import { Home, Key, TrendingUp } from "lucide-react";
import Title from "../shared/Title/Title";
import ViewButton from "../shared/ViewButton/ViewButton";

export default function NeedForHome() {
  const needForHomeData = [
    {
      title: "Home Buying",
      description:
        "Expert Guidance Through  every step of purchasing your dream home",
      icon: Home,
    },
    {
      title: "Home Selling",
      description:
        "Expert Guidance Through  every step of purchasing your dream home",
      icon: Key,
    },
    {
      title: "Property Valuation",
      description:
        "Expert Guidance Through  every step of purchasing your dream home",
      icon: TrendingUp,
    },
  ];
  return (
    <div className='my-16 md:my-20 '>
      <div className='text-(--primary-text-color) flex flex-col items-center justify-center text-center px-4 md:px-8'>
        <Title
          title='Everything You Need for Your Home'
          titleClass='max-w-[450px] text-3xl sm:text-4xl md:text-[48px] font-bold leading-tight mb-[16px]'
          subtitle='From Finding your Perfect property to maintaining it for years to come, we’ve got you covered'
          subtitleClass='text-lg max-w-150 text-xl md:text-[24px] mb-6 md:mb-7 max-w-[830px]'
        />
      </div>
      <div className='max-w-350 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 px-6 md:px-12 '>
        {needForHomeData.map((item, idx) => (
          <div
            key={idx}
            className='flex flex-col items-start justify-start text-start border border-[#D1CEC6] rounded-lg py-5 px-6 md:px-5 hover:shadow-lg hover:bg-[#F8FAF9] hover:border-[#8F8A7E] transition-shadow duration-300'>
            <div className='w-12 h-12 md:w-14 md:h-14 bg-[#A3C7B3] rounded-lg flex items-center justify-center mb-6 md:mb-8'>
              <item.icon className='w-6 h-6 md:w-7 md:h-7 text-[#304C3E] font-normal ' />
            </div>
            <Title
              title={item.title}
              subtitle={item.description}
              titleClass='text-(--primary-text-color) text-[18px] md:text-[24px] font-bold tracking-tight jost-600'
              subtitleClass='text-(--primary-text-color) text-[13px] font-regular max-w-[300px] leading-relaxed'
            />
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center text-center mt-6'>
        <ViewButton label='View Services' href='/services' />
      </div>
    </div>
  );
}
