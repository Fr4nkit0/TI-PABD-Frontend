import type { Customer } from "../types"; 

export function validateField(
  key: keyof Customer,
  value: string,
  form: Partial<Customer>
): string | null {
  const isEmpty = (v?: string) => !v || v.trim() === "";

  // Campos requeridos
  const required = [
    "customerid",
    "companyname",
    "contactname",
    "contacttitle",
    "address",
    "city",
  ];
  if (required.includes(key) && isEmpty(value)) {
    return "Este campo es obligatorio";
  }

  // Validación específica por campo
  if (key === "customerid" && value) {
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return "Debe ser alfanumérico (sin espacios ni símbolos)";
    }
    if (value.length > 5) {
      return "Máximo 5 caracteres";
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

/*

export function validateForm(form: Partial<Customer>): string | null {
  const required = [
    "customerid",
    "companyname",
    "contactname",
    "contacttitle",
    "address",
    "city",
  ];

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
*/