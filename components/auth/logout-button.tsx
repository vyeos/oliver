import { Logout01Icon } from "hugeicons-react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/store/useUserStore";

const LogoutButton = ({
  size,
}: {
  size:
    | "xs"
    | "sm"
    | "default"
    | "lg"
    | "icon-xs"
    | "icon-sm"
    | "icon"
    | "icon-lg";
}) => {
  const { clearUser } = useUserStore();
  const handleLogout = () => {
    authClient.signOut();
    clearUser();
  };
  return (
    <Button variant="destructive" size={size} onClick={handleLogout}>
      <Logout01Icon className="size-4" />
      Log Out
    </Button>
  );
};

export default LogoutButton;
