import AboutContent from "@/components/home/about/AboutContent";
import CommunityContent from "@/components/home/about/CommunityContent";
import OfferContent from "@/components/home/about/OfferContent";
import BlogArticles from "@/components/home/BlogArticles";
import ClientSatisfaction from "@/components/home/ClientSatisfaction";
import PageTitle from "@/components/shared/pagetitle/PageTitle";
import Title from "@/components/shared/Title/Title";

export default function page() {
  return (
    <div>
      <PageTitle
        title='About'
        subtitle='Where Your Real Estate Journey Begins'
      />
      <AboutContent />
      <ClientSatisfaction />
      <CommunityContent />
      <OfferContent />
      <div className='bg-[#619B7F] text-center py-14 md:py-20 p-4'>
        <Title
          title={"Crafting Your Ideal Home for a Better Tomorrow"}
          titleClass='text-3xl md:text-[48px] text-white max-w-[700px] mx-auto pb-5'
          subtitle={
            "Ready to start your real estate journey? Whether you’re buying your first home, selling a cherished property, or investing in your future, we’re here to make it seamless and rewarding."
          }
          subtitleClass='text-lg md:text-[23px] text-white jost-400 max-w-4xl mx-auto'></Title>
      </div>
      <BlogArticles showTitle={false} />
    </div>
  );
}
