'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

type StaffUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'therapist';
};

export function useStaffAuth(requiredRole?: 'admin' | 'therapist') {
  const [user, setUser] = useState<StaffUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    function handleUser(u: User | null, accessToken: string | null) {
      if (!mounted) return;
      if (!u) {
        setLoading(false);
        router.replace('/TallyApp');
        return;
      }

      const staff: StaffUser = {
        id: u.id,
        name: u.user_metadata?.name || 'User',
        email: u.email || '',
        role: u.user_metadata?.role || 'therapist',
      };

      if (requiredRole && staff.role !== requiredRole) {
        router.replace(staff.role === 'admin' ? '/TallyApp/admin' : '/TallyApp/dashboard');
        return;
      }

      setUser(staff);
      setToken(accessToken);
      setLoading(false);
    }

    supabase.auth.getSession().then(({ data }: { data: { session: { user: User; access_token: string } | null } }) => {
      handleUser(data.session?.user ?? null, data.session?.access_token ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: { user: User; access_token: string } | null) => {
      handleUser(session?.user ?? null, session?.access_token ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, requiredRole]);

  return { user, token, loading };
}
