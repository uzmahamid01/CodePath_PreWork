import { createClient } from '@supabase/supabase-js';

// create a variable caller url
const URL = 'https://hblkfgklgltvatkdwjkj.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibGtmZ2tsZ2x0dmF0a2R3amtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNDc3MzksImV4cCI6MjAzOTYyMzczOX0.ZpWp7wqztT5_Nk7R8RmgmPDoagSc0FM79gdaBFtQcUc';
export const supabase = createClient(URL, API_KEY);
