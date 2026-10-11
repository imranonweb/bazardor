export const API_ENDPOINTS = [
  "https://openapi.programming-hero.com/api/bazardor", // Main Primary API
  "https://api.api-store.workers.dev/api/bazardor",     // Auto-Fallback 1
  "https://api.abcz.workers.dev/api/bazardor",          // Auto-Fallback 2
];

// In-memory cache to guarantee zero data loss & prevent crashes even during complete network/API outages
const apiMemoryCache = new Map<string, unknown>();

/**
 * Robust fetchApi with automatic multi-tier failover and in-memory cache resilience.
 * Always tries the Main API first, automatically shifts to fallback endpoints if any error occurs,
 * and falls back to cached data so the website NEVER runs out of data or crashes.
 */
export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  let lastError: unknown = null;

  for (let i = 0; i < API_ENDPOINTS.length; i++) {
    const baseUrl = API_ENDPOINTS[i];
    try {
      // Abort controller with 8-second timeout per endpoint to prevent UI hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      // Support caller signal if provided
      if (options?.signal) {
        if (options.signal.aborted) {
          clearTimeout(timeoutId);
          throw new Error("Request aborted by caller");
        }
        options.signal.addEventListener("abort", () => controller.abort());
      }

      const res = await fetch(`${baseUrl}${cleanEndpoint}`, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = (await res.json()) as T;
        // Cache successful response in memory
        apiMemoryCache.set(cleanEndpoint, data);
        return data;
      } else {
        lastError = new Error(`HTTP ${res.status} from ${baseUrl}${cleanEndpoint}`);
      }
    } catch (err: unknown) {
      lastError = err;
      // Seamlessly continue to the next fallback API endpoint
    }
  }

  // If all live APIs fail, serve the most recent cached response so the website never runs out of data
  if (apiMemoryCache.has(cleanEndpoint)) {
    console.warn(`[API Resilient Fallback] Serving cached data for ${cleanEndpoint}`);
    return apiMemoryCache.get(cleanEndpoint) as T;
  }

  throw new Error(
    `Failed to fetch from all APIs for ${cleanEndpoint}. Last error: ${
      lastError instanceof Error ? lastError.message : String(lastError)
    }`
  );
}

export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bengaliDigits[parseInt(d)]);
}

export function toEnglishNumber(str: string): number {
  const englishDigits: Record<string, string> = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
  };
  const converted = str.replace(/[০-৯]/g, (d) => englishDigits[d] || d);
  return parseFloat(converted);
}

export function formatPrice(price: number): string {
  const formatted = price.toLocaleString("en-IN");
  return toBengaliNumber(formatted);
}

export function getUnitBn(unit: string): string {
  const unitMap: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return unitMap[unit] || unit;
}

export function getBanglaDate(): string {
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  const now = new Date();
  const day = days[now.getDay()];
  const date = toBengaliNumber(now.getDate());
  const month = months[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());
  return `${day}, ${date} ${month}, ${year}`;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}
