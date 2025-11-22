import { useState } from "react";
import { X, Building2, User, Briefcase, MapPin, Phone, Printer, Globe, AlertCircle } from "lucide-react";
import type { Customer } from "../../types";
import { InputField } from "../form/InputField";
import { SimpleInputField } from "../form/SimpleInputField";
import { validateField } from "../../utils/customerValidation";

export default function CustomerCreateModal({
  open,
  onClose,
  onSave,
  error,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (c: Customer) => void;
  error?: string | null;
}) {
  const [form, setForm] = useState<Partial<Customer>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Customer, boolean>>>({});

  const update = (key: keyof Customer, value: string) => {
    const newForm = { ...form, [key]: value };
    setForm(newForm);

    // Validar solo si el campo ya fue tocado
    if (touched[key]) {
      const error = validateField(key, value, newForm);
      setErrors({ ...errors, [key]: error || undefined });
    }
  };

  const handleBlur = (key: keyof Customer) => {
    setTouched({ ...touched, [key]: true });
    const error = validateField(key, form[key] || "", form);
    setErrors({ ...errors, [key]: error || undefined });
  };

  const handleSave = () => {
    // Campos requeridos
    const requiredFields: (keyof Customer)[] = [
      "customerid",
      "companyname",
      "contactname",
      "contacttitle",
      "address",
      "city",
    ];

    // Todos los campos del formulario
    const allFields: (keyof Customer)[] = [
      "customerid",
      "companyname",
      "contactname",
      "contacttitle",
      "address",
      "city",
      "region",
      "postalcode",
      "country",
      "phone",
      "fax",
    ];

    // Marcar todos como tocados (para que se muestren los errores)
    const newTouched: Partial<Record<keyof Customer, boolean>> = {};
    allFields.forEach((key) => (newTouched[key] = true));
    setTouched(newTouched);

    // Validar todos los campos
    const newErrors: Partial<Record<keyof Customer, string>> = {};
    allFields.forEach((key) => {
      const value = form[key] || "";
      const error = validateField(key, value, form);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    // Si hay errores -> no guardar
    if (Object.keys(newErrors).length > 0) return;

    // Guardar
    onSave(form as Customer);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Crear Nuevo Cliente</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Mensaje de error del backend */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex-shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-800 mb-1">
                  Error al crear cliente
                </h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Información Básica */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Información Básica
                <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  fieldKey="customerid"
                  icon={Building2}
                  placeholder="ID del Cliente *"
                  value={form.customerid || ""}
                  error={errors.customerid}
                  touched={touched.customerid}
                  onChange={(val) => update("customerid", val)}
                  onBlur={() => handleBlur("customerid")}
                />
                <InputField
                  fieldKey="companyname"
                  icon={Building2}
                  placeholder="Nombre de la Compañía *"
                  value={form.companyname || ""}
                  error={errors.companyname}
                  touched={touched.companyname}
                  onChange={(val) => update("companyname", val)}
                  onBlur={() => handleBlur("companyname")}
                />
              </div>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                Persona de Contacto
                <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  fieldKey="contactname"
                  icon={User}
                  placeholder="Nombre del Contacto *"
                  value={form.contactname || ""}
                  error={errors.contactname}
                  touched={touched.contactname}
                  onChange={(val) => update("contactname", val)}
                  onBlur={() => handleBlur("contactname")}
                />
                <InputField
                  fieldKey="contacttitle"
                  icon={Briefcase}
                  placeholder="Cargo *"
                  value={form.contacttitle || ""}
                  error={errors.contacttitle}
                  touched={touched.contacttitle}
                  onChange={(val) => update("contacttitle", val)}
                  onBlur={() => handleBlur("contacttitle")}
                />
              </div>
            </div>

            {/* Dirección */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Dirección
                <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  fieldKey="address"
                  icon={MapPin}
                  placeholder="Dirección *"
                  value={form.address || ""}
                  error={errors.address}
                  touched={touched.address}
                  onChange={(val) => update("address", val)}
                  onBlur={() => handleBlur("address")}
                />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <SimpleInputField
                    fieldKey="city"
                    placeholder="Ciudad *"
                    value={form.city || ""}
                    error={errors.city}
                    touched={touched.city}
                    onChange={(val) => update("city", val)}
                    onBlur={() => handleBlur("city")}
                  />
                  <SimpleInputField
                    fieldKey="region"
                    placeholder="Región"
                    value={form.region || ""}
                    error={errors.region}
                    touched={touched.region}
                    onChange={(val) => update("region", val)}
                    onBlur={() => handleBlur("region")}
                  />
                  <SimpleInputField
                    fieldKey="postalcode"
                    placeholder="Código Postal"
                    value={form.postalcode || ""}
                    error={errors.postalcode}
                    touched={touched.postalcode}
                    onChange={(val) => update("postalcode", val)}
                    onBlur={() => handleBlur("postalcode")}
                  />
                </div>

                <InputField
                  fieldKey="country"
                  icon={Globe}
                  placeholder="País"
                  value={form.country || ""}
                  error={errors.country}
                  touched={touched.country}
                  onChange={(val) => update("country", val)}
                  onBlur={() => handleBlur("country")}
                />
              </div>
            </div>

            {/* Comunicación */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Comunicación
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  fieldKey="phone"
                  icon={Phone}
                  placeholder="Teléfono"
                  type="tel"
                  value={form.phone || ""}
                  error={errors.phone}
                  touched={touched.phone}
                  onChange={(val) => update("phone", val)}
                  onBlur={() => handleBlur("phone")}
                />
                <InputField
                  fieldKey="fax"
                  icon={Printer}
                  placeholder="Fax"
                  type="tel"
                  value={form.fax || ""}
                  error={errors.fax}
                  touched={touched.fax}
                  onChange={(val) => update("fax", val)}
                  onBlur={() => handleBlur("fax")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            Los campos marcados con <span className="text-red-500">*</span> son obligatorios
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-gray-700 font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Guardar Cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}