import { createClient } from '@supabase/supabase-js';

// These two values come from the .env file in the project root.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// One shared connection to your Supabase project, used across the app.
export const supabase = createClient(supabaseUrl, supabaseKey);
