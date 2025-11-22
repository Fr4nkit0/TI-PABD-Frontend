import { useEffect, useState } from "react";
import { fetchOrders } from "../services/OrderService";
import type { Order, Paginated } from "../types";
import OrderTable from "../components/order/OrderTable";
import Pagination from "../components/Pagination";
import OrderFilters from "../components/order/OrderFilters";

export default function OrdersPage() {
  const [data, setData] = useState<Paginated<Order> | null>(null);
  const [page, setPage] = useState(1);

  // filtros
  const [customer, setCustomer] = useState("");
  const [employee, setEmployee] = useState("");

  const loadData = () => {
    fetchOrders(page, 10, customer, employee).then((res) => setData(res));
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const handleSearch = (c: string, e: string) => {
    setCustomer(c);
    setEmployee(e);
    setPage(1);        
    fetchOrders(1, 10, c, e).then((res) => setData(res));
  };

  if (!data) return <p>Cargando...</p>;

  return (
    <div>
      <h2 className="
        text-3xl font-bold text-gray-800 mb-8 text-center 
        bg-white/60 backdrop-blur-sm shadow-sm 
        py-3 rounded-xl
      ">
        📦 Listado de Órdenes de Northwind
      </h2>


      <OrderFilters onSearch={handleSearch} />

      <OrderTable orders={data.content} />

      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}
