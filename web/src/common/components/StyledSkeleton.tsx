import Skeleton, { SkeletonProps } from "react-loading-skeleton";

const colors = {
  baseColor: "#4B5563",
  highlightColor: "#6B7280",
};

export default function StyledSkeleton(props: SkeletonProps) {
  return <Skeleton {...props} {...colors} />;
}
