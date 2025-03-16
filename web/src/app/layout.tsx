import { Jost } from "@next/font/google";

import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} bg-primary mx-auto max-w-[1920px]`}>
        {children}
      </body>
    </html>
  );
}
