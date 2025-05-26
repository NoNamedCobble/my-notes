import QueryProvider from "@/common/components/providers/QueryProvider";
import SkeletonThemeProvider from "@/common/components/providers/SkeletonThemeProvider";
import { Jost } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const metadata = {
  title: {
    default: "My Notes",
    template: "My Notes | %s",
  },
  description: "Simple app to manage your notes",
  icons: {
    icon: "/images/notes.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} mx-auto max-w-[1920px] bg-primary`}>
        <SkeletonThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </SkeletonThemeProvider>
      </body>
    </html>
  );
}
