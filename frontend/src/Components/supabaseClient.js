// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// ⚠️ Assure-toi de mettre tes vraies valeurs dans .env.local
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
