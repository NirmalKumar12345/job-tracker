'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
    getAllApplicationsServices,
    updateJobService,
} from "@/services/application.service";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/components/loadingProvider";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
    Building2,
    IndianRupee,
    Clock,
    Languages,
    Wrench,
    FileText,
    ExternalLink,
    Eye,
    CheckCircle2,
    XCircle,
    Sparkles,
    ShieldCheck,
} from "lucide-react";

const AVATAR_GRADIENTS = [
    "from-indigo-500 to-blue-600",
    "from-fuchsia-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-violet-500 to-purple-600",
    "from-rose-500 to-red-600",
    "from-cyan-500 to-sky-600",
];

const pickGradient = (key: string) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) | 0;
    return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

const statusStyles = (status: string) => {
    switch ((status || "").toLowerCase()) {
        case "shortlisted":
            return {
                wrap: "text-emerald-700 ring-emerald-200",
                dot: "bg-emerald-500",
            };
        case "rejected":
            return {
                wrap: "text-rose-700 ring-rose-200",
                dot: "bg-rose-500",
            };
        case "reviewing":
            return {
                wrap: "text-amber-700 ring-amber-200",
                dot: "bg-amber-500",
            };
        default:
            return {
                wrap: "text-sky-700 ring-sky-200",
                dot: "bg-sky-500",
            };
    }
};

const fmtDate = (v?: string) =>
    v ? new Date(v).toLocaleDateString() : "—";

export default function ApplicationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { show, hide } = useLoading();
    const id = params?.id as string;

    const [app, setApp] = useState<any>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (id) load();
    }, [id]);

    const load = async () => {
        try {
            show("Loading candidate...");
            const res = await getAllApplicationsServices();
            const applications = res.applications || [];

            const selectedApplication = applications.find(
                (a: any) => a._id === id
            );

            setApp(selectedApplication || null);
        } catch (err: any) {
            toast.error(err?.response?.data?.msg || "Failed to load");
        } finally {
            hide();
        }
    };

    const setStatus = async (status: string) => {
        try {
            setUpdating(true);
            await updateJobService(id, { status } as any);
            toast.success(`Marked as ${status}`);
            setApp((prev: any) => (prev ? { ...prev, status } : prev));
        } catch (err: any) {
            toast.error(err?.response?.data?.msg || "Failed to update status");
        } finally {
            setUpdating(false);
        }
    };

    if (!app) return null;

    const u = app.userId || {};
    const j = app.jobId || {};
    const initial = (u.name || "?").trim().charAt(0).toUpperCase();
    const gradient = pickGradient(u._id || u.email || u.name || "x");
    const styles = statusStyles(app.status);

    const skills: string[] = Array.isArray(u.skills) ? u.skills : [];
    const languages: string[] = Array.isArray(u.language) ? u.language : [];
    const isFinal =
        app.status === "Reviewing" ||
        app.status === "Shortlisted" ||
        app.status === "Rejected";

    const Field = ({
        icon: Icon,
        color,
        label,
        value,
    }: {
        icon: any;
        color: string;
        label: string;
        value?: string | null;
    }) =>
        value ? (
            <div className="flex items-start gap-3 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-sm">
                <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}
                >
                    <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {label}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {value}
                    </p>
                </div>
            </div>
        ) : null;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 p-4 md:p-6">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />
                <div className="absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />
            </div>

            <div className="relative max-w-5xl mx-auto space-y-5">
                {/* Back */}
                <button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                    className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>

                {/* HERO */}
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-blue-600 to-purple-600 p-6 md:p-7 shadow-xl shadow-indigo-500/20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
                    <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

                    <div className="relative flex flex-col md:flex-row md:items-center gap-5">
                        <div className="relative shrink-0">
                            {u.profilePic ? (
                                <img
                                    src={u.profilePic}
                                    alt={u.name}
                                    className="h-20 w-20 rounded-full object-cover ring-4 ring-white/40 shadow-md"
                                />
                            ) : (
                                <div
                                    className={`h-20 w-20 rounded-full bg-linear-to-br ${gradient} flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white/40 shadow-md`}
                                >
                                    {initial}
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-yellow-200" />
                                <span className="text-xs font-medium uppercase tracking-wider text-indigo-100">
                                    Candidate profile
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1 capitalize truncate">
                                {u.name}
                            </h1>
                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/90">
                                <a
                                    href={`mailto:${u.email}`}
                                    className="inline-flex items-center gap-1 hover:underline"
                                >
                                    <Mail className="h-3.5 w-3.5" />
                                    {u.email}
                                </a>
                                <span className="inline-flex items-center gap-1">
                                    <Phone className="h-3.5 w-3.5" />
                                    {u.mobile}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[11px] font-medium ring-1 ring-white/30 capitalize">
                                    <ShieldCheck className="h-3 w-3" />
                                    {u.role || "user"}
                                </span>
                            </div>
                        </div>

                        <div className="self-start md:self-center">
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold ring-1 ${styles.wrap}`}
                            >
                                <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                                {app.status || "Applied"}
                            </span>
                        </div>
                    </div>
                    <div className="text-xs text-white pt-2 md:pt-0 dark:text-slate-400 text-left md:text-right">
                        Applied on {fmtDate(app.createdAt)}
                    </div>
                </div>


                {/* APPLIED FOR */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-linear-to-r from-indigo-50 to-blue-50 dark:from-slate-800/50 dark:to-slate-800/30">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-blue-600 text-white shadow-sm">
                            <Briefcase className="h-4 w-4" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                                Applied for
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Position the candidate is being considered for
                            </p>
                        </div>
                    </div>
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <Field
                            icon={Building2}
                            color="bg-indigo-50 text-indigo-600"
                            label="Company"
                            value={j.company}
                        />
                        <Field
                            icon={Briefcase}
                            color="bg-violet-50 text-violet-600"
                            label="Role"
                            value={j.role}
                        />
                        <Field
                            icon={MapPin}
                            color="bg-rose-50 text-rose-600"
                            label="Location"
                            value={j.location}
                        />
                        {j.salary && (
                            <Field
                                icon={IndianRupee}
                                color="bg-emerald-50 text-emerald-600"
                                label="Salary"
                                value={String(j.salary)}
                            />
                        )}
                        {j.experience && (
                            <Field
                                icon={GraduationCap}
                                color="bg-fuchsia-50 text-fuchsia-600"
                                label="Required exp."
                                value={j.experience}
                            />
                        )}
                    </div>
                </div>

                {/* CANDIDATE PROFILE */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-linear-to-r from-fuchsia-50 to-pink-50 dark:from-slate-800/50 dark:to-slate-800/30">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-fuchsia-500 to-pink-600 text-white shadow-sm">
                            <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                                Candidate details
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Profile data captured during signup &amp; profile updates
                            </p>
                        </div>
                    </div>

                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <Field
                            icon={MapPin}
                            color="bg-rose-50 text-rose-600"
                            label="Location"
                            value={u.location}
                        />
                        <Field
                            icon={Briefcase}
                            color="bg-violet-50 text-violet-600"
                            label="Experience"
                            value={u.experience}
                        />
                        <Field
                            icon={GraduationCap}
                            color="bg-amber-50 text-amber-600"
                            label="Education"
                            value={u.education}
                        />
                        <Field
                            icon={Building2}
                            color="bg-indigo-50 text-indigo-600"
                            label="Current company"
                            value={u.currentCompany}
                        />
                        <Field
                            icon={IndianRupee}
                            color="bg-emerald-50 text-emerald-600"
                            label="Current CTC"
                            value={u.currentCTC}
                        />
                        <Field
                            icon={IndianRupee}
                            color="bg-teal-50 text-teal-600"
                            label="Expected CTC"
                            value={u.expectedCTC}
                        />
                        <Field
                            icon={Clock}
                            color="bg-sky-50 text-sky-600"
                            label="Notice period"
                            value={u.noticePeriod}
                        />
                    </div>

                    {(skills.length > 0 || languages.length > 0) && (
                        <div className="px-5 pb-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {skills.length > 0 && (
                                <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-4">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Wrench className="h-3.5 w-3.5 text-fuchsia-500" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Skills
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skills.map((s, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center rounded-full bg-fuchsia-50 dark:bg-fuchsia-950/40 px-2.5 py-1 text-xs font-medium text-fuchsia-700 dark:text-fuchsia-300 ring-1 ring-fuchsia-200/60"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {languages.length > 0 && (
                                <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-4">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Languages className="h-3.5 w-3.5 text-emerald-500" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Languages
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {languages.map((l, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200/60"
                                            >
                                                {l}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* RESUMES */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-linear-to-r from-emerald-50 to-teal-50 dark:from-slate-800/50 dark:to-slate-800/30">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
                            <FileText className="h-4 w-4" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                                Documents
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Submitted with this application
                            </p>
                        </div>
                    </div>
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {app.resume && (
                            <a
                                href={app.resume}
                                target="_blank"
                                className="group flex items-center justify-between rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-emerald-300 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                            Application resume
                                        </p>
                                        <p className="text-xs text-slate-500">Uploaded with apply</p>
                                    </div>
                                </div>
                                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                            </a>
                        )}
                        {app.userId?.resume && (
                            <a
                                href={app.userId.resume}
                                target="_blank"
                                className="group flex items-center justify-between rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-indigo-300 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                            Profile resume
                                        </p>
                                        <p className="text-xs text-slate-500">From candidate profile</p>
                                    </div>
                                </div>
                                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                            </a>
                        )}
                        {!app.resume && !app.userId?.resume && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 col-span-full">
                                No documents uploaded.
                            </p>
                        )}
                    </div>
                </div>
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                Update hiring status
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Move this application through the pipeline
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">

                            <Button
                                size="sm"
                                variant="outline"
                                disabled={updating || isFinal}
                                className="w-full sm:w-auto cursor-pointer h-9 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                                onClick={() => setStatus("Reviewing")}
                            >
                                <Eye className="h-4 w-4 mr-1.5" />
                                Review
                            </Button>

                            <Button
                                size="sm"
                                disabled={updating || isFinal}
                                className="w-full sm:w-auto cursor-pointer h-9 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                                onClick={() => setStatus("Shortlisted")}
                            >
                                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                                Shortlist
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                disabled={updating || isFinal}
                                className="w-full sm:w-auto cursor-pointer h-9 border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800"
                                onClick={() => setStatus("Rejected")}
                            >
                                <XCircle className="h-4 w-4 mr-1.5" />
                                Reject
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center sm:justify-end">
                    <Button variant={"outline"} onClick={() => router.back()} className="cursor-pointer w-full sm:w-auto">Back</Button>
                </div>
            </div>
        </div>
    );
}
