import ProfilePage from "@/components/shared/ProfilePage/ProfilePage";
import { getUserProfileAction } from "@/actions/auth.action";

// TODO: Make this page protected by checking the token and redirecting to login if not authenticated. This can be done by creating a higher-order component (HOC) or using middleware to check authentication before rendering the page.

export default async function UserProfilePage() {
  const profile = await getUserProfileAction();

  return (
    <div>
      <ProfilePage initialProfile={profile} />
    </div>
  );
}
