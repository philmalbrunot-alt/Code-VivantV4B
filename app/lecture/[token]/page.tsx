import { redirect } from 'next/navigation';
import { BrandHeader, Container, Shell } from '@/components/ui';
import { PremiumReadingView } from '@/components/premium-reading';
import { getReading } from '@/lib/reading';

export const dynamic = 'force-dynamic';

export default async function ReadingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  if (!token) {
    redirect('/');
  }

  const record = await getReading(token);

  if (!record) {
    redirect(`/lecture/prepare?token=${encodeURIComponent(token)}`);
  }

  if (record.status !== 'ready' || !record.premium) {
    redirect(`/lecture/prepare?token=${encodeURIComponent(token)}`);
  }

  return (
    <Shell>
      <Container>
        <BrandHeader />
        <PremiumReadingView reading={record.premium} />
      </Container>
    </Shell>
  );
}
