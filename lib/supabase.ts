import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!rawUrl || !key) {
  throw new Error("Thiếu biến môi trường Supabase");
}

// Người dùng đôi khi sao chép nhầm REST endpoint (.../rest/v1) thay vì Project URL.
// Chuẩn hóa về URL gốc của project để Supabase Auth gọi đúng /auth/v1/token.
const url = rawUrl
  .replace(/\/+$/, "")
  .replace(/\/rest\/v1$/i, "")
  .replace(/\/auth\/v1$/i, "");

if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL không hợp lệ. Hãy dùng dạng https://<project-ref>.supabase.co"
  );
}

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
