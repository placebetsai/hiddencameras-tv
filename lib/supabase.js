import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ababarvluvlxukieireh.supabase.co";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_oeL32eGMraEARjUTN6JWIQ_EcvPFVv_";

export const supabase = createClient(URL, ANON);
