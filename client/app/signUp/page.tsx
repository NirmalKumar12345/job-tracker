import { SignupForm } from "@/components/signUpForm";
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  Rocket,
  TrendingUp,
} from "lucide-react";

export default function SignUp() {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-pink-50/40 to-fuchsia-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-fuchsia-950/40 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      </div>

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* LEFT — form */}
        <div className="flex flex-col items-center justify-center p-6 md:p-10 order-2 lg:order-1">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-fuchsia-500 to-pink-600 text-white shadow-md">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              JobTracker
            </span>
          </div>

          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>

        {/* RIGHT — branding panel */}
        <div className="hidden lg:flex flex-col justify-between p-10 xl:p-14 bg-linear-to-br from-fuchsia-600 via-pink-600 to-rose-600 text-white relative overflow-hidden order-1 lg:order-2">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

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
              Free to join
            </div>
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
              Start your next{" "}
              <span className="text-yellow-200">chapter</span> today.
            </h2>
            <p className="text-pink-100/90 text-base max-w-md">
              Sign up to post jobs, manage candidates, or apply for roles that
              fit your skills — all in one place.
            </p>

            {/* Feature list */}
            <ul className="space-y-3 pt-2 max-w-md">
              <li className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm ring-1 ring-white/30">
                  <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                </div>
                <div>
                  <p className="font-semibold">One-click applications</p>
                  <p className="text-sm text-pink-100/80">
                    Upload your resume once and apply anywhere.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm ring-1 ring-white/30">
                  <Rocket className="h-4 w-4 text-yellow-200" />
                </div>
                <div>
                  <p className="font-semibold">Powerful admin tools</p>
                  <p className="text-sm text-pink-100/80">
                    Post jobs and manage candidate pipelines effortlessly.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm ring-1 ring-white/30">
                  <TrendingUp className="h-4 w-4 text-cyan-200" />
                </div>
                <div>
                  <p className="font-semibold">Track every step</p>
                  <p className="text-sm text-pink-100/80">
                    From applied to offer — see your progress in real time.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <p className="relative text-xs text-pink-100/70">
            © {new Date().getFullYear()} JobTracker — Crafted for hiring teams &amp;
            job seekers.
          </p>
        </div>
      </div>
    </div>
  );
}
