import Link from "next/link";
import { login } from "../actions";

export const metadata = { title: "Staff desk" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <section className="grid min-h-[70vh] place-items-center px-5 py-16">
      <form action={login} className="w-full max-w-md rounded-3xl border border-slate-100 p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-airban">Staff desk</p>
        <h1 className="mt-2 text-2xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          This desk runs on the local database. For the demo, the password is <span className="font-semibold text-slate-800">airban</span>.
        </p>
        <label className="mt-6 grid gap-1 text-sm">
          Password
          <input name="password" type="password" required className="field" />
        </label>
        {params.error && <p className="mt-3 text-sm text-red-600">That password did not match.</p>}
        <button className="btn mt-6 w-full">Enter desk</button>
        <Link href="/home" className="mt-4 block text-center text-sm text-slate-500 hover:text-airban">
          Back to the website
        </Link>
      </form>
    </section>
  );
}
