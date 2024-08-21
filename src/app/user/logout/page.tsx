'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { logoutUser } from '../../actions';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await logoutUser();
      router.push('/');
    }

    logout();
  }, [router]);

  return <p>Logging out...</p>;
}
