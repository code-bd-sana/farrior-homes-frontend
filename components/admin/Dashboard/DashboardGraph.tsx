import DashboardLeftGraph from "./DashboardLeftGraph";
import DashboardRightGraph from "./DashboardRightGraph";

export default function DashboardGraph() {
  return (
    <div className='mt-10'>
      <div className='flex flex-col lg:grid grid-cols-12 gap-6'>
        <div className='col-span-7 border border-[#D1CEC6] rounded-lg py-5 px-6 md:px-5'>
          <DashboardLeftGraph />
        </div>
        <div className='col-span-5'>
          <DashboardRightGraph />
        </div>
      </div>
    </div>
  );
}
