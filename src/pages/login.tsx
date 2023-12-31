"use client";

import AppLogin from "../components/auth/login";
import AuthScreenLayout from "@/components/auth/authLayout";

export default function AuthScreen(props: any) {
  return (
    <AuthScreenLayout>
      <AppLogin />
    </AuthScreenLayout>
  );
}
