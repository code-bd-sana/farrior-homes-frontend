import DashboardLContent from "@/components/dashboard/DashboardLContent";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function page() {
  return (
    <div className='md:mx-12.5 px-6 lg:px-8 py-13 '>
      <div className='flex flex-col md:grid md:grid-cols-12 gap-10 '>
        <div className='hidden md:block md:col-span-3'>
          <DashboardSidebar />
        </div>
        <div className='md:col-span-9'>
          <DashboardLContent />
        </div>
      </div>
    </div>
  );
}
