import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase project details
const supabaseUrl = "https://hqabvjnqpomlnxovrqfp.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxYWJ2am5xcG9tbG54b3ZycWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3Njg3NjksImV4cCI6MjA1NjM0NDc2OX0.2uuTOHRxGAm5S3UQt0so4S_1v-7qzLe_nkYZUQEeBUU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true }
  });