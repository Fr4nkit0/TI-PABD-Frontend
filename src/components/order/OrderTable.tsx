import type { Order } from "../../types";

export default function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 shadow-lg bg-white">
      <table className="min-w-full text-left">
        <thead className="bg-blue-50 border-b">
          <tr>
            {["Fecha", "Cliente ID", "Compañía", "Empleado", "Monto"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-sm font-semibold text-blue-700"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y">
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-6 text-center text-gray-500 italic"
              >
                No hay resultados
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{order.orderdate}</td>
                <td className="px-4 py-2">{order.customerid}</td>
                <td className="px-4 py-2">{order.companyname.trim()}</td>
                <td className="px-4 py-2">{order.employeename}</td>
                <td className="px-4 py-2 text-right font-semibold text-gray-800">
                  ${order.orderamount}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
