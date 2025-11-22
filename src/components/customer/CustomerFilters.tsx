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
    <div
      className="
        flex flex-col gap-3 mb-4
        sm:flex-row sm:items-center sm:gap-4
      "
    >
      <input
        type="text"
        placeholder="Buscar cliente por contacto..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="
          border px-3 py-2 rounded-lg 
          w-full sm:w-80
        "
      />

      <button
        onClick={() => onSearch(text)}
        className="
          bg-blue-600 text-white px-4 py-2 rounded-lg
          w-full sm:w-auto
        "
      >
        Buscar
      </button>

      <button
        onClick={onCreate}
        className="
          bg-green-600 text-white px-4 py-2 rounded-lg
          w-full sm:w-auto
        "
      >
        ➕ Crear Cliente
      </button>
    </div>
  );
}
