"use client";

import UnivarsalTable from "@/components/dashboard/univarsalTable/UnivarsalTable";
import { useState } from "react";

const TestTablePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("old");

  // Columns definition
  const columns = ["Name", "PhoneNumber", "Email", "Address"];

  interface Data {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
  }

  // Data definition
  const data: Data[] = [
    {
      name: "Syed Rakib Hasan",
      phoneNumber: "+880 1234 5678",
      email: "rakib@example.com",
      address: "Cumilla, Bangladesh",
    },
    {
      name: "John Doe",
      phoneNumber: "+1 234 567 890",
      email: "john@example.com",
      address: "New York, USA",
    },
    {
      name: "Jane Smith",
      phoneNumber: "+44 123 456 789",
      email: "jane@example.co.uk",
      address: "London, UK",
    },
    {
      name: "Alice Brown",
      phoneNumber: "+61 123 456 789",
      email: "alice@example.au",
      address: "Sydney, Australia",
    },
    {
      name: "Syed Rakib Hasan",
      phoneNumber: "+880 1234 5678",
      email: "rakib@example.com",
      address: "Cumilla, Bangladesh",
    },
    {
      name: "John Doe",
      phoneNumber: "+1 234 567 890",
      email: "john@example.com",
      address: "New York, USA",
    },
    {
      name: "Jane Smith",
      phoneNumber: "+44 123 456 789",
      email: "jane@example.co.uk",
      address: "London, UK",
    },
    {
      name: "Alice Brown",
      phoneNumber: "+61 123 456 789",
      email: "alice@example.au",
      address: "Sydney, Australia",
    },
    {
      name: "Syed Rakib Hasan",
      phoneNumber: "+880 1234 5678",
      email: "rakib@example.com",
      address: "Cumilla, Bangladesh",
    },
    {
      name: "John Doe",
      phoneNumber: "+1 234 567 890",
      email: "john@example.com",
      address: "New York, USA",
    },
    {
      name: "Jane Smith",
      phoneNumber: "+44 123 456 789",
      email: "jane@example.co.uk",
      address: "London, UK",
    },
    {
      name: "Alice Brown",
      phoneNumber: "+61 123 456 789",
      email: "alice@example.au",
      address: "Sydney, Australia",
    },
    {
      name: "Syed Rakib Hasan",
      phoneNumber: "+880 1234 5678",
      email: "rakib@example.com",
      address: "Cumilla, Bangladesh",
    },
    {
      name: "John Doe",
      phoneNumber: "+1 234 567 890",
      email: "john@example.com",
      address: "New York, USA",
    },
    {
      name: "Jane Smith",
      phoneNumber: "+44 123 456 789",
      email: "jane@example.co.uk",
      address: "London, UK",
    },
    {
      name: "Alice Brown",
      phoneNumber: "+61 123 456 789",
      email: "alice@example.au",
      address: "Sydney, Australia",
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
    <div className='p-6  min-h-screen'>
      <UnivarsalTable
        title='User Management'
        columns={columns}
        data={pagedData}
        pagination={pagination}
        controls={controls}
      />
    </div>
  );
};

export default TestTablePage;
