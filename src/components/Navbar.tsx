"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PriceTicker from "./PriceTicker";
import { getBanglaDate, fetchApi, type Category } from "@/lib/utils";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchApi<Category[]>("/categories")
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে!");
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <span
            aria-hidden="true"
            className="grid size-9 sm:size-10 place-items-center rounded-xl bg-green-600 text-base sm:text-lg text-white shadow-sm"
          >
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-lg sm:text-xl font-bold tracking-tight text-gray-900">
              বাজার দর
            </span>
            <span className="block text-[11px] sm:text-xs text-gray-500">
              {getBanglaDate()}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-green-600"></span>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm gap-2 px-2 sm:px-3"
              >
                <div className="avatar">
                  <div className="rounded-full w-7 h-7 sm:w-8 sm:h-8 overflow-hidden ring-1 ring-green-500/20">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="bg-green-100 text-green-700 w-full h-full flex items-center justify-center font-bold text-xs sm:text-sm">
                        {session.user.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-gray-800 font-medium text-xs sm:text-sm max-w-[100px] sm:max-w-[140px] truncate hidden xs:inline">
                  {session.user.name}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-box shadow-xl border border-gray-100 z-[1] w-52 p-2 mt-2"
              >
                <li className="menu-title px-3 py-1 text-xs text-gray-400">
                  {session.user.email}
                </li>
                <li>
                  <Link href="/profile">
                    <span>👤</span> আমার প্রোফাইল
                  </Link>
                </li>
                <li>
                  <Link href="/profile/update">
                    <span>✏️</span> তথ্য আপডেট
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button onClick={handleSignOut} className="text-red-600">
                    <span>🚪</span> সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="btn btn-sm btn-ghost text-xs sm:text-sm text-gray-700 hover:bg-gray-100 px-2 sm:px-3"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm btn-success text-xs sm:text-sm text-white px-3 sm:px-4"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50/70">
        <nav aria-label="পণ্য ক্যাটাগরি" className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1.5 overflow-x-auto py-2 text-sm no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.slug} className="shrink-0">
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`btn btn-sm rounded-lg whitespace-nowrap gap-1.5 transition-all text-xs sm:text-sm ${
                      isActive
                        ? "btn-success text-white shadow-sm"
                        : "btn-ghost text-gray-700 hover:bg-white hover:text-green-700"
                    }`}
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <PriceTicker />
    </header>
  );
}
