require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Récupération des variables d'environnement
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Création d'un client Supabase unique pour tout le projet
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
