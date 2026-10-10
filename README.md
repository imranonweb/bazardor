# 🛒 BazarDor (বাজার দর) — Daily Commodity Price Tracker

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bazardor--amber.vercel.app-success?style=for-the-badge&logo=vercel)](https://bazardor-amber.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-imranonweb%2Fbazardor-181717?style=for-the-badge&logo=github)](https://github.com/imranonweb/bazardor)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-v5-5A0EF8?style=for-the-badge&logo=daisyui)](https://daisyui.com)

> **BazarDor** is a modern, responsive full-stack web application designed for tracking and comparing daily essential commodity prices across major markets in Bangladesh. Users can observe real-time price fluctuations, view top price risers and fallers, filter by category with numeric Bengali numeral sorting, inspect market-specific breakdown tables, and manage their user profile with photo upload.


---

## 📖 Table of Contents

1. [Project Overview](#-project-overview)
2. [Technologies Used](#-technologies-used)
3. [Key Features](#-key-features)
5. [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
6. [Environment Variables](#-environment-variables)
7. [OAuth Setup Guide (Google & GitHub)](#-oauth-setup-guide-google--github)
8. [Local Development Setup](#-local-development-setup)
9. [Production Build & Deployment](#-production-build--deployment)


---

## 💡 Project Overview

In everyday life in Bangladesh, prices of staple food items (rice, lentils, edible oil, onions, vegetables, fish, chicken, eggs, and spices) fluctuate rapidly across different wholesale and retail markets. **BazarDor** bridges the information gap by providing an intuitive, transparent, and aesthetically polished platform:

- **Live Price Ticker:** Infinite marquee displaying current rates and trend indicators (▲/▼).
- **Market Highlights:** Fast visual discovery of items that gained or dropped in price today.
- **Deep Market Breakdown:** Division-wise breakdown (Dhaka, Chattogram, Rajshahi, Khulna, Sylhet, Barishal, Rangpur) with minimum, maximum, and average rates.
- **Bangla-First Experience:** Crafted with authentic Bengali typography using **Hind Siliguri**, accurate Bengali numerals, and formatted dates.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Full-stack React framework utilizing Server & Client Components, Turbopack, and Dynamic Routing |
| **TypeScript** | Type safety, maintainability, and structured data contracts |
| **Tailwind CSS v4** | Modern utility-first styling and responsive layouts |
| **DaisyUI v5** | Accessible UI components styled with the custom `bazardor` OKLCH theme token palette |
| **BetterAuth** | Secure authentication engine supporting Email/Password, Google OAuth, and GitHub OAuth |
| **MongoDB Atlas** | Cloud database persistence with MongoDB native driver replica set connectivity |
| **Next Font (Hind Siliguri)** | Google Font integration with zero layout shift (CLS) and Bengali typography |
| **React Hot Toast** | Responsive toast feedback for user actions and route guards |

---

## 🌟 Key Features

### 1. 🔝 Interactive Header & Swipable Category Bar
- **Branding:** Displays the logo (`🛒 বাজার দর`) alongside real-time Bengali calendar dates.
- **Swipable Category Navigation:** Horizontal scrollable category navigation bar (`overflow-x-auto`) for seamless mobile touch navigation.
- **Infinite Price Ticker (Marquee):** Smooth scrolling price strip showcasing commodity emojis, names, prices per unit, and percentage change tags. Pauses on hover.

### 2. 🅱️ Hero Banner with Smooth Anchor Navigation
- Date eyebrow badge, headline, and contextual summary text.
- Primary **CTA Button** that smoothly scrolls the user down to `#সব-পণ্য` on the same page.
- Clean vector illustration (`bazar-hero.svg` and `bazar-hero.png`).

### 3. ⚖️ Dynamic Home Market Sections
- **Section A — "আজ দাম বেড়েছে ▲":** Highlights the top 6 price risers sorted by percentage increase.
- **Section B — "আজ দাম কমেছে ▼":** Highlights the top 6 price fallers sorted by percentage decrease.
- **Section C — "সব পণ্য":** Displays the complete catalog in a responsive grid (1 column on mobile, 2 on tablet, 3–4 on desktop).

### 4. 🔒 Protected Product Details (`/product/[slug]`)
- **Route Protection:** Enforced through middleware/proxy; unauthenticated users are redirected to `/signin` with informative toast feedback and callback URL retention.
- **Market Price Summary:** Minimum, Maximum, Average, and Today's Price summary cards.
- **Division-wise Market Breakdown:** Grouped tables showing wholesale and retail prices across divisions.
- **Historical Comparison:** Cards comparing today's rate with yesterday, last week, and last month.

### 5. 🔍 Category Filtering & Bengali Numeric Sorting (Challenge C1)
- Category-filtered product grid with total product count in Bengali numerals.
- **Sort Dropdown:** Options for `ডিফল্ট`, `দাম: কম থেকে বেশি`, and `দাম: বেশি থেকে কম`. Accurately sorts prices by numeric value rather than lexicographical string comparison.
- **Graceful Empty State:** Friendly message and CTA to return home if a category has no products.

### 6. 🔐 Complete Authentication System
- **Sign In (`/signin`):** Supports Email/Password login, Google OAuth, and GitHub OAuth with skeleton loading states and translated Bengali error messages.
- **Sign Up (`/signup`):** Includes mandatory **Password Confirmation** validation (must enter password twice).
- **Toast Feedback:** Informative toast alerts for sign-in, registration, sign-out, and validation errors.

### 7. 👤 User Profile & Photo Upload (Challenge C3)
- **Profile View (`/profile`):** Displays avatar, name, and email with direct navigation to the update page.
- **Profile Update (`/profile/update`):** Allows users to update their full name and **upload a profile picture** via local file picker (with automatic Base64 encoding for database storage) or direct URL.
- **Live Avatar Synchronization:** The updated photo and name instantly reflect in the Navbar dropdown and Profile page without manual refresh.

### 8. 📱 Universal Device Responsiveness & Design Polish
- Fully tested across mobile (< 640px), tablet (640px–1024px), and desktop (> 1024px) screens.
- Custom favicon (`icon.png`) with green shopping cart logo for browser tabs and mobile bookmarks.
- Custom friendly 404 page (`/_not-found`) with return home navigation.
- Skeleton loaders during asynchronous data fetching to eliminate layout shift.

---

## 📂 Project Architecture & Directory Structure

```plaintext
bazardor/
├── public/
│   ├── bazar-hero.png          # Authentic assignment hero graphic
│   ├── bazar-hero.svg          # Optimized vector illustration
│   ├── logo-icon.png           # Authentic assignment favicon/logo
│   └── icon.png                # Public app icon
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/[...all]/  # BetterAuth catch-all API route handler
│   │   ├── category/[slug]/    # Dynamic category listing page with sorting
│   │   ├── product/[slug]/     # Protected product details page
│   │   ├── profile/
│   │   │   ├── page.tsx        # User profile summary page
│   │   │   └── update/         # User profile update & photo upload page
│   │   ├── signin/             # Sign-in page with social login buttons
│   │   ├── signup/             # Sign-up page with password confirmation
│   │   ├── globals.css         # Tailwind v4, DaisyUI, OKLCH tokens, marquee
│   │   ├── layout.tsx          # Root layout with Hind Siliguri font and Navbar
│   │   ├── loading.tsx         # Root skeleton loading state
│   │   ├── not-found.tsx       # Custom 404 friendly not-found page
│   │   └── page.tsx            # Home page (Hero, Risers, Fallers, All Products)
│   ├── components/
│   │   ├── AllProducts.tsx     # Responsive grid of all commodity cards
│   │   ├── Footer.tsx          # Clean theme-aligned footer
│   │   ├── Hero.tsx            # Hero banner with smooth anchor link
│   │   ├── Navbar.tsx          # Dual-row responsive navbar with user dropdown
│   │   ├── PriceFallers.tsx    # Top 6 fallers section (▼)
│   │   ├── PriceRisers.tsx     # Top 6 risers section (▲)
│   │   ├── PriceTicker.tsx     # Infinite marquee ticker with hover pause
│   │   ├── ProductCard.tsx     # Reusable commodity card component
│   │   └── SortDropdown.tsx    # Accessible category sorting component
│   ├── lib/
│   │   ├── auth.ts             # BetterAuth server config & MongoDB connection
│   │   ├── auth-client.ts      # BetterAuth React client config
│   │   └── utils.ts            # API fetcher, Bengali numeral converter & types
│   └── proxy.ts                # Next.js route protection middleware
├── .env.local                  # Local environment configuration
├── next.config.ts              # Next.js Turbopack configuration
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection (Direct Replica Set URI recommended)
MONGODB_URI=mongodb://username:password@host1:27017,host2:27017,host3:27017/bazardor?ssl=true&replicaSet=atlas-shard-0&authSource=admin&retryWrites=true&w=majority
MONGODB_URL=mongodb://username:password@host1:27017,host2:27017,host3:27017/bazardor?ssl=true&replicaSet=atlas-shard-0&authSource=admin&retryWrites=true&w=majority

# BetterAuth Secrets & Application URL
BETTER_AUTH_SECRET=your_secure_random_secret_at_least_32_characters
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

> **Note on Vercel:** In production on Vercel, set `NEXT_PUBLIC_APP_URL` and `BETTER_AUTH_URL` to `https://bazardor-amber.vercel.app` (or your live domain).

---

## 🔧 OAuth Setup Guide (Google & GitHub)

### Google Cloud Console Configuration
1. Open [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials).
2. Select your OAuth 2.0 Web Client.
3. Under **Authorised JavaScript origins**, add:
   - `http://localhost:3000`
   - `https://bazardor-amber.vercel.app`
4. Under **Authorised redirect URIs**, add:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://bazardor-amber.vercel.app/api/auth/callback/google`
5. Under the **Audience** (OAuth Consent Screen) tab:
   - If the app is in **Testing** mode, add your Gmail under **Test users** (`+ Add users`).
   - Or click **Publish app** so any user/examiner can authenticate freely.

### GitHub Developer Settings Configuration
1. Open [GitHub Developer Settings > OAuth Apps](https://github.com/settings/developers).
2. Select your OAuth application.
3. Set **Homepage URL** to: `https://bazardor-amber.vercel.app/`
4. Set **Authorization callback URL** to:
   - `https://bazardor-amber.vercel.app/api/auth/callback/github`
5. Save changes.

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/imranonweb/bazardor.git
cd bazardor
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Ensure `.env.local` is present in the root directory with valid credentials.

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Deployment

To validate type checks and create an optimized production bundle:

```bash
npm run build
npm run start
```

### Deploying to Vercel
1. Import the repository from GitHub on [Vercel](https://vercel.com).
2. Add all environment variables listed above in the Vercel project settings.
3. Deploy! Vercel handles continuous deployment on every git push to `main`.

---

## 👤 Author

**Al Imran Emon**  
- **GitHub:** [@imranonweb](https://github.com/imranonweb)  
- **Live Application:** [https://bazardor-amber.vercel.app](https://bazardor-amber.vercel.app)
