import ResourceGridSection from "@/components/shared/ResourceGridSection/ResourceGridSection";
import { AiOutlineSafety } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { IoIosTrendingUp } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function InvestmentContent() {
  const buyerTips = [
    {
      icon: <IoIosTrendingUp />,
      title: "Diversify Your Portfolio",
      description:
        "Balance risk across different property types and locations to minimize risk and maximize returns.",
    },
    {
      icon: <RiMoneyDollarCircleLine />,
      title: "Know Your Home's Value",
      description:
        "Research comparable properties and current market value. Use our tools and local market data to track appreciation.",
    },
    {
      icon: <FiMapPin />,
      title: "Research Neighborhoods",
      description:
        "Investigate local schools, crime rates, amenities, and future development plans. Visit at different times of day.",
    },
    {
      icon: <IoDocumentTextOutline />,
      title: "Understand Your Lease",
      description:
        "Read every clause carefully. Know the terms for renewal, breaking the lease, security deposits, and lease termination responsibilities.",
    },
    {
      icon: <AiOutlineSafety />,
      title: "Know Your Rights",
      description:
        "Familiarize yourself with local tenant protection laws, fair housing regulations, and your landlord's legal obligations.",
    },
    {
      icon: <HiOutlineDocumentCheck />,
      title: "Document Everything",
      description:
        "Take photos during move-ins, keep copies of all communication, and document any repairs and all expenses for tax tenancy.",
    },
  ];

  return (
    <div className='-mt-8 -mb-7 md:-mb-22'>
      <ResourceGridSection
        title='Investment Strategies'
        subtitle='Proven approaches to help you build and grow your real estate investment portfolio'
        bgColor='bg-[#F4F8F6]'
        items={buyerTips}
        gridCols='grid-cols-1 md:grid-cols-3'
      />
    </div>
  );
}
