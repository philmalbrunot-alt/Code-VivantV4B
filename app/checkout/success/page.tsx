import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{
    token?: string;
    session_id?: string;
  }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const token = params.token;
  const sessionId = params.session_id;

  if (!token) {
    return (
      <main className="min-h-screen bg-[#070311] text-white flex items-center justify-center px-6">
        <div className="max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="text-sm uppercase tracking-[0.22em] text-[#c89b5a]">
            Paiement confirmé
          </p>
          <h1 className="mt-4 text-3xl font-serif">
            Préparation impossible
          </h1>
          <p className="mt-4 text-white/70 leading-7">
            Le retour Stripe ne contient pas le token attendu. Reprenez le parcours depuis la page de résultat.
          </p>
        </div>
      </main>
    );
  }

  const qs = new URLSearchParams();
  qs.set("token", token);
  if (sessionId) qs.set("session_id", sessionId);

  redirect(`/lecture/prepare?${qs.toString()}`);
}
