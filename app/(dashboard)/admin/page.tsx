import DashboardComp from "@/components/admin/Dashboard/DashboardComp";
import RecentCreatedProperties from "@/components/admin/Dashboard/RecentCreatedProperties";

const page = () => {
  return (
    <div>
      <DashboardComp />
      <RecentCreatedProperties />
    </div>
  );
};

export default page;
