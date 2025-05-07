import { verifyEmail } from "@/services/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useVerifyEmailToken = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;

      try {
        const { message } = await verifyEmail(token);

        toast.success(message);
      } catch (error: any) {
        const message =
          error.response?.data?.message ?? "Something went wrong.";
        toast.error(message);
      }

      router.replace("/login");
    };

    verifyToken();
  }, [token, router]);
};
