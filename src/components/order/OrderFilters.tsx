import { useState } from "react";

export default function OrderFilters({
  onSearch,
}: {
  onSearch: (customer: string, employee: string) => void;
}) {
  const [customer, setCustomer] = useState("");
  const [employee, setEmployee] = useState("");

  return (
    <div className="mb-4 flex gap-4">
      <input
        type="text"
        placeholder="Buscar por Cliente..."
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        className="border rounded-lg px-3 py-2 w-64"
      />

      <input
        type="text"
        placeholder="Buscar por Empleado..."
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
        className="border rounded-lg px-3 py-2 w-64"
      />

      <button
        onClick={() => onSearch(customer, employee)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Buscar
      </button>
    </div>
  );
}
