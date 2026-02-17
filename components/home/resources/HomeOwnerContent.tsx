import ResourceGridSection from "@/components/shared/ResourceGridSection/ResourceGridSection";
import { AiOutlineSafety } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiKey } from "react-icons/fi";
import { IoDocumentTextOutline, IoSearchOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function HomeOwnerContent() {
  const homeownerTips = [
    {
      icon: <RiMoneyDollarCircleLine />,
      title: "Know Your Home's Value",
      description:
        "Stay informed with our property value tracker. Monitor local market data and local market data to track appreciation.",
    },
    {
      icon: <FiKey />,
      title: "Regular Maintenance",
      description:
        "Keep your home in top shape with our seasonal maintenance checklists and expert tips to prevent costly repairs.",
    },
    {
      icon: <FaArrowTrendUp />,
      title: "Home Improvement Ideas",
      description:
        "Discover budget-friendly renovation ideas and DIY projects to enhance your home's value and comfort.",
    },
    {
      icon: <IoSearchOutline />,
      title: "Energy Efficiency",
      description:
        "Save money and reduce your carbon footprint with our energy-saving tips and home efficiency guides.",
    },
    {
      icon: <AiOutlineSafety />,
      title: "Home Security",
      description:
        "Protect your home and loved ones with our comprehensive home security tips and recommendations.",
    },
    {
      icon: <IoDocumentTextOutline />,
      title: "Financial Planning",
      description:
        "Plan for the future with our financial advice on mortgages, refinancing, and home equity management.",
    },
  ];

  return (
    <ResourceGridSection
      title='Essential Homeowner Tips'
      subtitle='Practical advice to help you maintain, improve, and protect your most valuable asset'
      items={homeownerTips}
      bgColor='bg-[#F4F8F6]'
      gridCols='grid-cols-1 md:grid-cols-3'
    />
  );
}
