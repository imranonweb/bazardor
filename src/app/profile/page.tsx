"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">আপনি লগইন করেননি</p>
        <Link href="/signin" className="btn btn-success text-white">
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">আমার প্রোফাইল</h1>

      <div className="card bg-white border shadow">
        <div className="card-body">
          <div className="flex items-center gap-4 mb-6">
            <div className="avatar">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-green-500/20 shadow-sm">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-green-100 text-green-700 w-full h-full flex items-center justify-center font-bold text-2xl">
                    {session.user.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {session.user.name}
              </h2>
              <p className="text-gray-500">{session.user.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">নাম</p>
                <p className="font-medium">{session.user.name}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">ইমেইল</p>
                <p className="font-medium">{session.user.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/profile/update"
              className="btn btn-success text-white w-full"
            >
              ✏️ তথ্য আপডেট করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
