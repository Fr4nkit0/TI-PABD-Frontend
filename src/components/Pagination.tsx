import type { PaginationProps } from "../types";

export default function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) {
  const disabledStyle =
    "bg-gray-200/70 text-gray-400 cursor-not-allowed shadow-none border-gray-300";

  const activeStyle =
    "bg-white/80 backdrop-blur-xl text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 shadow-md";

  return (
    <div className="flex items-center justify-center mt-10">

      <div className="
        flex items-center gap-6 px-6 py-4 
        rounded-2xl border border-gray-300 shadow-md 
        bg-white/40 backdrop-blur-xl
      ">
        
        {/* BTN ANTERIOR */}
        <button
          onClick={onPrev}
          disabled={page === 1}
          className={`
            flex items-center gap-2 px-5 py-2 rounded-xl font-medium 
            border transition-all duration-300
            ${page === 1 ? disabledStyle : activeStyle}
          `}
        >
          <span className="text-lg">←</span>
          <span>Anterior</span>
        </button>

        {/* Página */}
        <span className="text-gray-700 font-semibold text-lg tracking-wide">
          {page} / {totalPages}
        </span>

        {/* BTN SIGUIENTE */}
        <button
          onClick={onNext}
          disabled={page === totalPages}
          className={`
            flex items-center gap-2 px-5 py-2 rounded-xl font-medium 
            border transition-all duration-300
            ${page === totalPages ? disabledStyle : activeStyle}
          `}
        >
          <span>Siguiente</span>
          <span className="text-lg">→</span>
        </button>

      </div>
    </div>
  );
}
