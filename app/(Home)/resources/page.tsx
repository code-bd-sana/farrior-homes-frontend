import NeedForHome from "@/components/home/NeedForHome";
import BuyerContent from "@/components/home/resources/BuyerContent";
import HomeOwnerContent from "@/components/home/resources/HomeOwnerContent";
import InvestmentContent from "@/components/home/resources/InvestmentContent";
import PageTitle from "@/components/shared/pagetitle/PageTitle";
import Title from "@/components/shared/Title/Title";

export default function page() {
  return (
    <div>
      <PageTitle
        title='Your Complete Guide'
        subtitle='Whether you’re a homeowner, renter, or investor, we have the resources and expertise to help you make informed decisions in the real estate market.'
      />
      <Title
        title='Resources for Everyone'
        subtitle='Access expert guides, tools, and insights tailored to your unique real estate needs'
        titleClass='text-3xl md:text-[48px] text-center mt-6 mb-3'
        subtitleClass='text-lg md:text-[23px] text-center text-[#70706C] max-w-4xl mx-auto px-3'
      />
      <div className='-mt-4'>
        <NeedForHome showTitle={false} showButton={false} />
      </div>
      <HomeOwnerContent />
      <BuyerContent />
      <InvestmentContent />
    </div>
  );
}
