import { Jost } from "@next/font/google";

import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} mx-auto max-w-[1920px] bg-primary`}>
        {children}
      </body>
    </html>
  );
}
