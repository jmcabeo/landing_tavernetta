import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qzzgnhytpbwdintixyxg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6emduaHl0cGJ3ZGludGl4eXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDExNjgsImV4cCI6MjA4NTI3NzE2OH0.6Xw7ru01MyS-OG4ngEMKtTnoCge1LY8z_oibPhCjwNU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
