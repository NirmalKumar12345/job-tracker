'use client';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/services/auth.service";
import { LoginSchema } from "@/app/validation/authValidation";
import { useLoading } from "@/components/loadingProvider";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { show } = useLoading();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ email?: string; password?: string }>({});

  const validateField = (field: "email" | "password", value: string) => {
    const fieldSchema = LoginSchema.shape[field];
    const result = fieldSchema.safeParse(value);
    return result?.success ? "" : result.error.issues[0].message;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      const res = await LoginUser({ email, password });
      toast.success(res.msg);
      show("Signing you in...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      localStorage.removeItem("token");
      const Errors = err?.errors || err?.response?.data?.errors;
      if (Errors && Array.isArray(Errors)) {
        const fieldError: any = {};
        Errors.forEach((e: any) => {
          fieldError[e.field] = e.message;
        });
        setError(fieldError);
      } else {
        toast.error(err?.msg || "Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-xl shadow-indigo-500/5 p-6 md:p-8",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/30">
          <LogIn className="h-5 w-5" />
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Welcome back
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
          Sign in to your account
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Enter your credentials to continue
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                const errormsg = validateField("email", value);
                setError((prev) => ({ ...prev, email: errormsg }));
              }}
              placeholder="you@example.com"
              className="pl-9"
            />
          </div>
          {error.email && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              placeholder="Enter password"
              className="pl-9 pr-9"
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                const errormsg = validateField("password", value);
                setError((prev) => ({ ...prev, password: errormsg }));
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {error.password && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error.password}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full cursor-pointer bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md shadow-indigo-500/20 h-11"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </>
          )}
        </Button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signUp"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
