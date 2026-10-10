"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function translateError(msg: string) {
  const l = (msg || "").toLowerCase();
  if (l.includes("already exist") || l.includes("already registered"))
    return "এই ইমেইল দিয়ে আগে থেকেই একটি অ্যাকাউন্ট আছে। সাইন ইন করে নিন।";
  if (l.includes("invalid email or password") || l.includes("invalid credentials"))
    return "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।";
  if (l.includes("user not found") || l.includes("no user"))
    return "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।";
  if (l.includes("password") && (l.includes("8") || l.includes("long")))
    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  if (l.includes("state") || l.includes("csrf") || l.includes("oauth"))
    return "লগইন প্রক্রিয়াটি সম্পন্ন হয়নি। আবার চেষ্টা করুন।";
  if (l.includes("fetch") || l.includes("network") || l.includes("connect"))
    return "সার্ভারের সাথে সংযোগ করা যায়নি। ইন্টারনেট সংযোগ দেখে নিন।";
  if (l.includes("rate") || l.includes("too many"))
    return "অনেকবার চেষ্টা করা হয়েছে। একটু পরে আবার চেষ্টা করুন।";
  return msg || "অনুরোধটি সম্পন্ন হয়নি। একটু পরে আবার চেষ্টা করুন।";
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = useMemo(() => {
    const raw = searchParams.get("callbackUrl");
    if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/";
    return raw;
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get("redirected") === "true") {
      toast.error("এই পৃষ্ঠাটি দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন!");
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!emailRegex.test(email.trim())) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা দিন।";
    }
    if (password.length < 8) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    }
    return newErrors;
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("ফর্মের তথ্য ঠিক করে আবার চেষ্টা করুন।");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn.email({
        email: email.trim(),
        password,
        callbackURL: callbackUrl,
      });

      if (error) {
        const errorMsg = translateError(error.message || "");
        setErrors((prev) => ({ ...prev, form: errorMsg }));
        toast.error(errorMsg);
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে! 🎉");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: unknown) {
      const errorMsg = translateError(err instanceof Error ? err.message : "");
      setErrors((prev) => ({ ...prev, form: errorMsg }));
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setSocialLoading(provider);
    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: callbackUrl,
      });

      if (error) {
        const errorMsg = translateError(error.message || "সাইন ইন করা যায়নি।");
        toast.error(errorMsg);
        setSocialLoading(null);
      }
    } catch {
      toast.error("সাইন ইন করা যায়নি।");
      setSocialLoading(null);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
        <p className="mt-1 text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </header>

      <div className="card border border-gray-200 bg-white shadow-sm rounded-2xl">
        <div className="card-body p-6">
          <form onSubmit={handleEmailSignIn} noValidate className="flex flex-col gap-4">
            {errors.form && (
              <div role="alert" className="alert alert-error text-sm py-2.5 rounded-lg flex items-center gap-2">
                <span aria-hidden="true">⚠️</span>
                <span>{errors.form}</span>
              </div>
            )}

            <label className="form-control w-full">
              <span className="label-text mb-1 block font-medium text-gray-700">ইমেইল</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                required
              />
              {errors.email && (
                <span className="mt-1 text-xs text-error font-medium">{errors.email}</span>
              )}
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1 block font-medium text-gray-700">পাসওয়ার্ড</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                }}
                required
              />
              {errors.password && (
                <span className="mt-1 text-xs text-error font-medium">{errors.password}</span>
              )}
            </label>

            <button
              type="submit"
              disabled={loading || Boolean(socialLoading)}
              className="btn btn-success text-white w-full font-medium"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  অপেক্ষা করুন…
                </>
              ) : (
                "সাইন ইন"
              )}
            </button>

            <div className="divider my-0 text-xs text-gray-400">অথবা</div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => handleSocialSignIn("google")}
                disabled={loading || Boolean(socialLoading)}
                className="btn btn-outline flex-1 gap-2 text-xs sm:text-sm font-medium"
              >
                {socialLoading === "google" ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <svg viewBox="0 0 48 48" aria-hidden="true" className="size-4 shrink-0">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65Z" />
                    <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.94 23.94 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
                  </svg>
                )}
                Google দিয়ে চালিয়ে যান
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignIn("github")}
                disabled={loading || Boolean(socialLoading)}
                className="btn btn-outline flex-1 gap-2 text-xs sm:text-sm font-medium"
              >
                {socialLoading === "github" ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 shrink-0 fill-current">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                  </svg>
                )}
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-2 text-center text-sm">
        <p className="text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-green-600 font-semibold hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
        <p className="text-gray-500">
          <Link href="/" className="hover:underline">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Suspense
        fallback={
          <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
            <div className="skeleton h-8 w-32 mx-auto"></div>
            <div className="card border border-gray-200 bg-white p-6 space-y-4">
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-12 w-full"></div>
              <div className="skeleton h-10 w-full"></div>
            </div>
          </div>
        }
      >
        <SignInForm />
      </Suspense>
    </div>
  );
}
