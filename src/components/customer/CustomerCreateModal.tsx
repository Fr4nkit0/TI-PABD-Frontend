import { useState } from "react";
import type { Customer } from "../../types";

export default function CustomerCreateModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (c: Customer) => void;
}) {
  const [form, setForm] = useState<Partial<Customer>>({});

  const update = (key: keyof Customer, value: any) => {
    setForm({ ...form, [key]: value });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[500px]">

        <h2 className="text-xl font-bold mb-4">Crear Cliente</h2>

        <div className="grid grid-cols-2 gap-4">
          <input className="input" placeholder="ID" onChange={(e) => update("customerid", e.target.value)} />
          <input className="input" placeholder="Compañía" onChange={(e) => update("companyname", e.target.value)} />
          <input className="input" placeholder="Contacto" onChange={(e) => update("contactname", e.target.value)} />
          <input className="input" placeholder="Cargo" onChange={(e) => update("contacttitle", e.target.value)} />
          <input className="input" placeholder="Dirección" onChange={(e) => update("address", e.target.value)} />
          <input className="input" placeholder="Ciudad" onChange={(e) => update("city", e.target.value)} />
          <input className="input" placeholder="Región" onChange={(e) => update("region", e.target.value)} />
          <input className="input" placeholder="Código Postal" onChange={(e) => update("postalcode", e.target.value)} />
          <input className="input" placeholder="País" onChange={(e) => update("country", e.target.value)} />
          <input className="input" placeholder="Teléfono" onChange={(e) => update("phone", e.target.value)} />
          <input className="input" placeholder="Fax" onChange={(e) => update("fax", e.target.value)} />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancelar</button>

          <button
            onClick={() => onSave(form as Customer)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
