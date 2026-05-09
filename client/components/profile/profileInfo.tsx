import { Mail, Phone, UserIcon } from "lucide-react";
import FormInput from "../formInput";

export default function ProfileInfo({ formik }: { formik: any }) {
    return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 md:p-7">
            <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-blue-600 text-white shadow-sm">
                    <UserIcon className="h-4 w-4" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Personal Information
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Visible on every job and application
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                    <div className="absolute left-3 top-9 z-10 text-indigo-500 pointer-events-none">
                        <UserIcon className="h-4 w-4" />
                    </div>
                    <div className="[&_input]:pl-9">
                        <FormInput name="name" label="Full Name" formik={formik} />
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-3 top-9 z-10 text-rose-500 pointer-events-none">
                        <Mail className="h-4 w-4" />
                    </div>
                    <div className="[&_input]:pl-9">
                        <FormInput
                            name="email"
                            label="Email"
                            type="email"
                            formik={formik}
                        />
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-3 top-9 z-10 text-amber-500 pointer-events-none">
                        <Phone className="h-4 w-4" />
                    </div>
                    <div className="[&_input]:pl-9">
                        <FormInput name="mobile" label="Mobile" formik={formik} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}