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
  const res = await fetch(`${BASE_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  if (!res.ok) {
    throw new Error("Error creating customer");
  }

  return res.json();
}
