import { counts, listEnquiries } from "@/lib/db";
import { updateEnquiryStatus } from "../actions";

export const metadata = { title: "Enquiries" };

export default function AdminHome() {
  const enquiries = listEnquiries();
  const summary = counts();

  return (
    <div>
      <h1 className="text-3xl font-semibold">Enquiries</h1>
      <p className="mt-2 text-sm text-slate-500">
        {summary.pending} pending · {summary.properties} listed properties · {summary.doors} doors
      </p>
      <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">From</th>
              <th className="px-4 py-3 font-medium">About</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id} className="border-t border-slate-100 align-top">
                <td className="px-4 py-4">
                  <p className="font-medium">
                    {enquiry.firstName} {enquiry.lastName}
                  </p>
                  <p className="text-slate-500">{enquiry.email}</p>
                  <p className="text-slate-500">{enquiry.phone}</p>
                </td>
                <td className="px-4 py-4">{enquiry.enquiryType}</td>
                <td className="max-w-sm px-4 py-4 whitespace-pre-wrap text-slate-600">
                  {enquiry.additionalInfo || "—"}
                </td>
                <td className="px-4 py-4">
                  <p className={enquiry.status === "pending" ? "font-medium text-amber-700" : "font-medium text-emerald-700"}>
                    {enquiry.status}
                  </p>
                  <form action={updateEnquiryStatus} className="mt-2">
                    <input type="hidden" name="id" value={enquiry.id} />
                    <input
                      type="hidden"
                      name="status"
                      value={enquiry.status === "pending" ? "resolved" : "pending"}
                    />
                    <button className="text-xs font-semibold text-airban">
                      Mark {enquiry.status === "pending" ? "resolved" : "pending"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {enquiries.length === 0 && <p className="px-4 py-6 text-sm text-slate-500">No enquiries yet.</p>}
      </div>
    </div>
  );
}
