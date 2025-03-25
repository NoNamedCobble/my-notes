import SignupForm from "@/common/components/forms/SignupForm";
import { commonMetadata } from "@/common/shared-metadata";

export const metadata = {
  title: `${commonMetadata.title} Signup`,
  description: "Signup to my notes",
};

export default function Signup() {
  return <SignupForm />;
}
