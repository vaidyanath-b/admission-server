import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

import dotenv from "dotenv";
dotenv.configDotenv();
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase URL or Key");
}
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export { supabase };
