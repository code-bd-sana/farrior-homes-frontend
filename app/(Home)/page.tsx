import BlogArticles from "@/components/home/BlogArticles";
import ClientSatisfaction from "@/components/home/ClientSatisfaction";
import DiscoverProperties from "@/components/home/Discover/DiscoverProperties";
import HomeBanner from "@/components/home/HomeBanner";
import MakeAJourney from "@/components/home/MakeAJourney";
import NeedForHome from "@/components/home/NeedForHome";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <div>
      <div>
        <HomeBanner />
        <DiscoverProperties />
        <ClientSatisfaction />
        <NeedForHome />
        <MakeAJourney />
        <WhyChooseUs />
        <BlogArticles />
      </div>
    </div>
  );
}
