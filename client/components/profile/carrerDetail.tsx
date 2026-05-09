import { Briefcase, Building2, Clock, GraduationCap, IndianRupee, Languages, MapPin, Wrench } from "lucide-react";
import FormInput from "../formInput";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function CareerDetail({formik}:{formik:any}) {
    return (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 md:p-7">
                <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500 to-pink-600 text-white shadow-sm">
                        <Briefcase className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                            Career Details
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Help recruiters find the right match
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <div className="absolute left-3 top-9 z-10 text-rose-500 pointer-events-none">
                            <MapPin className="h-4 w-4" />
                        </div>
                        <div className="[&_input]:pl-9">
                            <FormInput
                                name="location"
                                label="Location"
                                formik={formik}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-9 z-10 text-violet-500 pointer-events-none">
                            <Briefcase className="h-4 w-4" />
                        </div>
                        <div className="[&_input]:pl-9">
                            <FormInput
                                name="experience"
                                label="Experience (e.g. 3 years)"
                                formik={formik}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-9 z-10 text-amber-500 pointer-events-none">
                            <GraduationCap className="h-4 w-4" />
                        </div>
                        <div className="[&_input]:pl-9">
                            <FormInput
                                name="education"
                                label="Education"
                                formik={formik}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-9 z-10 text-indigo-500 pointer-events-none">
                            <Building2 className="h-4 w-4" />
                        </div>
                        <div className="[&_input]:pl-9">
                            <FormInput
                                name="currentCompany"
                                label="Current Company"
                                formik={formik}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-9 z-10 text-emerald-500 pointer-events-none">
                            <IndianRupee className="h-4 w-4" />
                        </div>
                        <div className="[&_input]:pl-9">
                            <FormInput
                                name="currentCTC"
                                label="Current CTC"
                                formik={formik}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-9 z-10 text-teal-500 pointer-events-none">
                            <IndianRupee className="h-4 w-4" />
                        </div>
                        <div className="[&_input]:pl-9">
                            <FormInput
                                name="expectedCTC"
                                label="Expected CTC"
                                formik={formik}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-9 z-10 text-sky-500 pointer-events-none">
                            <Clock className="h-4 w-4" />
                        </div>
                        <div className="[&_input]:pl-9">
                            <FormInput
                                name="noticePeriod"
                                label="Notice Period"
                                formik={formik}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-5 grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            <span className="inline-flex items-center gap-1.5">
                                <Wrench className="h-3.5 w-3.5 text-fuchsia-500" />
                                Skills
                            </span>
                        </label>
                        <Textarea
                            name="skills"
                            value={formik.values.skills}
                            onChange={formik.handleChange}
                            placeholder="React, Node, MongoDB"
                        />
                        <p className="mt-1 text-xs text-slate-400">
                            Comma-separated list
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            <span className="inline-flex items-center gap-1.5">
                                <Languages className="h-3.5 w-3.5 text-emerald-500" />
                                Languages
                            </span>
                        </label>
                        <Input
                            name="language"
                            value={formik.values.language}
                            onChange={formik.handleChange}
                            placeholder="English, Hindi, Tamil"
                        />
                        <p className="mt-1 text-xs text-slate-400">
                            Comma-separated list
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}