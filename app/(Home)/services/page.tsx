import SubscriptionContent from "@/components/dashboard/subscription/SubscriptionContent";
import HowItWorks from "@/components/home/services/HowItWorks";
import ServiceCard from "@/components/home/services/ServiceCard";
import PageTitle from "@/components/shared/pagetitle/PageTitle";
import Title from "@/components/shared/Title/Title";

export default function page() {
  return (
    <div>
      <PageTitle
        title='Our Services'
        subtitle='Comprehensive real estate solutions tailored to your needs. From buying and selling to management and consulting, we’ve got you covered.'
      />
      <div className='md:mx-12.5 px-6 lg:px-8 mt-10'>
        <ServiceCard />
      </div>
      <HowItWorks />
      <div className='py-12 md:px-35 px-6 '>
        <Title
          title={"Choose Your Plan"}
          subtitle={
            "Select the perfect plan for your real estate journey. Upgrade or downgrade at any time."
          }
          titleClass={"text-4xl md:text-[64px] text-center "}
          subtitleClass={
            "text-xl md:text-[24px] text-[#70706C] max-w-[700px] jost-400 max-w-4xl mx-auto text-center "
          }
        />
        <div className='md:px-60 md:ml-35 mt-7 md:mt-12 -mb-6'>
          <SubscriptionContent />
        </div>
      </div>
    </div>
  );
}
