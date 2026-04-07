import { createClient, type RedisClientType } from 'redis';

let memory = new Map<string, unknown>();
let clientPromise: Promise<RedisClientType> | null = null;

async function getRedisClient() {
  if (!process.env.REDIS_URL) return null;

  if (!clientPromise) {
    const client = createClient({
      url: process.env.REDIS_URL,
    });

    client.on('error', (err) => {
      console.error('redis error', err);
    });

    clientPromise = client.connect().then(() => client);
  }

  return clientPromise;
}

export function getKv() {
  return {
    async get<T>(key: string): Promise<T | null> {
      const client = await getRedisClient();
      if (!client) {
        return (memory.get(key) as T | undefined) ?? null;
      }

      const raw = await client.get(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    },

    async set(key: string, value: unknown) {
      const client = await getRedisClient();
      if (!client) {
        memory.set(key, value);
        return 'OK';
      }

      await client.set(key, JSON.stringify(value));
      return 'OK';
    },

    async del(key: string) {
      const client = await getRedisClient();
      if (!client) {
        memory.delete(key);
        return 1;
      }

      return client.del(key);
    },
  };
}
