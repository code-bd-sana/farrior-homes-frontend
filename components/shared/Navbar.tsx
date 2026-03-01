import {
  getCurrentUserFromTokenAction,
  type AuthNavbarState,
} from "@/actions/auth.action";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  let initialAuthState: AuthNavbarState = {
    isLoggedIn: false,
    userRole: "user",
  };

  try {
    initialAuthState = await getCurrentUserFromTokenAction();
  } catch {
    initialAuthState = {
      isLoggedIn: false,
      userRole: "user",
    };
  }

  return <NavbarClient initialAuthState={initialAuthState} />;
}
