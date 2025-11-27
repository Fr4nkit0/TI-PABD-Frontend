import { useState, useEffect } from "react";
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from "../services/CustomerService";
import type { Customer, Paginated } from "../types";
import CustomerTable from "../components/customer/CustomerTable";
import Pagination from "../components/Pagination";
import CustomerFilters from "../components/customer/CustomerFilters";
import CustomerCreateModal from "../components/customer/CustomerCreateModal";
import Swal from "sweetalert2";
export default function CustomersPage() {
  const [data, setData] = useState<Paginated<Customer> | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

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

  const handleCreate = async (customer: Customer) => {
    try {
      setCreateError(null);
      await createCustomer(customer);

      setOpenModal(false);
      loadData();
    } catch (error: any) {
      setCreateError(error.message || "Error al crear el cliente");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCreateError(null);
  };

  const handleUpdateCustomer = async (updatedCustomer: Customer) => {
    try {
      await updateCustomer(updatedCustomer);
      loadData();
    } catch (err: any) {
      alert(err.message || "Error al actualizar el cliente.");
    }
  };
  const handleDeleteCustomer = async (customerid: string) => {
    const result = await Swal.fire({
      title: "¿Eliminar cliente?",
      text: `Se eliminará el cliente con ID: ${customerid}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCustomer(customerid);
      Swal.fire("Eliminado", "El cliente fue eliminado correctamente.", "success");
      loadData();
    } catch (err: any) {
      Swal.fire("Error", err.message || "No se pudo eliminar el cliente.", "error");
    }
  };


  if (!data) return <p>Cargando...</p>;

  return (
    <div className="px-3 md:px-6 lg:px-10">

      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center 
        bg-white/60 backdrop-blur-sm shadow-sm 
        py-3 rounded-xl">
        👥 Clientes
      </h2>

      <div className="mb-4">
        <CustomerFilters
          onSearch={handleSearch}
          onCreate={() => setOpenModal(true)}
        />
      </div>

      <div className="mt-4">
        <CustomerTable
          customers={data.content}
          onUpdateCustomer={handleUpdateCustomer}
          onDeleteCustomer={handleDeleteCustomer}
        />
      </div>

      <div className="mt-6">
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPrev={() => setPage((p) => p - 1)}
          onNext={() => setPage((p) => p + 1)}
        />
      </div>

      <CustomerCreateModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleCreate}
        error={createError}
      />
    </div>
  );
}
