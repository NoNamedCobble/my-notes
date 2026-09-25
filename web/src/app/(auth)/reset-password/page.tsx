import ResetPasswordForm from "@/common/components/forms/ResetPasswordForm";
import { PageSearchParamsWithToken } from "@/common/types";

export const metadata = {
  title: `Reset password`,
  description: "Recover your password",
};

export default async function ResetPassword({
  searchParams,
}: PageSearchParamsWithToken) {
  const { token } = await searchParams;
  return <ResetPasswordForm token={token} />;
}
