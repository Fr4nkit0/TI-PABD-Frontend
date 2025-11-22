import type { Paginated, Order } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchOrders(
  page: number = 1,
  pageSize: number = 10,
  customerName?: string,
  employeeName?: string
): Promise<Paginated<Order>> {

  const params = new URLSearchParams({
    page: String(page),
    size: String(pageSize), 
    customer_name: customerName || "",
    employee_name: employeeName || "",
  });

  if (customerName) params.append("customer_name", customerName);
  if (employeeName) params.append("employee_name", employeeName);

  const res = await fetch(`${BASE_URL}/orders?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Error fetching orders");
  }

  return res.json() as Promise<Paginated<Order>>;
}
