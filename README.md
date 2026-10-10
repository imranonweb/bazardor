# 🛒 বাজার দর (BazarDor) — আজকের বাজার দর এক নজরে

> **প্রয়োজনীয় নিত্যপণ্যের দৈনিক বাজার দর পর্যবেক্ষণ, তুলনা ও বিশ্লেষণ প্ল্যাটফর্ম।**  
> চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক সর্বশেষ মূল্য তালিকা, গড় দাম, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক প্ল্যাটফর্মে।

---

## 🔗 গুরুত্বপূর্ণ লিংক (Submission Links)

- **🌐 লাইভ সাইট (Live Link):** [https://bazardor-amber.vercel.app](https://bazardor-amber.vercel.app)
- **📂 গিটহাব রিপোজিটরি (GitHub Repository):** [https://github.com/imranonweb/bazardor](https://github.com/imranonweb/bazardor)

---

## 📖 সংক্ষিপ্ত পরিচিতি (Project Overview)

**বাজার দর (BazarDor)** হলো একটি আধুনিক, রেসপনসিভ ওয়েব অ্যাপ্লিকেশন যেখানে ব্যবহারকারীরা প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের বাজার দর এক নজরে দেখতে পারবেন। অ্যাপ্লিকেশনটিতে রয়েছে লাইভ প্রাইস টিকার (Marquee), দাম বৃদ্ধি ও হ্রাসের শীর্ষ পণ্যের তালিকা, ক্যাটাগরিভিত্তিক ফিল্টারিং ও সঠিক বাংলা সংখ্যায় সর্টিং, এবং অথেন্টিকেটেড ব্যবহারকারীদের জন্য বাজারভিত্তিক বিস্তারিত মূল্য তুলনা ও প্রোফাইল ব্যবস্থাপনা।

---

## 🛠️ ব্যবহৃত প্রযুক্তিসমূহ (Technologies Used)

| প্রযুক্তি (Technology) | ভূমিকা (Purpose) |
|---|---|
| **Next.js 16 (App Router)** | আধুনিক ফুলস্ট্যাক ফ্রেমওয়ার্ক, সার্ভার ও ক্লায়েন্ট রেন্ডারিং |
| **TypeScript** | টাইপ সেফটি ও কোড কোয়ালিটি নিশ্চিতকরণ |
| **Tailwind CSS v4** | ইউটিলিটি-ফার্স্ট মডার্ন সিএসএস ফ্রেমওয়ার্ক |
| **DaisyUI v5** | কাস্টম `bazardor` থিমসহ এক্সেসিবল ইউআই উপাদান |
| **BetterAuth** | মডার্ন অথেন্টিকেশন (Email/Password, Google OAuth, GitHub OAuth) |
| **MongoDB Atlas** | ব্যবহারকারী ও সেশন ডেটা সংরক্ষণে ক্লাউড ডেটাবেস |
| **Next Font (Hind Siliguri)** | পরিচ্ছন্ন ও মানসম্মত বাংলা টাইপোগ্রাফি |
| **React Hot Toast** | মসৃণ ও দৃষ্টিনন্দন নোটিফিকেশন সিস্টেম |

---

## 🌟 মূল বৈশিষ্ট্যসমূহ (Key Features)

### ১. 🔝 ইন্টারেক্টিভ হেডার, ক্যাটাগরি নেভিগেশন ও প্রাইস টিকার (Marquee)
- ফিগমা ডিজাইনের সাথে নিখুঁত মিল রেখে তৈরি ডাবল-রো নেভিগেশন বার।
- বাঁ পাশে লোগো `🛒 বাজার দর` এবং স্বয়ংক্রিয় বাংলা ক্যালেন্ডার তারিখ।
- ক্যাটাগরিভিত্তিক দ্রুত ফিল্টারিং এবং অ্যাক্টিভ ক্যাটাগরি হাইলাইট।
- হেডারের নিচে অসীম স্ক্রলিং লাইভ **প্রাইস টিকার**, যা হোভার করলে থেমে যায় এবং প্রতিটি পণ্যের দাম ও শতাংশের পরিবর্তন (▲/▼) দেখায়।

### ২. 🅱️ হিরো ব্যানার ও স্মুথ স্ক্রলিং CTA
- তারিখের আইব্রো ব্যাজ, আকর্ষণীয় শিরোনাম এবং সারসংক্ষেপ।
- এক ক্লিকে সরাসরি পেজের `#সব-পণ্য` সেকশনে নিয়ে যাওয়ার জন্য মসৃণ স্ক্রলিং CTA বাটন।
- ডানপাশে অপ্টিমাইজড ভেক্টর চিত্র।

### ৩. ⚖️ গতিশীল হোমপেজ পণ্য সেকশন (Top Risers, Fallers & All Products)
- **আজ দাম বেড়েছে ▲:** শীর্ষ ৬টি মূল্যবৃদ্ধির পণ্য কার্ড।
- **আজ দাম কমেছে ▼:** শীর্ষ ৬টি মূল্যহ্রাসের পণ্য কার্ড।
- **সব পণ্য:** গ্রিড লেআউটে সমস্ত পণ্যের কার্ড (ইমোজি, পণ্যের নাম, পরিমাপের একক, আজকের দাম ও শতকরা পরিবর্তনের ব্যাজ)।

### ৪. 🔒 সুরক্ষিত বিস্তারিত পণ্য পৃষ্ঠা (`/product/[slug]`)
- অথেন্টিকেটেড প্রটেক্টেড রুট — লগইন ছাড়া প্রবেশ করলে স্বয়ংক্রিয়ভাবে নোটিফিকেশনসহ সাইন ইন পেজে রিডাইরেক্ট করে।
- পণ্যের সর্বোচ্চ, সর্বনিম্ন, গড় এবং আজকের দামের সারসংক্ষেপ কার্ড।
- বিভাগভিত্তিক বাজার তালিকা ও দর তুলনা টেবিল (ঢাকা, চট্টগ্রাম, রাজশাহী ইত্যাদি)।
- আজকের, গতকালের, গত সপ্তাহের ও গত মাসের মূল্যের তুলনামূলক কার্ড।

### ৫. 🔍 ক্যাটাগরি ফিল্টারিং ও উন্নত সর্টিং (Challenge C1)
- প্রতিটি ক্যাটাগরির নিজস্ব পেজ এবং মোট পণ্যের বাংলা সংখ্যা গণনা।
- **সাজান (Sort):** `ডিফল্ট`, `দাম: কম থেকে বেশি`, এবং `দাম: বেশি থেকে কম` — যা খাঁটি নিউমেরিক মানে সাজায়।
- অবৈধ ক্যাটাগরির জন্য ফ্রেন্ডলি এম্পটি স্টেট ও হোম পেজে ফেরার বাটন।

### ৬. 🔐 পূর্ণাঙ্গ অথেন্টিকেশন ও প্রোফাইল ছবি আপলোড (Challenge C3)
- BetterAuth চালিত ইমেইল/পাসওয়ার্ড ও সোশ্যাল লগইন (Google ও GitHub)।
- **পাসওয়ার্ড নিশ্চিতকরণ:** অ্যাকাউন্ট খোলার সময় পাসওয়ার্ড দুইবার লেখার বাধ্যতামূলক ভ্যালিডেশন।
- **প্রোফাইল আপডেট ও ছবি আপলোড:** তথ্য আপডেট পেজে ব্যবহারকারী নিজের নাম পরিবর্তন এবং ডিভাইস থেকে প্রোফাইল ছবি আপলোড (Base64 প্রিভিউ) বা ছবির URL দিতে পারেন।
- সফল আপডেটের সাথে সাথে নেভবার ও প্রোফাইল পেজে তাৎক্ষণিক অ্যাভাটার ও নাম আপডেট।

### ৭. 🎨 নিখুঁত বাংলা টাইপোগ্রাফি ও রেসপনসিভ ডিজাইন
- ডেমো ওয়েবসাইটের অনুরূপ **Hind Siliguri** ফন্ট সমগ্র ওয়েবসাইটে প্রযোজ্য।
- ডেমো ওয়েবসাইটের অফিসিয়াল `bazardor` ওকালচ কালার প্যালেট ও বর্ডার রেডিয়াস।
- মোবাইল, ট্যাবলেট ও ডেস্কটপ সব ডিভাইসে সম্পূর্ণ প্রতিক্রিয়াশীল (Responsive)।
- ডেটা ফেচিংয়ের সময় ফ্রেন্ডলি স্কেলেটন লোডার (Skeleton loaders)।
- চমৎকার ৪MD ফ্রেন্ডলি ৪০৪ পেজ (`/_not-found`)।

---

## ⚙️ এনভায়রনমেন্ট ভেরিয়েবল সেটআপ (.env.local)

প্রকল্পটি চালু করতে রুট ডিরেক্টরিতে `.env.local` ফাইল তৈরি করে নিচের ভেরিয়েবলগুলো দিন:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb://username:password@cluster-hosts/bazardor?ssl=true&replicaSet=atlas-shard-0&authSource=admin&retryWrites=true&w=majority
MONGODB_URL=mongodb://username:password@cluster-hosts/bazardor?ssl=true&replicaSet=atlas-shard-0&authSource=admin&retryWrites=true&w=majority

# Better Auth Secret & Base URL
BETTER_AUTH_SECRET=your_super_secret_key_at_least_32_chars
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth Credentials (ঐচ্ছিক সোশ্যাল লগইন)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth Credentials (ঐচ্ছিক সোশ্যাল লগইন)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

---

## 🔧 সোশ্যাল লগইন কনফিগারেশন গাইড (Google & GitHub)

আপনি যদি সোশ্যাল লগইন ব্যবহার করতে চান, তবে কনসোলে নিচের **Authorized Redirect URI** যুক্ত করুন:

1. **Google Cloud Console:**
   - **Authorized redirect URIs:**
     - লোকাল: `http://localhost:3000/api/auth/callback/google`
     - প্রোডাকশন: `https://your-domain.vercel.app/api/auth/callback/google`

2. **GitHub Developer Settings:**
   - **Authorization callback URL:**
     - লোকাল: `http://localhost:3000/api/auth/callback/github`
     - প্রোডাকশন: `https://your-domain.vercel.app/api/auth/callback/github`

---

## 💻 লোকাল মেশিনে চালানোর নিয়ম (Getting Started)

১. রিপোজিটরিটি ক্লোন করুন:
```bash
git clone https://github.com/imranonweb/bazardor.git
cd bazardor
```

২. ডিপেন্ডেন্সি ইনস্টল করুন:
```bash
npm install
```

৩. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```

৪. ব্রাউজারে ওপেন করুন:
[http://localhost:3000](http://localhost:3000)

---

## 📦 প্রোডাকশন বিল্ড ও ডিপ্লয়মেন্ট (Build & Deployment)

প্রোডাকশন বান্ডিল তৈরি ও পরীক্ষা করতে:
```bash
npm run build
npm run start
```

Vercel-এ ডিপ্লয় করার সময় Environment Variables সেকশনে `.env.local`-এর সকল কি ও ভ্যালু যুক্ত করুন এবং `NEXT_PUBLIC_APP_URL` ও `BETTER_AUTH_URL` আপনার Vercel ডোমেইনে সেট করুন।
