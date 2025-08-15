"use client";

import { useAuth } from "@/lib/api/auth";
import { LoginForm } from "@/components/login-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
  const { isAuthorized } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (isAuthorized) {
  //     router.push("/");
  //   }
  // }, [isAuthorized]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            {/* <GalleryVerticalEnd className="size-4" /> */}
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          </div>
          Brewnest
        </a>
        <LoginForm mode="login" />
      </div>
    </div>
  );
}
