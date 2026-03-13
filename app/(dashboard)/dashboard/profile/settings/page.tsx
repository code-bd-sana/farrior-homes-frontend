import NotificationPage from "@/components/shared/NotificationPage/NotificationPage";
import { getCurrentUserFromTokenAction } from "@/services/auth";
import { ReactNode } from "react";

export default async function UserProfileSettingsPage({
  children,
}: {
  children: ReactNode;
}) {
    const authState =await  getCurrentUserFromTokenAction();

  return (
    <div className='border border-[#D1CEC6] rounded-lg p-4 md:p-6'>
      <NotificationPage userRole={authState.userRole} />
    </div>
  );
}
