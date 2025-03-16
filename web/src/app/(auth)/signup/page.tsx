import SignupForm from "@/app/(auth)/signup/SignupForm";

import { commonMetadata } from "@/common/shared-metadata";

export const metadata = {
  title: `${commonMetadata.title} Signup`,
  description: "Signup to my notes",
};

export default function Login() {
  return <SignupForm />;
}
