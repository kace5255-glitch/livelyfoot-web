import { createServerSupabase, createServiceSupabase } from './supabase-server';
import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export type StaffProfile = {
  id: string;
  name: string;
  role: 'admin' | 'therapist';
  permissions: string[];
  commission_rate: number;
  active: boolean;
};

export async function getStaffSession(): Promise<StaffProfile | null> {
  // Try cookie-based session first
  const supabase = await createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  let userId: string | null = session?.user?.id ?? null;

  // Fallback: read Bearer token from Authorization header
  if (!userId) {
    const headerStore = await headers();
    const authHeader = headerStore.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const anonClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await anonClient.auth.getUser(token);
      userId = data.user?.id ?? null;
    }
  }

  if (!userId) return null;

  const serviceClient = await createServiceSupabase();
  const { data: profile } = await serviceClient
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (!profile || !profile.active) return null;
  return profile as StaffProfile;
}

export function hasPermission(profile: StaffProfile, permission: string): boolean {
  if (profile.role === 'admin') return true;
  return (profile.permissions || []).includes(permission);
}
