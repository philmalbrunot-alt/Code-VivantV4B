export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function slugToken() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

export function getBaseUrl(req?: Request) {
  if (process.env.APP_BASE_URL) return process.env.APP_BASE_URL;
  if (req) return new URL(req.url).origin;
  return 'http://localhost:3000';
}
