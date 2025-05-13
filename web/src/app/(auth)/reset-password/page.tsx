import ResetPasswordForm from "@/common/components/forms/ResetPasswordForm";
import { PageSearchParamsWithToken } from "@/common/types";

export const metadata = {
  title: `Reset password`,
  description: "Recover your password",
};

export default function ResetPassword({
  searchParams,
}: PageSearchParamsWithToken) {
  return <ResetPasswordForm token={searchParams.token} />;
}
