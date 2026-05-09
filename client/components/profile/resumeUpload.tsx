import { FileText, ImagePlus } from "lucide-react";

export default function ResumeUpload({ resume, onPickResume, resumeName }: { resume: string | File | null; onPickResume: (e: React.ChangeEvent<HTMLInputElement>) => void; resumeName: string | null }) {
    return (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 md:p-7">
                <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
                        <FileText className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                            Resume
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Used as the default when applying for jobs
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="resume-input"
                        className="relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/30 hover:border-emerald-400 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer p-8 text-center"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                            <ImagePlus className="h-5 w-5" />
                        </div>

                        {resumeName ? (
                            <>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {resumeName}
                                </p>

                                <p className="text-xs text-slate-500">
                                    Click to replace
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Upload your resume
                                </p>

                                <p className="text-xs text-slate-500">
                                    PDF only
                                </p>
                            </>
                        )}

                        <input
                            id="resume-input"
                            type="file"
                            accept=".pdf"
                            onChange={onPickResume}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </label>

                    {typeof resume === "string" && (
                        <div className="text-center">
                            <a
                                href={resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                            >
                                View current resume
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>)
}