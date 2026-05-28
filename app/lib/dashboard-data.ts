import { supabase } from './supabase';

export async function getDashboardPreviewData() {
  const [{ data: subscriptions }, { data: credits }] = await Promise.all([
    supabase.from('subscriptions').select('*').limit(1),
    supabase.from('credits').select('*').limit(1),
  ]);

  return {
    subscription: subscriptions?.[0] || null,
    credits: credits?.[0] || null,
  };
}
