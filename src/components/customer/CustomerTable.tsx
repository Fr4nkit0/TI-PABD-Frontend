import type { Customer } from "../../types";

export default function CustomerTable({ customers }: { customers: Customer[] }) {
  const safe = (value: any) =>
    value === null || value === undefined || value === "" ? "—" : value;

  return (
      <div className="w-full overflow-hidden rounded-xl border border-gray-300 shadow bg-white">
        <table className="w-full text-left table-auto">
          <thead className="bg-blue-50 border-b">
            <tr>
              {[
                "ID",
                "Compañía",
                "Contacto",
                "Cargo",
                "Dirección",
                "Ciudad",
                "Región",
                "Código Postal",
                "País",
                "Teléfono",
                "Fax",
              ].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 font-semibold text-blue-700 text-sm"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {customers.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No hay resultados
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.customerid} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-bold">{safe(c.customerid)}</td>
                  <td className="px-3 py-2">{safe(c.companyname)}</td>
                  <td className="px-3 py-2">{safe(c.contactname)}</td>
                  <td className="px-3 py-2">{safe(c.contacttitle)}</td>
                  <td className="px-3 py-2">{safe(c.address)}</td>
                  <td className="px-3 py-2">{safe(c.city)}</td>
                  <td className="px-3 py-2">{safe(c.region)}</td>
                  <td className="px-3 py-2">{safe(c.postalcode)}</td>
                  <td className="px-3 py-2">{safe(c.country)}</td>
                  <td className="px-3 py-2">{safe(c.phone)}</td>
                  <td className="px-3 py-2">{safe(c.fax)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
  );
}
