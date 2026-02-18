import DashboardLContent from "@/components/dashboard/DashboardLContent";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React from "react";

const page = () => {
  return (
    <div>
      <div className='   '>
        <div className='flex flex-col md:grid md:grid-cols-12 gap-9 '>
          <div className='hidden md:block md:col-span-3'>
            <DashboardSidebar />
          </div>
          <div className='md:col-span-9 pt-8'>
            <DashboardLContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
