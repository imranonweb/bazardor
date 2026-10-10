import { getBanglaDate } from "@/lib/utils";

export default function Hero() {
  const banglaDate = getBanglaDate();

  return (
    <section className="py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-sm">
          <div className="max-w-xl text-center lg:text-left">
            <p className="mb-3 inline-flex rounded-full bg-green-50 text-green-700 border border-green-200 px-3 py-1 text-xs sm:text-sm font-medium">
              {banglaDate}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="mt-2.5 sm:mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div className="mt-5 sm:mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
              <a
                href="#সব-পণ্য"
                className="btn btn-success text-white font-medium px-6 w-full sm:w-auto"
              >
                সব পণ্য দেখুন ↓
              </a>
            </div>
          </div>
          <img
            src="/bazar-hero.svg"
            alt="তাজা বাজারের ঝুড়ি"
            width={360}
            height={288}
            className="h-auto w-full max-w-[220px] xs:max-w-[260px] sm:max-w-xs lg:max-w-sm shrink-0 drop-shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
