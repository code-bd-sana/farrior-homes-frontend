import { PropertyCards } from "@/components/dashboard/overview/PropertyCards";
import { QuickActions } from "@/components/dashboard/overview/QuickActions";
import { SavePropertyOverview } from "@/components/dashboard/overview/SavePropertyOverview";

export default function UserMainOverviewPage() {
  return (
    <div>
      <PropertyCards />
      <div className='mt-5 xl:flex gap-3'>
        <div className='xl:flex-1 mb-5 md:mb-0'>
          <SavePropertyOverview />
        </div>
        <div className='xl:flex-1'>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
