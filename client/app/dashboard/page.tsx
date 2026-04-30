'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole, isAuthenticated } from "@/lib/auth";
import AdminDashboard from "@/components/admin/adminDashboard";
import UserDashboard from "@/components/user/userDashboard";

export default function Dashboard() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const handleLogout = () => {        
        localStorage.removeItem('token');
        router.push("/");
    };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/dashboard");
      return;
    }
    setRole(getUserRole());
  }, [router]);

  if (role === null) return null;
  if (role === "admin") return <AdminDashboard handleLogout={handleLogout}/>;
  return <UserDashboard handleLogout={handleLogout}/>;
}
