import { LayoutProps } from "@/common/types";
import { SkeletonTheme } from "react-loading-skeleton";

export default function SkeletonThemeProvider({ children }: LayoutProps) {
  return (
    <SkeletonTheme baseColor="#4B5563" highlightColor="#6B7280">
      {children}
    </SkeletonTheme>
  );
}
