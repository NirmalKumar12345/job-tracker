'use client';

import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  getProfileService,
  updateProfileService,
} from "@/services/profile.service";
import { ProfileSchema } from "@/app/validation/profileValidation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoading } from "@/components/loadingProvider";
import {
  ArrowLeft,
  Save,
  Sparkles,
  User as UserIcon,
  Briefcase,
  FileText,
  ShieldCheck,
  Camera,
  AlertCircle,
} from "lucide-react";
import ProfileInfo from "./profile/profileInfo";
import CareerDetail from "./profile/carrerDetail";
import ResumeUpload from "./profile/resumeUpload";
import Image from "next/image";

type FilePicker = File | string | null;

const AVATAR_GRADIENTS = [
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-violet-500 to-purple-600",
];

const pickGradient = (key: string) => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) | 0;
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

export default function ProfileForm() {
  const router = useRouter();
  const { show, hide } = useLoading();

  const [profilePic, setProfilePic] = useState<FilePicker>(null);
  const [resume, setResume] = useState<FilePicker>(null);
  const [picPreview, setPicPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateWithZod = (values: any) => {
    const result = ProfileSchema.safeParse(values);
    if (result.success) return {};
    const errors: any = {};
    result.error.issues.forEach((err) => {
      const key = err.path[0] as string;
      if (!errors[key]) errors[key] = err.message;
    });
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      role: "user" as "user" | "admin",
      location: "",
      experience: "",
      education: [""],
      currentCompany: "",
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      skills: "",
      language: "",
    },
    enableReinitialize: true,
    validate: validateWithZod,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        show("Saving profile...");
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("mobile", values.mobile);

        if (values.role === "user") {
          formData.append("location", values.location || "");
          formData.append("experience", values.experience || "");
          values.education.forEach((edu: string) => {
            formData.append("education", edu);
          });
          formData.append("currentCompany", values.currentCompany || "");
          formData.append("currentCTC", values.currentCTC || "");
          formData.append("expectedCTC", values.expectedCTC || "");
          formData.append("noticePeriod", values.noticePeriod || "");
          formData.append("skills", values.skills || "");
          formData.append("language", values.language || "");
          if (resume instanceof File) formData.append("resume", resume);
        }

        if (profilePic instanceof File) {
          formData.append("profilePic", profilePic);
        }

        await updateProfileService(formData);
        toast.success("Profile updated");
        hide();
      } catch (err: any) {
        hide();
        toast.error(err?.response?.data?.msg || "Failed to update profile");
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        show("Loading profile...");
        const data = await getProfileService();
        formik.setValues({
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          role: (data.role as "user" | "admin") || "user",
          location: data.location || "",
          experience: data.experience || "",
          education: Array.isArray(data.education)
            ? data.education
            : data.education
              ? [data.education]
              : [""],
          currentCompany: data.currentCompany || "",
          currentCTC: data.currentCTC || "",
          expectedCTC: data.expectedCTC || "",
          noticePeriod: data.noticePeriod || "",
          skills: Array.isArray(data.skills)
            ? data.skills.join(", ")
            : data.skills || "",
          language: Array.isArray(data.language)
            ? data.language.join(", ")
            : data.language || "",
        });
        if (data.profilePic) {
          setProfilePic(data.profilePic);
          setPicPreview(data.profilePic);
        }
        if (data.resume) setResume(data.resume);
      } catch (err: any) {
        toast.error(err?.response?.data?.msg || "Failed to load profile");
      } finally {
        hide();
      }
    })();
  }, []);

  const isUser = formik.values.role === "user";
  const initial = (formik.values.name || "?").trim().charAt(0).toUpperCase();
  const gradient = pickGradient(formik.values.email || formik.values.name || "x");

  const onPickProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setProfilePic(f);
    setPicPreview(URL.createObjectURL(f));
  };

  const onPickResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setResume(f);
  };

  const resumeName =
    resume instanceof File
      ? resume.name
      : typeof resume === "string"
        ? resume.split("/").pop() || "resume.pdf"
        : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 p-4 md:p-6">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto space-y-5">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-blue-600 to-purple-600 p-6 md:p-7 shadow-xl shadow-indigo-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex items-center gap-5">
            <div className="relative">
              {picPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <Image
                  width={500}
                  height={500}
                  src={picPreview}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-white/40 shadow-md"
                />
              ) : (
                <div
                  className={`h-20 w-20 rounded-full bg-linear-to-br ${gradient} flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white/40 shadow-md`}
                >
                  {initial}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-md ring-2 ring-white hover:bg-indigo-50 cursor-pointer"
                aria-label="Change profile picture"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onPickProfilePic}
                className="hidden"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-200" />
                <span className="text-xs font-medium uppercase tracking-wider text-indigo-100">
                  Your profile
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1 truncate">
                {formik.values.name || "Your name"}
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[11px] font-medium text-white ring-1 ring-white/30 capitalize">
                  <ShieldCheck className="h-3 w-3" />
                  {formik.values.role === "admin" ? "Recruiter" : "Job Seeker"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {!isUser && (
            <ProfileInfo formik={formik} />
          )}
          <Tabs defaultValue="personal" className="space-y-5">
            <div className="flex justify-center">
              {isUser && (
                <>
                  <TabsList className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-1 rounded-full shadow-sm">
                    <TabsTrigger
                      value="personal"
                      className="px-6 cursor-pointer rounded-full data-[state=active]:bg-linear-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                    >
                      <UserIcon className="h-4 w-4 mr-2" />
                      Personal
                    </TabsTrigger>
                    <TabsTrigger
                      value="career"
                      className="px-6 cursor-pointer rounded-full data-[state=active]:bg-linear-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      Career
                    </TabsTrigger>

                    <TabsTrigger
                      value="documents"
                      className="px-6 cursor-pointer rounded-full data-[state=active]:bg-linear-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Resume
                    </TabsTrigger>
                  </TabsList>
                </>
              )}
            </div>

            {/* PERSONAL */}
            {isUser && (
              <TabsContent value="personal">
                <ProfileInfo formik={formik} />
              </TabsContent>
            )}
            {/* CAREER (user only) */}
            {isUser && (
              <TabsContent value="career">
                <CareerDetail formik={formik} />
              </TabsContent>
            )}

            {/* DOCUMENTS (user only) */}
            {isUser && (
              <TabsContent value="documents">
                <ResumeUpload resume={resume} onPickResume={onPickResume} resumeName={resumeName} />
              </TabsContent>
            )}
          </Tabs>

          <input type="hidden" name="role" value={formik.values.role} />

          <div className="mt-5 flex justify-between gap-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm p-4">
            {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
              <p className="mr-auto self-center text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                Fix the errors above to save
              </p>
            )}

            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="cursor-pointer px-6 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md shadow-indigo-500/20"
            >
              <Save className="h-4 w-4 mr-1.5" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
