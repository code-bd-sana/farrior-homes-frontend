import Title from "@/components/shared/Title/Title";
import ViewButton from "@/components/shared/ViewButton/ViewButton";
import Image from "next/image";

export default function AboutContent() {
  return (
    <div className='md:mx-12.5 px-6 lg:px-8 mt-12'>
      <div className='md:mx-24'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left Content */}
          <div className='flex flex-col justify-center'>
            <div className='flex items-center gap-3  bg-[#F4F8F6] w-max px-3 py-1 rounded-full'>
              <div className='w-2 h-2 rounded-full bg-[#5A7B6C]'></div>
              <p className='text-[#5A7B6C] text-sm font-medium'>Who We Are</p>
            </div>

            <Title
              title={"Crafting Your Real Estate Story with Expertise and Care"}
              subtitle={
                "We specialize in providing personalized real estate services in the South suburbs. With years of experience and a deep understanding of the local market, we guide our clients through every step of the buying, selling, or investing process."
              }
              titleClass={"text-3xl md:text-[48px] mt-5 max-w-[600px]"}
              subtitleClass={
                "text-xl md:text-[22px] text-[#70706C] max-w-[700px] jost-400 mt-5 md:mt-28"
              }
            />

            <ViewButton
              label='Explore Properties'
              href='/properties'
              className='mt-10'
            />
          </div>

          {/* Right Image */}
          <div className='relative w-full h-full min-h-125 lg:min-h-150 pl-3'>
            <div className='relative w-full h-full'>
              {/* Background shadow effect */}
              <div
                className='absolute inset-0 bg-linear-to-r from-[#619B7F] to-[#304C3E] rounded-4xl'
                style={{
                  transform: "rotate(2deg)",
                  top: "-8px",
                  left: "-20px",
                  right: "20px",
                  bottom: "8px",
                }}></div>

              {/* Main image container with rounded corners */}
              <div className='relative h-full rounded-4xl overflow-hidden shadow-2xl'>
                <Image
                  src='/about.jpg'
                  alt='Modern apartment building at sunset'
                  fill
                  className='object-cover'
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
