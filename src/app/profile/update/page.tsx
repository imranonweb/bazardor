"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      if (session.user.image) {
        setImageUrl(session.user.image);
        setPreviewUrl(session.user.image);
      }
    }
  }, [session]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("শুধুমাত্র ছবি ফাইল আপলোড করুন!");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("ছবির আকার ২ MB এর বেশি হতে পারবে না!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreviewUrl(base64);
      setImageUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updateData: { name: string; image?: string } = { name };
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const { error } = await authClient.updateUser(updateData);

    if (error) {
      toast.error(error.message || "আপডেট ব্যর্থ হয়েছে!");
    } else {
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে! 🎉");
      router.push("/profile");
      router.refresh();
    }
    setLoading(false);
  };

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">তথ্য আপডেট করুন</h1>

      <div className="card bg-white border border-gray-200 shadow-sm rounded-2xl sm:rounded-3xl">
        <div className="card-body p-5 sm:p-7">
          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="flex flex-col items-center gap-3">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-green-200 ring-offset-2 ring-offset-white">
                  {previewUrl ? (
                    <img src={previewUrl} alt="প্রোফাইল ছবি" />
                  ) : (
                    <div className="bg-green-100 text-green-700 w-full h-full flex items-center justify-center text-3xl font-bold">
                      {session?.user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-outline btn-sm gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                ছবি আপলোড করুন
              </button>
            </div>

            <div className="divider my-1"></div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">নাম</span>
              </label>
              <input
                type="text"
                placeholder="আপনার নাম"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">ছবির লিংক (ঐচ্ছিক)</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full"
                value={imageUrl.startsWith("data:") ? "" : imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
              />
              <label className="label">
                <span className="label-text-alt text-gray-400">
                  ছবি আপলোড বা URL দিন
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-success text-white w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "আপডেট করুন"
              )}
            </button>
          </form>

          <Link
            href="/profile"
            className="btn btn-ghost w-full mt-2"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
