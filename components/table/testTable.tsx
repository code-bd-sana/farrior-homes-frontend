"use client";

import UnivarsalTable from "@/components/dashboard/univarsalTable/UnivarsalTable";
import { useState } from "react";
import { Action } from "../dashboard/univarsalTable/type";

const TestTablePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("old");

  // Columns definition
  const columns = [
    "Profile",
    "Profile Name",
    "Email Address",
    "Phone Number",
    "Address",
    "Subscription Status",
    "Property Own",
    "Property Buy",
    "Property Sell",
    "Rating",
    "Action",
  ];

  interface Data {
    profile?: string;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    subscriptionStatus: "premium" | "regular";
    propertyOwn: number;
    propertyBuy: number;
    propertySell: number;
    rating: number;
  }

  const action: Action = {
    text: "View Details",
    link: "/",
  };
  // Data definition with profile images and subscription status
  const data: Data[] = [
    {
      profile: "https://i.pravatar.cc/150?img=1",
      name: "Syed Rakib Hasan",
      phoneNumber: "+880 1234 5678",
      email: "rakib@example.com",
      address: "Cumilla, Bangladesh",
      subscriptionStatus: "premium",
      propertyOwn: 3,
      propertyBuy: 1,
      propertySell: 2,
      rating: 4.5,
    },
    {
      profile: "https://i.pravatar.cc/150?img=2",
      name: "John Doe",
      phoneNumber: "+1 234 567 890",
      email: "john@example.com",
      address: "New York, USA",
      subscriptionStatus: "regular",
      propertyOwn: 2,
      propertyBuy: 0,
      propertySell: 1,
      rating: 3.8,
    },
    {
      profile: "https://i.pravatar.cc/150?img=3",
      name: "Jane Smith",
      phoneNumber: "+44 123 456 789",
      email: "jane@example.co.uk",
      address: "London, UK",
      subscriptionStatus: "premium",
      propertyOwn: 5,
      propertyBuy: 2,
      propertySell: 3,
      rating: 4.9,
    },
    {
      profile: "https://i.pravatar.cc/150?img=4",
      name: "Alice Brown",
      phoneNumber: "+61 123 456 789",
      email: "alice@example.au",
      address: "Sydney, Australia",
      subscriptionStatus: "regular",
      propertyOwn: 1,
      propertyBuy: 1,
      propertySell: 0,
      rating: 4.2,
    },
    {
      profile: "https://i.pravatar.cc/150?img=5",
      name: "Robert Wilson",
      phoneNumber: "+49 123 456 789",
      email: "robert@example.de",
      address: "Berlin, Germany",
      subscriptionStatus: "premium",
      propertyOwn: 4,
      propertyBuy: 2,
      propertySell: 1,
      rating: 4.7,
    },
    {
      profile: "https://i.pravatar.cc/150?img=6",
      name: "Maria Garcia",
      phoneNumber: "+34 123 456 789",
      email: "maria@example.es",
      address: "Madrid, Spain",
      subscriptionStatus: "regular",
      propertyOwn: 2,
      propertyBuy: 0,
      propertySell: 2,
      rating: 4.0,
    },
    {
      profile: "https://i.pravatar.cc/150?img=7",
      name: "David Kim",
      phoneNumber: "+82 123 456 789",
      email: "david@example.kr",
      address: "Seoul, South Korea",
      subscriptionStatus: "premium",
      propertyOwn: 6,
      propertyBuy: 3,
      propertySell: 2,
      rating: 4.8,
    },
    {
      profile: "https://i.pravatar.cc/150?img=8",
      name: "Sarah Johnson",
      phoneNumber: "+1 987 654 321",
      email: "sarah@example.com",
      address: "Chicago, USA",
      subscriptionStatus: "regular",
      propertyOwn: 1,
      propertyBuy: 1,
      propertySell: 0,
      rating: 3.9,
    },
    {
      profile: "https://i.pravatar.cc/150?img=9",
      name: "Mohammed Ali",
      phoneNumber: "+20 123 456 789",
      email: "ali@example.eg",
      address: "Cairo, Egypt",
      subscriptionStatus: "premium",
      propertyOwn: 4,
      propertyBuy: 1,
      propertySell: 3,
      rating: 4.6,
    },
    {
      profile: "https://i.pravatar.cc/150?img=10",
      name: "Lisa Chen",
      phoneNumber: "+86 123 456 789",
      email: "lisa@example.cn",
      address: "Shanghai, China",
      subscriptionStatus: "regular",
      propertyOwn: 2,
      propertyBuy: 2,
      propertySell: 0,
      rating: 4.3,
    },
    {
      profile: "https://i.pravatar.cc/150?img=11",
      name: "Carlos Rodriguez",
      phoneNumber: "+52 123 456 789",
      email: "carlos@example.mx",
      address: "Mexico City, Mexico",
      subscriptionStatus: "premium",
      propertyOwn: 5,
      propertyBuy: 2,
      propertySell: 2,
      rating: 4.4,
    },
    {
      profile: "https://i.pravatar.cc/150?img=12",
      name: "Emma Watson",
      phoneNumber: "+44 987 654 321",
      email: "emma@example.co.uk",
      address: "Manchester, UK",
      subscriptionStatus: "regular",
      propertyOwn: 1,
      propertyBuy: 0,
      propertySell: 1,
      rating: 4.1,
    },
    {
      profile: "https://i.pravatar.cc/150?img=13",
      name: "Ahmed Hassan",
      phoneNumber: "+966 123 456 789",
      email: "ahmed@example.sa",
      address: "Riyadh, Saudi Arabia",
      subscriptionStatus: "premium",
      propertyOwn: 7,
      propertyBuy: 3,
      propertySell: 2,
      rating: 4.9,
    },
    {
      profile: "https://i.pravatar.cc/150?img=14",
      name: "Olga Petrova",
      phoneNumber: "+7 123 456 789",
      email: "olga@example.ru",
      address: "Moscow, Russia",
      subscriptionStatus: "regular",
      propertyOwn: 2,
      propertyBuy: 1,
      propertySell: 1,
      rating: 3.7,
    },
    {
      profile: "https://i.pravatar.cc/150?img=15",
      name: "Kenji Tanaka",
      phoneNumber: "+81 123 456 789",
      email: "kenji@example.jp",
      address: "Tokyo, Japan",
      subscriptionStatus: "premium",
      propertyOwn: 4,
      propertyBuy: 2,
      propertySell: 2,
      rating: 4.8,
    },
    {
      profile: "https://i.pravatar.cc/150?img=16",
      name: "Sophie Martin",
      phoneNumber: "+33 123 456 789",
      email: "sophie@example.fr",
      address: "Paris, France",
      subscriptionStatus: "regular",
      propertyOwn: 1,
      propertyBuy: 1,
      propertySell: 0,
      rating: 4.2,
    },
  ];

  // Pagination info
  const pagination = {
    currentPage,
    perPage: 5,
    total: data.length,
    totalPages: Math.ceil(data.length / 5),
  };

  // Controls (sort + pagination callback)
  const controls = {
    sortBy: [
      { label: "Sort by subscription status", value: "old" },
      { label: "Newest", value: "new" },
      { label: "Name A-Z", value: "nameAsc" },
      { label: "Name Z-A", value: "nameDesc" },
    ],
    selectedSort,
    onSortChange: (value: string) => {
      console.log("Sort changed to:", value);
      setSelectedSort(value);
    },
    onPageChange: (page: number) => {
      console.log("Page changed to:", page);
      setCurrentPage(page);
    },
  };

  // Slice data for current page (simulate backend pagination)
  const pagedData = data.slice(
    (currentPage - 1) * pagination.perPage,
    currentPage * pagination.perPage,
  );

  return (
    <div className='p-6 min-h-screen'>
      <UnivarsalTable
        title='User Management'
        columns={columns}
        data={pagedData}
        pagination={pagination}
        controls={controls}
        action={action}
      />
    </div>
  );
};

export default TestTablePage;
