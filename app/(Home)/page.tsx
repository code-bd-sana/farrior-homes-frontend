import BlogArticles from "@/components/home/BlogArticles";
import ClientSatisfaction from "@/components/home/ClientSatisfaction";
import DiscoverProperties from "@/components/home/Discover/DiscoverProperties";
import HomeBanner from "@/components/home/HomeBanner";
import MakeAJourney from "@/components/home/MakeAJourney";
import NeedForHome from "@/components/home/NeedForHome";
import RealStories from "@/components/home/real-stories";
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
        <RealStories />
        <BlogArticles />
      </div>
    </div>
  );
}
