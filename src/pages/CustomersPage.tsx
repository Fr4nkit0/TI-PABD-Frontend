import { useState, useEffect } from "react";
import { fetchCustomers, createCustomer } from "../services/CustomerService";
import type { Customer, Paginated } from "../types";
import CustomerTable from "../components/customer/CustomerTable";
import Pagination from "../components/Pagination";
import CustomerFilters from "../components/customer/CustomerFilters";
import CustomerCreateModal from "../components/customer/CustomerCreateModal";

export default function CustomersPage() {
  const [data, setData] = useState<Paginated<Customer> | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const loadData = () => {
    fetchCustomers(page, 10, search).then(setData);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const handleSearch = (text: string) => {
    setSearch(text);
    setPage(1);
    fetchCustomers(1, 10, text).then(setData);
  };

  const handleCreate = (customer: Customer) => {
    createCustomer(customer).then(() => {
      setOpenModal(false);
      loadData();
    });
  };

  if (!data) return <p>Cargando...</p>;

  return (
    <div>
      <h2 className="       text-3xl font-bold text-gray-800 mb-8 text-center 
        bg-white/60 backdrop-blur-sm shadow-sm 
        py-3 rounded-xl">👥 Clientes</h2>

      <CustomerFilters
        onSearch={handleSearch}
        onCreate={() => setOpenModal(true)}
      />

      <CustomerTable customers={data.content} />

      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />

      <CustomerCreateModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleCreate}
      />
    </div>
  );
}
