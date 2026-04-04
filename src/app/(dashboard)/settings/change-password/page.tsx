import type { Metadata } from "next";
import { ChangePassword } from "@/components/settings/change-password";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Change Password",
};

const ChangePasswordPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <ChangePassword />
    </div>
  );
};

export default ChangePasswordPage;
