import Image from "next/image";
import Title from "../shared/Title/Title";
import ViewButton from "../shared/ViewButton/ViewButton";

export default function MakeAJourney() {
  return (
    <div className='md:mx-12.5'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 my-16 md:my-20 px-4 md:px-8 '>
        <div className='md:col-span-4 bg-[#304C3E] text-white px-8 py-14 md:py-26 rounded-lg md:rounded-r-none'>
          <Title
            title={"Your South Suburbs Dream Home Awaits"}
            subtitle={
              "As your local real estate specialists, we provide expert guidance and unparalleled market knowledge right where you need it. Let us help you find the perfect place to put down roots in our thriving communities"
            }
            titleClass={
              "text-3xl font-bold jost-400 mb-[70px] md:mb-[130px] max-w-[400px]"
            }
            subtitleClass={
              "text-[13px] font-normal jost-400 max-w-[460px] leading-relaxed"
            }
          />
          <ViewButton
            label='Make a Journey'
            href='/properties'
            className='bg-white! text-(--primary)! mt-8'
          />
        </div>
        <div className='hidden md:flex md:col-span-8'>
          <div className='relative w-full h-screen md:h-full'>
            <Image
              src='/hero.jpg'
              alt='Make a Journey'
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-cover w-full h-full rounded-lg md:rounded-l-none'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
