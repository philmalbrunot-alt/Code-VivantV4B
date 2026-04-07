'use client';

import { useSearchParams } from 'next/navigation';
import { PrepareScreen } from '@/components/prepare-screen';

export default function PreparePage() {
  const params = useSearchParams();
  const token = params.get('token');
  if (!token) return null;
  return <PrepareScreen token={token} />;
}
