import { AlertCircle } from "lucide-react";
import type { Customer } from "../../types"; 

interface SimpleInputFieldProps {
  fieldKey: keyof Customer;
  placeholder: string;
  type?: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
}

export function SimpleInputField({
  fieldKey,
  placeholder,
  type = "text",
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled = false,
}: SimpleInputFieldProps) {
  return (
    <div>
      <input
        type={type}
        value={value}
        disabled={disabled}
        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
          disabled
            ? "bg-gray-100 cursor-not-allowed text-gray-500"
            : error && touched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {error && touched && (
        <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}