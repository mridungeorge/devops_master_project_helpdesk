
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// These would come from environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
  },
});

// Define database types to match our existing models
export type Tables = {
  users: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
  tickets: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee_id: string | null;
    reporter_id: string;
    created_at: string;
    updated_at: string;
    ai_suggestion: string | null;
  };
  comments: {
    id: string;
    ticket_id: string;
    content: string;
    author_id: string;
    created_at: string;
  };
};

export const handleSupabaseError = (error: any, defaultMessage: string = 'An error occurred') => {
  console.error(error);
  toast.error(error?.message || defaultMessage);
};

export default supabase;
