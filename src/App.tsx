import { Routes, Route, Link } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md border-b p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <h1 className="text-xl font-bold text-blue-700 tracking-wide">
            🧾 Northwind 
          </h1>

          <div className="flex gap-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Inicio</Link>
            <Link to="/orders" className="hover:text-blue-600 transition">Órdenes</Link>
            <Link to="/customers" className="hover:text-blue-600 transition">Clientes</Link>

          </div>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="w-full min-h-screen p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Routes>
      </div>

    </div>
  );
}

function Home() {
  return (
    <div className="mt-10 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Proyecto Final – Northwind</h2>
      <p className="mt-4 text-gray-600 text-lg">
        Programación Avanzada de Base de Datos · Universidad Nacional de Salta 
      </p>

      <p className="mt-6 text-gray-700 max-w-2xl mx-auto">
        Esta aplicación permite consultar órdenes del clásico dataset Northwind,  
        demostrando uso de API REST con Django + React + Tailwind, buenas prácticas  
        de paginación, filtros y componentes reutilizables.
      </p>

      <Link
        to="/orders"
        className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Ver Órdenes
      </Link>
    </div>
  );
}
