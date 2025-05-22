import Blob from "@/common/components/Blob";

export default function AnimatedBackground() {
  const amount = 10;
  return (
    <div className="pointer-events-none absolute inset-0 isolate -z-10 flex items-center justify-center overflow-hidden">
      {[...Array(amount)].map((_, index) => (
        <Blob key={index} />
      ))}
    </div>
  );
}
