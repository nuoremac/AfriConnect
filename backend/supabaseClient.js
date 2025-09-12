require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Create a single Supabase client for all future interactions
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;