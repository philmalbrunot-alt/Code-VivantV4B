import { Redis } from '@upstash/redis';

let memory = new Map<string, unknown>();

export function getKv() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (url && token) {
    return Redis.fromEnv();
  }

  return {
    async get<T>(key: string): Promise<T | null> {
      return (memory.get(key) as T | undefined) ?? null;
    },
    async set(key: string, value: unknown) {
      memory.set(key, value);
      return 'OK';
    },
    async del(key: string) {
      memory.delete(key);
      return 1;
    },
  };
}
