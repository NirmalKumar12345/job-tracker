'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupUser } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SignupSchema } from "@/app/validation/authValidation";
import { useLoading } from "@/components/loadingProvider";
import {
  User,
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export function SignupForm() {
  const router = useRouter();
  const { show } = useLoading();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
    name: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    mobile?: string;
  }>({});

  const validateField = (field: keyof typeof SignupSchema.shape, value: string) => {
    const fieldSchema = SignupSchema.shape[field];
    const result = fieldSchema.safeParse(value);
    return result?.success ? "" : result.error.issues[0].message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await SignupUser(form);
      toast.success(res.msg);
      show("Creating your account...");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      const Errors = err?.errors || err?.response?.data?.errors;
      if (Errors && Array.isArray(Errors)) {
        const fieldError: any = {};
        Errors.forEach((e: any) => {
          fieldError[e.field] = e.message;
        });
        setErrors(fieldError);
      } else {
        toast.error(err?.error || "SignUp Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-xl shadow-fuchsia-500/5 p-6 md:p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-fuchsia-500 to-pink-600 text-white shadow-md shadow-pink-500/30">
          <UserPlus className="h-5 w-5" />
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs font-medium uppercase tracking-wider text-pink-600 dark:text-pink-400">
            Join the platform
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
          Create your account
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              id="name"
              value={form.name}
              placeholder="John Doe"
              className="pl-9"
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, name: value });
                const errormsg = validateField("name", value);
                setErrors((prev) => ({ ...prev, name: errormsg }));
              }}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>

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
              value={form.email}
              placeholder="you@example.com"
              className="pl-9"
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, email: value });
                const errormsg = validateField("email", value);
                setErrors((prev) => ({ ...prev, email: errormsg }));
              }}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.email}
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
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              placeholder="Strong password"
              className="pl-9 pr-9"
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, password: value });
                const errormsg = validateField("password", value);
                setErrors((prev) => ({ ...prev, password: errormsg }));
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-pink-600 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Mobile Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              id="mobile"
              value={form.mobile}
              placeholder="9876543210"
              className="pl-9"
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, mobile: value });
                const errormsg = validateField("mobile", value);
                setErrors((prev) => ({ ...prev, mobile: errormsg }));
              }}
            />
          </div>
          {errors.mobile && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.mobile}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            I am a
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
            <Select
              value={form.role}
              onValueChange={(value) => {
                setForm({ ...form, role: value });
                const errormsg = validateField("role", value);
                setErrors((prev) => ({ ...prev, role: errormsg }));
              }}
            >
              <SelectTrigger className="cursor-pointer w-full pl-9">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="cursor-pointer">
                <SelectItem className="cursor-pointer" value="admin">Admin / Recruiter</SelectItem>
                <SelectItem className="cursor-pointer" value="user">Job Seeker</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.role && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.role}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={
            loading ||
            !form.name ||
            !form.email ||
            !form.password ||
            !form.mobile ||
            !form.role
          }
          className="w-full cursor-pointer bg-linear-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white shadow-md shadow-pink-500/20 h-11"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Account
            </>
          )}
        </Button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            href="/"
            className="font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-800 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
