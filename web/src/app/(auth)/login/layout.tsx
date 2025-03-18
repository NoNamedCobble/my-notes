import { commonMetadata } from "@/common/shared-metadata";
import { LayoutProps } from "@/common/types";

export const metadata = {
  title: `${commonMetadata.title} Login`,
  description: "Login to my notes",
};

export default function Login({ children }: LayoutProps) {
  return children;
}
