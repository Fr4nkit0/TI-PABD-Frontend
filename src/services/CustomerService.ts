import type { Paginated, Customer } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchCustomers(
  page: number = 1,
  pageSize: number = 10,
  search?: string
): Promise<Paginated<Customer>> {
  const params = new URLSearchParams({
    page: String(page),
    size: String(pageSize),
    contact_name: search ?? ""
  });

  const res = await fetch(`${BASE_URL}/customers?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Error fetching customers");
  }

  return res.json();
}

export async function createCustomer(customer: Customer): Promise<Customer> {
  const res = await fetch(`${BASE_URL}/customers/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  if (!res.ok) {
    let errorMessage = "Error al crear el cliente";

    try {
      const errorData = await res.json();

      // Extraer el mensaje principal del error
      let rawMessage = errorData.message || errorData.error || errorData.detail || "";

      // Limpiar mensajes técnicos de PostgreSQL
      if (rawMessage.includes("CONTEXT:")) {
        // Tomar solo la parte antes de "CONTEXT:"
        rawMessage = rawMessage.split("CONTEXT:")[0].trim();
      }

      // Detectar ID duplicado
      if (rawMessage.includes("ya existe") || rawMessage.includes("already exists")) {
        // Extraer el ID del mensaje si está presente
        const idMatch = rawMessage.match(/ID\s+(\w+)/i);
        const customerId = idMatch ? idMatch[1] : customer.customerid;
        errorMessage = `El ID "${customerId}" ya existe. Por favor elige otro ID.`;
      }
      // Otros errores de validación
      else if (res.status === 400 && rawMessage) {
        errorMessage = rawMessage;
      }
      // Conflictos generales
      else if (res.status === 409) {
        errorMessage = "El ID de cliente ya existe en la base de datos.";
      }
      // Mensaje genérico si hay contenido
      else if (rawMessage) {
        errorMessage = rawMessage;
      }

    } catch (e) {
      // Si no se puede parsear el JSON, usar mensajes según código HTTP
      if (res.status === 409 || res.status === 400) {
        errorMessage = "El ID de cliente ya existe en la base de datos.";
      }
    }

    throw new Error(errorMessage);
  }

  return res.json();
}

export async function updateCustomer(customer: Customer): Promise<Customer> {
  const res = await fetch(`${BASE_URL}/customers/${customer.customerid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  if (!res.ok) {
    let errorMessage = "Error updating customer";

    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorData.detail || errorMessage;
    } catch (e) {
      // Mantener mensaje genérico si no se puede parsear
    }

    throw new Error(errorMessage);
  }

  return res.json();
}