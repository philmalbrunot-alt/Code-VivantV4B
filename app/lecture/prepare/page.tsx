import { notFound } from 'next/navigation';
import { PrepareScreen } from '@/components/prepare-screen';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams?: Promise<{
    token?: string;
  }>;
};

export default async function PreparePage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const token = params.token;
  if (!token) notFound();
  return <PrepareScreen token={token} />;
}
