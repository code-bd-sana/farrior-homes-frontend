import { Home, Star, Users } from "lucide-react";
import Title from "../shared/Title/Title";

export default function ClientSatisfaction() {
  const clientSatisfactionData = [
    {
      title: "100%",
      description: "Focused on Your Next Move",
      icon: Home,
    },
    {
      title: "200M+",
      description: "Dreams in Progress",
      icon: Users,
    },
    {
      title: "5-Star",
      description: "Service, Every Step of the Way",
      icon: Star,
    },
  ];

  return (
    <div className='bg-(--primary) py-12.5 my-16 md:my-20'>
      <div className='text-white flex flex-col items-center justify-center text-center px-4 md:px-8'>
        <Title
          title='Advocating for Your Ideal Living in the South Suburbs'
          titleClass='max-w-[750px] text-3xl sm:text-4xl md:text-[48px] font-bold leading-tight mb-12 md:mb-16'
        />
      </div>
      <div className='max-w-350 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20 px-6 md:px-12 lg:px-20'>
        {clientSatisfactionData.map((item, idx) => (
          <div
            key={idx}
            className='flex flex-col items-center justify-between text-center'>
            <div className='w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center mb-6 md:mb-8'>
              <item.icon className='w-6 h-6 md:w-7 md:h-7 text-(--primary) font-normal' />
            </div>

            <Title
              title={item.title}
              subtitle={item.description}
              titleClass='text-white text-5xl md:text-[64px] font-bold tracking-tight '
              subtitleClass='text-white text-lg md:text-[24px] lg:text-2xl font-light max-w-[280px] md:max-w-[250px] leading-relaxed'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
