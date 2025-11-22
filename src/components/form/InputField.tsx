import { AlertCircle } from "lucide-react";
import type { Customer } from "../../types"; 

interface InputFieldProps {
  fieldKey: keyof Customer;
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
  type?: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
}

export function InputField({
  fieldKey,
  icon: Icon,
  placeholder,
  type = "text",
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled = false,
}: InputFieldProps) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        disabled={disabled}
        className={`w-full px-4 py-2.5 pl-10 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
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
      <Icon
        className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
          disabled
            ? "text-gray-400"
            : error && touched
            ? "text-red-500"
            : "text-gray-400"
        }`}
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