import ResourceGridSection from "@/components/shared/ResourceGridSection/ResourceGridSection";
import { AiOutlineSafety } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { IoIosTimer } from "react-icons/io";
import {
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function BuyerContent() {
  const buyerTips = [
    {
      icon: <RiMoneyDollarCircleLine />,
      title: "Set Your Budget",
      description:
        "Calculate what you can afford including rent, utilities, and insurance. Aim for 30% or less of your income.",
    },
    {
      icon: <FiMapPin />,
      title: "Research Neighborhoods",
      description:
        "Consider commute times, safety, amenities, and local development plans. Visit at different times of day.",
    },
    {
      icon: <AiOutlineSafety />,
      title: "Know Your Rights",
      description:
        "Familiarize yourself with local tenant protection laws, fair housing regulations, and your landlord's obligations.",
    },
    {
      icon: <IoDocumentTextOutline />,
      title: "Document Everything",
      description:
        "Take photos during move-in, keep copies of all communication, and document any issues that arise during tenancy.",
    },
    {
      icon: <IoIosTimer />,
      title: "Build Rental History",
      description:
        "Pay on time, maintain the property well, and build a positive relationship with your landlord for strong references.",
    },
    {
      icon: <IoCheckmarkCircleOutline />,
      title: "Understand Lease",
      description:
        "Read every clause carefully. Know the terms for renewal, breaking the lease, security deposits, and maintenance responsibilities.",
    },
  ];

  return (
    <div className='-mt-8'>
      <ResourceGridSection
        title='Essential Buyer Tips'
        subtitle='Practical advice to help you maintain, improve, and protect your most valuable asset'
        items={buyerTips}
        gridCols='grid-cols-1 md:grid-cols-3'
      />
    </div>
  );
}
