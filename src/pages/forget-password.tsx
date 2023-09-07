"use client";

import AuthScreenLayout from "@/components/auth/authLayout";
import ForegetPasswordComp from "@/components/auth/forget-password";

export default function AuthScreen(props: any) {
  return (
    <AuthScreenLayout>
      <ForegetPasswordComp />
    </AuthScreenLayout>
  );
}
