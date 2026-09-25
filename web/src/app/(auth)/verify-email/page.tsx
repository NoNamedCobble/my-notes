"use client";

import { verifyEmail } from "@/services/api/auth";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "react-toastify";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;

      try {
        const { message } = await verifyEmail(token);
        toast.success(message);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message);
        }
      }

      router.push("/login");
    };

    verifyToken();
  }, [token, router]);

  return (
    <h2 className="text-2xl font-semibold md:mb-6 md:text-3xl lg:self-center lg:text-4xl">
      Email Verification in Progress...
    </h2>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense
      fallback={
        <h2 className="text-2xl font-semibold">
          Email Verification in Progress...
        </h2>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
