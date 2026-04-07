import { getKv } from '@/lib/kv';
import type { ReadingRecord } from '@/lib/types';

function key(token: string) {
  return `reading:${token}`;
}

export async function saveReading(record: ReadingRecord) {
  await getKv().set(key(record.token), record);
}

export async function getReading(token: string) {
  return getKv().get<ReadingRecord>(key(token));
}

export async function updateReading(token: string, patch: Partial<ReadingRecord>) {
  const current = await getReading(token);
  if (!current) return null;
  const next = { ...current, ...patch };
  await saveReading(next);
  return next;
}
