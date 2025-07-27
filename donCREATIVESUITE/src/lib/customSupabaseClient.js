import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://buplfqaypzuunbjxvupk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cGxmcWF5cHp1dW5ianh2dXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MDk0MzAsImV4cCI6MjA2OTA4NTQzMH0.dSetGBSQlfKSQAY-yl0u8DF4vaAWxsVEqlJn1N5CMkA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);