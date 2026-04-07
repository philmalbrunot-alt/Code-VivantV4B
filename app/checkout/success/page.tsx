'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      router.replace('/');
      return;
    }
    router.replace(`/lecture/prepare?token=${encodeURIComponent(token)}`);
  }, [params, router]);

  return null;
}
