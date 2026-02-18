import Accordion from "@/components/shared/Accordion/Accordion";
import Title from "@/components/shared/Title/Title";

export default function FAQ() {
  const communityData = [
    {
      title: "How do I search for properties on your site?",
      description:
        "You can use the search bar at the top of the homepage. Filter your search by location (Dhaka, Chittagong, etc.), property type (Apartment, Land, Commercial), price range, and size to find your ideal match.",
    },
    {
      title: "What information is provided for each listed property?",
      description:
        "Each property listing includes high-quality images, a detailed description, key features (number of bedrooms, bathrooms, etc.), price, location, and contact information for the seller or agent.",
    },
    {
      title: "How can I contact the real estate agent for a property?",
      description:
        "You can find the contact information for the agent or seller on the property listing page. There’s usually a phone number and email address provided, along with a contact form you can fill out to send a message directly through our website.",
    },
    {
      title: "Are there financing options available for home buyers?",
      description:
        "While we do not directly offer financing, we have partnerships with several reputable banks and financial institutions. We can connect you with trusted lenders who can assist you in securing a mortgage or home loan that fits your needs.",
    },
    {
      title: "Can I list my property for sale or rent on your platform?",
      description:
        "Yes! We welcome property owners and real estate agents to list their properties on our platform. You can create an account and follow the prompts to submit your property details, photos, and pricing information. Our team will review your listing before it goes live.",
    },
  ];
  return (
    <div>
      <Title
        title={"Faq"}
        titleClass={"text-[20px] md:text-[24px] jost-600 font-bold mb-4"}
      />
      <Accordion
        items={communityData}
        bgColor='bg-white'
        containerClass='rounded-2xl overflow-hidden '
        itemClass='border-[#D1CEC6]'
        titleClass='text-(--primary-text-color) !text-[18px] md:text-2xl font-medium'
        descriptionClass='text-[#70706C] !text-[14px] max-w-200 leading-relaxed'
        toggleClass='text-[#619B7F] text-2xl md:text-3xl font-light leading-none shrink-0 ml-4'
      />
    </div>
  );
}
