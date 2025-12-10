import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/CategoryPage";
import ModelSelectPage from "./pages/ModelSelectPage";
import SerialListPage from "./pages/SerialListPage";
import TicketPage from "./pages/TicketPage";
import TicketHistoryPage from "./pages/TicketHistoryPage";
import ImageDiagnosisDemoPage from "./pages/ImageDiagnosisDemoPage";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import CustomerLayout from "./pages/CustomerLayout";

import TechnicianLoginPage from "./pages/TechnicianLoginPage";
import TechnicianDashboardPage from "./pages/TechnicianDashboardPage";
import TechnicianTicketPage from "./pages/TechnicianTicketPage";
import TechnicianLayout from "./pages/TechnicianLayout";
import RegisteredMachinesPage from "./pages/RegisteredMachinesPage";

function App() {
  return (
    <Routes>
      {/* Login stands alone */}
      <Route path="/" element={<LoginPage />} />

      {/* All customer pages share the same layout + navbar */}
      <Route element={<CustomerLayout />}>
        <Route path="/dashboard" element={<CustomerDashboardPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/machines/:categoryId" element={<ModelSelectPage />} />
        <Route
          path="/machines/:categoryId/:modelId"
          element={<SerialListPage />}
        />
        <Route path="/machines/registered" element={<RegisteredMachinesPage />} />

        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/tickets/history" element={<TicketHistoryPage />} />
        <Route path="/ai/image-demo" element={<ImageDiagnosisDemoPage />} />
      </Route>

      {/* Technician side */}
      <Route path="/tech" element={<TechnicianLoginPage />} />

      <Route element={<TechnicianLayout />}>
        <Route path="/tech/dashboard" element={<TechnicianDashboardPage />} />
        <Route path="/tech/tickets/:ticketId" element={<TechnicianTicketPage />} />
        <Route path="/tech/history" element={<div>Completed Tickets Coming Soon</div>} />
        <Route path="/technician" element={<TechnicianDashboardPage />} />
      </Route>

    </Routes>
  );
}

export default App;
