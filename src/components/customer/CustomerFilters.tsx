import { useState } from "react";

export default function CustomerFilters({
  onSearch,
  onCreate,
}: {
  onSearch: (text: string) => void;
  onCreate: () => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border px-3 py-2 rounded-lg w-80"
      />

      <button
        onClick={() => onSearch(text)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Buscar  
      </button>

      <button
        onClick={onCreate}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        ➕ Crear Cliente
      </button>
    </div>
  );
}
