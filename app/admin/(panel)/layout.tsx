import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "../actions";
import { isAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="min-h-[70vh] bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm">
          <div className="flex flex-wrap items-center gap-4 font-medium">
            <span className="font-semibold text-airban">Airban</span>
            <Link href="/admin">Enquiries</Link>
            <Link href="/admin/properties">Properties</Link>
            <Link href="/admin/doors">Doors</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/home" className="text-slate-500 hover:text-airban">
              View site
            </Link>
            <form action={logout}>
              <button className="text-slate-500 hover:text-airban">Sign out</button>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-8">{children}</div>
    </div>
  );
}
