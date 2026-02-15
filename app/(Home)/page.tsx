import ClientSatisfaction from "@/components/home/ClientSatisfaction";
import DiscoverProperties from "@/components/home/Discover/DiscoverProperties";
import HomeBanner from "@/components/home/HomeBanner";
import NeedForHome from "@/components/home/NeedForHome";

export default function HomePage() {
  return (
    <div>
      <div>
        <HomeBanner />
        <DiscoverProperties />
        <ClientSatisfaction />
        <NeedForHome />
      </div>
    </div>
  );
}
