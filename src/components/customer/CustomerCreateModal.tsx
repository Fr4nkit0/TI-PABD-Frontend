import { useState } from "react";
import { X, Building2, User, Briefcase, MapPin, Phone, Printer, Globe, AlertCircle } from "lucide-react";
import type { Customer } from "../../types/customer";


function validateField(key: keyof Customer, value: string, form: Partial<Customer>): string | null {
  const isEmpty = (v?: string) => !v || v.trim() === "";
  
  // Campos requeridos
  const required = ["customerid", "companyname", "contactname", "contacttitle", "address", "city"];
  if (required.includes(key) && isEmpty(value)) {
    return "Este campo es obligatorio";
  }

  // Validación específica por campo
  if (key === "customerid" && value) {
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return "Debe ser alfanumérico (sin espacios ni símbolos)";
    }
    if (value.length > 10) {
      return "Máximo 10 caracteres";
    }
  }

  if (key === "phone" && value && !/^[0-9+\-() ]+$/.test(value)) {
    return "Caracteres inválidos en teléfono";
  }

  if (key === "fax" && value && !/^[0-9+\-() ]+$/.test(value)) {
    return "Caracteres inválidos en fax";
  }

  // Longitudes máximas
  const maxLengths: Record<keyof Customer, number> = {
    customerid: 5,
    companyname: 40,
    contactname: 30,
    contacttitle: 30,
    address: 60,
    city: 15,
    region: 15,
    postalcode: 10,
    country: 15,
    phone: 24,
    fax: 24,
  };

  if (value && value.length > maxLengths[key]) {
    return `Máximo ${maxLengths[key]} caracteres`;
  }

  return null;
}

function validateForm(form: Partial<Customer>): string | null {
  const required = ["customerid", "companyname", "contactname", "contacttitle", "address", "city"];
  
  for (const key of required) {
    const k = key as keyof Customer;
    if (!form[k] || form[k]!.trim() === "") {
      return `Faltan campos obligatorios`;
    }
  }

  // Validar todos los campos
  for (const key in form) {
    const k = key as keyof Customer;
    const error = validateField(k, form[k] || "", form);
    if (error) return error;
  }

  return null;
}

function InputField({ 
  fieldKey, 
  icon: Icon, 
  placeholder, 
  type = "text",
  value,
  error,
  touched,
  onChange,
  onBlur
}: { 
  fieldKey: keyof Customer; 
  icon: any; 
  placeholder: string; 
  type?: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        className={`w-full px-4 py-2.5 pl-10 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
          error && touched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      <Icon className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
        error && touched ? "text-red-500" : "text-gray-400"
      }`} />
      {error && touched && (
        <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

function SimpleInputField({ 
  fieldKey, 
  placeholder, 
  type = "text",
  value,
  error,
  touched,
  onChange,
  onBlur
}: { 
  fieldKey: keyof Customer; 
  placeholder: string; 
  type?: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <input
        type={type}
        value={value}
        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none ${
          error && touched
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
    // Marcar todos como tocados
    const allTouched = Object.keys({
      customerid: true,
      companyname: true,
      contactname: true,
      contacttitle: true,
      address: true,
      city: true,
      region: true,
      postalcode: true,
      country: true,
      phone: true,
      fax: true,
    }).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    // Validar todo el formulario
    const formError = validateForm(form);
    
    if (formError) {
      // Actualizar errores para todos los campos
      const newErrors: Partial<Record<keyof Customer, string>> = {};
      for (const key in form) {
        const k = key as keyof Customer;
        const error = validateField(k, form[k] || "", form);
        if (error) newErrors[k] = error;
      }
      setErrors(newErrors);
      return;
    }

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