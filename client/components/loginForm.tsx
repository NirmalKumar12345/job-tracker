'use client';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { LoginUser } from "@/services/auth.service";
import { LoginSchema } from "@/app/validation/authValidation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ email?: string, password?: string }>({});
  const validateField = (field: "email"|"password",value: string)=>{
    const fieldSchema = LoginSchema.shape[field]
    const result = fieldSchema.safeParse(value)
    return result?.success ? "":result.error.issues[0].message;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({});//clear old errors

    try {
      const res = await LoginUser({ email, password });

      toast.success(res.msg);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (err: any) {
      localStorage.removeItem("token");
      const Errors = err?.errors || err?.response?.data?.errors;
      if (Errors && Array.isArray(Errors)) {
        const fieldError: any = {}
        Errors.forEach((e: any) => {
          fieldError[e.field] = e.message;
        });
        setError(fieldError);
      }
      else {
        toast.error(err?.msg || "Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) =>{ const value = e.target.value; setEmail(value); const errormsg = validateField("email",value); setError((prev)=>({...prev, email: errormsg}));}}
                  placeholder="Enter Email"
                />
                {error.email && <p className="text-sm text-red-500">{error.email}</p>}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input type='password' id="password" value={password} placeholder="Enter Password" onChange={(e) => {const value = e.target.value; setPassword(value); const errormsg = validateField("password",value); setError((prev)=>({...prev, password: errormsg}));}} />
                {error.password && <p className="text-sm text-red-500">{error.password}</p>}
              </Field>
              <Field>
                <Button type="submit" className="cursor-pointer" disabled={loading || !email || !password}>{loading ? "Logging in..." : "Login"}</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signUp">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
