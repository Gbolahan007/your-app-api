import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ebmlfphueaujailmltny.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibWxmcGh1ZWF1amFpbG1sdG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNzg5NzUsImV4cCI6MjA1NzY1NDk3NX0.A5ZZBX6YmbEhGtXEEXy8pNy2mnASLLT93-PKpOy2iL0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
