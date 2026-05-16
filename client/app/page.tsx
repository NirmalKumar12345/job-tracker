"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/loginForm";
import {
  Briefcase,
  Rocket,
  Users,
  Trophy,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem('sessionExpired')) {
      toast.error('Session expired');
      setTimeout(() => {
        localStorage.removeItem('sessionExpired');
      }, 500);
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard");
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      </div>

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* LEFT — branding panel */}
        <div className="hidden lg:flex flex-col justify-between p-10 xl:p-14 bg-linear-to-br from-indigo-600 via-blue-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          {/* Logo */}
          <div className="relative flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">JobTracker</span>
          </div>

          {/* Hero copy */}
          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-medium ring-1 ring-white/30">
              <Sparkles className="h-3.5 w-3.5 text-yellow-200" />
              Find your next opportunity
            </div>
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
              Where careers meet{" "}
              <span className="text-yellow-200">opportunity</span>.
            </h2>
            <p className="text-indigo-100/90 text-base max-w-md">
              Browse thousands of jobs, apply in one click, and track every
              application from one beautiful dashboard.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-md">
              <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 ring-1 ring-white/20">
                <Rocket className="h-5 w-5 text-yellow-200 mb-2" />
                <p className="text-2xl font-bold">10k+</p>
                <p className="text-xs text-indigo-100/80">Active jobs</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 ring-1 ring-white/20">
                <Users className="h-5 w-5 text-pink-200 mb-2" />
                <p className="text-2xl font-bold">50k+</p>
                <p className="text-xs text-indigo-100/80">Candidates</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 ring-1 ring-white/20">
                <Trophy className="h-5 w-5 text-emerald-200 mb-2" />
                <p className="text-2xl font-bold">5k+</p>
                <p className="text-xs text-indigo-100/80">Hires made</p>
              </div>
            </div>
          </div>

          <p className="relative text-xs text-indigo-100/70">
            © {new Date().getFullYear()} JobTracker — Crafted for hiring teams &amp; job
            seekers.
          </p>
        </div>

        {/* RIGHT — form */}
        <div className="flex flex-col items-center justify-center p-6 md:p-10">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 text-white shadow-md">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              JobTracker
            </span>
          </div>

          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
