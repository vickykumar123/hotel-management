import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://owlxfrhroeakofwcduvz.supabase.co";
const supabaseKey = "YOUR_SUPABASE_API_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
