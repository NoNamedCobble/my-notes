import LoginForm from "@/app/(auth)/login/LoginForm";

import { commonMetadata } from "@/common/shared-metadata";

export const metadata = {
  title: `${commonMetadata.title} Login`,
  description: "Login to my notes",
};

export default function Login() {
  return <LoginForm />;
}
