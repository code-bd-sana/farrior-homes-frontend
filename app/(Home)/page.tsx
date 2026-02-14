import ClientSatisfaction from "@/components/home/ClientSatisfaction";
import DiscoverProperties from "@/components/home/Discover/DiscoverProperties";
import HomeBanner from "@/components/home/HomeBanner";

export default function HomePage() {
  return (
    <div>
      <div>
        <HomeBanner />
        <DiscoverProperties />
        <ClientSatisfaction />
      </div>
    </div>
  );
}
