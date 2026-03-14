import NotificationPage from "@/components/shared/NotificationPage/NotificationPage";
import { getCurrentUserFromTokenAction } from "@/services/auth";
import { ReactNode } from "react";

export default async function page({
  children,
}: {
  children: ReactNode;
}) {
    const authState = await getCurrentUserFromTokenAction();

  return (
    <div>
      <NotificationPage userRole={authState.userRole} />
    </div>
  );
}
