'use client';
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
import { SignupUser } from "@/services/auth.service";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SignupSchema } from "@/app/validation/authValidation";


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", role: "", name: "", mobile: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string, email?: string; password?: string; role?: string, mobile?: string }>({});
  const validateField = (field: keyof typeof SignupSchema.shape, value: string) => {
    const fieldSchema = SignupSchema.shape[field];
    const result = fieldSchema.safeParse(value);
    return result?.success ? "" : result.error.issues[0].message;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await SignupUser(form);
      toast.success(res.msg);
      setTimeout(() => {
        router.push('/');
      },1500);
    }
    catch (err: any) {
      const Errors = err?.errors || err?.response?.data?.errors;
      if (Errors && Array.isArray(Errors)) {
        const fieldError: any = {}
        Errors.forEach((e: any) => {
          fieldError[e.field] = e.message
        });
        setErrors(fieldError);
      }
      else {
        toast.error(err?.msg || "SignUp Failed")
      }
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" value={form.name}
                onChange={(e) => {const value = e.target.value; setForm({ ...form, name: value }); 
                const errormsg = validateField("name",value);
                setErrors((prev)=>({...prev, name: errormsg})); }}  />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                value={form.email}
                onChange={(e) => {const value = e.target.value;setForm({ ...form, email: value });
                const errormsg = validateField("email",value);
                setErrors((prev)=>({...prev, email: errormsg})); }}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password"  value={form.password}
                onChange={(e) => {const value = e.target.value; setForm({ ...form, password: value }); 
                const errormsg = validateField("password",value);
                setErrors((prev)=>({...prev, password: errormsg}));}}  />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </Field>
            <Field>
              <FieldLabel htmlFor="mobile">Mobile Number</FieldLabel>
              <Input id="mobile" value={form.mobile}
                onChange={(e) => {const value = e.target.value; setForm({ ...form, mobile: value }); 
                const errormsg = validateField("mobile",value);
                setErrors((prev)=>({...prev, mobile: errormsg}));}}  />
              {errors.mobile && <p className="text-sm text-red-500">{errors.mobile}</p>}
            </Field>
            <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <Select
                value={form.role}
                onValueChange={(value) => {setForm({...form,role: value });
                const errormsg = validateField("role",value);
                 setErrors((prev)=>({...prev, role: errormsg}));}}
              >
                <SelectTrigger className="cursor-pointer w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>

                <SelectContent className="cursor-pointer">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="cursor-pointer" disabled={loading || !form.name || !form.email || !form.password || !form.mobile || !form.role}>
                  {loading ? "Creating..." : "Create Account"}</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
