import { commonMetadata } from "@/common/shared-metadata";

export const metadata = {
  title: `${commonMetadata.title} Home`,
  description: "Simple app to manage your notes",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function Home() {
  return <h1>Hello</h1>;
}
