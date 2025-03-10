import SignupForm from "@/app/signup/SignupForm";
import AuthWrapper from "@/common/components/AuthWrapper";

import { commonMetadata } from "@/common/shared-metadata";

export const metadata = {
  title: `${commonMetadata.title} Signup`,
  description: "Signup to my notes",
};

export default function Login() {
  return (
    <AuthWrapper>
      <SignupForm />
    </AuthWrapper>
  );
}
