"use client";

import { Logout01Icon } from "hugeicons-react";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const LogoutButton = ({
  size = "default",
}: {
  size?:
    | "xs"
    | "sm"
    | "default"
    | "lg"
    | "icon-xs"
    | "icon-sm"
    | "icon"
    | "icon-lg";
}) => {
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
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
