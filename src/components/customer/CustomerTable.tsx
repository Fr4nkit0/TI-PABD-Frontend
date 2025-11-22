import { useState } from "react";
import { Pencil } from "lucide-react";
import type { Customer } from "../../types";
import CustomerUpdateModal from "./CustomerUpdateModal";

export default function CustomerTable({
  customers,
  onUpdateCustomer,
}: {
  customers: Customer[];
  onUpdateCustomer: (customer: Customer) => void;
}) {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const safe = (value: any) =>
    value === null || value === undefined || value === "" ? "—" : value;

  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setUpdateModalOpen(true);
  };

  const handleUpdate = (updatedCustomer: Customer) => {
    onUpdateCustomer(updatedCustomer);
    setUpdateModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleCloseModal = () => {
    setUpdateModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <>
      <div className="w-full overflow-x-auto rounded-xl border border-gray-300 shadow bg-white">
        <table className="min-w-[1200px] w-full text-left table-auto">
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
                "Acciones",
              ].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 font-semibold text-blue-700 text-sm whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-4 py-6 text-center text-gray-500 italic">
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

                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => handleEditClick(c)}
                      className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                      title="Editar cliente"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CustomerUpdateModal
        open={updateModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
        customer={selectedCustomer}
      />
    </>
  );
}
