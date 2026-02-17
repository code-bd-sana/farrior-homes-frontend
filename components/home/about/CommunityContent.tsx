import MiniCard from "@/components/shared/MiniCard/MiniCard";
import Title from "@/components/shared/Title/Title";
import { GrMap } from "react-icons/gr";
import { LuFileBadge, LuHandshake } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function CommunityContent() {
  const communityData = [
    {
      icon: LuFileBadge,
      title: "Local Market Authority",
      description:
        "With over 15 years serving the South Suburbs, we possess unmatched knowledge of neighborhoods, market trends, and property values to guide your investment decisions.",
    },
    {
      icon: LuHandshake,
      title: "Client-First Advocacy",
      description:
        "Your goals are our priority. We listen, advise, and negotiate tirelessly to ensure you get the best possible outcome, whether buying or selling.",
    },
    {
      icon: GrMap,
      title: "Dedicated Community Support",
      description:
        "Beyond real estate, we're committed to strengthening our community through local partnerships, events, and initiatives that make the South Suburbs a better place to live.",
    },
    {
      icon: RiMoneyDollarCircleLine,
      title: "Seamless Transaction Support",
      description:
        "From initial consultation to closing day, we handle every detail of the process—inspections, paperwork, negotiations—so you can focus on your future.",
    },
  ];
  return (
    <div className='md:mx-12.5 px-6 lg:px-8 mt-12 mb-6'>
      <div className='md:mx-24'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center justify-between'>
          {/* Left Content */}
          <div className='flex flex-col justify-center cols-span-1 md:col-span-4'>
            <div className='flex items-center gap-3  bg-[#F4F8F6] w-max px-3 py-1 rounded-full'>
              <div className='w-2 h-2 rounded-full bg-[#5A7B6C]'></div>
              <p className='text-[#5A7B6C] text-sm font-medium'>
                Why Choose Us
              </p>
            </div>

            <Title
              title={"The South Suburbs Experts and Community Advocates"}
              subtitle={
                "Choose the brokerage that is deeply invested in the South Suburbs. Our team offers specialized local knowledge, unparalleled dedication to clients, and a commitment to reinvesting in the neighborhoods we serve."
              }
              titleClass={"text-3xl md:text-[48px] mt-5 max-w-[600px]"}
              subtitleClass={
                "text-xl md:text-[22px] text-[#70706C] max-w-[700px] jost-400 mt-5 md:mt-28"
              }
            />
          </div>

          {/* Right Image */}
          <div className='cols-span-1 md:col-span-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {communityData.map((item, index) => (
                <MiniCard
                  key={index}
                  icon={<item.icon />}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
