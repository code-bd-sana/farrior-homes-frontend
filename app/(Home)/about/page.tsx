import AboutContent from "@/components/about/AboutContent";
import ClientSatisfaction from "@/components/home/ClientSatisfaction";
import PageTitle from "@/components/shared/pagetitle/PageTitle";

export default function page() {
  return (
    <div>
      <PageTitle
        title='About'
        subtitle='Where Your Real Estate Journey Begins'
      />
      <AboutContent />
      <ClientSatisfaction />
    </div>
  );
}
