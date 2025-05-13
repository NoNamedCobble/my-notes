"use client";

import { PageSearchParamsWithToken } from "@/common/types";
import { verifyEmail } from "@/services/api/auth";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function VerifyEmail({
  searchParams,
}: PageSearchParamsWithToken) {
  const router = useRouter();
  const token = searchParams.token;

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
