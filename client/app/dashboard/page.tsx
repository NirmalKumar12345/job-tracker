'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole, isAuthenticated } from "@/lib/auth";
import AdminDashboard from "@/components/admin/adminDashboard";
import UserDashboard from "@/components/user/userDashboard";
import { useLoading } from "@/components/loadingProvider";

export default function Dashboard() {
  const router = useRouter();
  const { show } = useLoading();
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const handleLogout = () => {
    show("Signing out...");
    localStorage.removeItem('token');
    router.push("/");
  };

  useEffect(() => {
    show("Loading dashboard...");
    if (!isAuthenticated()) {
      router.replace("/dashboard");
      return;
    }
    setRole(getUserRole());
  }, [router, show]);

  if (role === null) return null;
  if (role === "admin") return <AdminDashboard handleLogout={handleLogout}/>;
  return <UserDashboard handleLogout={handleLogout}/>;
}
