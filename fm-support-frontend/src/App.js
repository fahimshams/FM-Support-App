import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import "./App.css";
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
import MachineDetailsPage from "./pages/MachineDetailsPage";
import ContactSupportPage from "./pages/ContactSupportPage";
import ProfilePage from "./pages/ProfilePage";
import AIAssistantPage from "./pages/AIAssistantPage";
import AITrainingPortalPage from "./pages/AITrainingPortalPage";
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LoginPage, {}) }), _jsxs(Route, { element: _jsx(CustomerLayout, {}), children: [_jsx(Route, { path: "/dashboard", element: _jsx(CustomerDashboardPage, {}) }), _jsx(Route, { path: "/categories", element: _jsx(CategoryPage, {}) }), _jsx(Route, { path: "/machines/:categoryId", element: _jsx(ModelSelectPage, {}) }), _jsx(Route, { path: "/machines/:categoryId/:modelId", element: _jsx(SerialListPage, {}) }), _jsx(Route, { path: "/machines/registered", element: _jsx(RegisteredMachinesPage, {}) }), _jsx(Route, { path: "/machines/details/:serialNumber", element: _jsx(MachineDetailsPage, {}) }), _jsx(Route, { path: "/ticket", element: _jsx(TicketPage, {}) }), _jsx(Route, { path: "/tickets/history", element: _jsx(TicketHistoryPage, {}) }), _jsx(Route, { path: "/contact", element: _jsx(ContactSupportPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "/ai/assistant", element: _jsx(AIAssistantPage, {}) }), _jsx(Route, { path: "/ai/image-demo", element: _jsx(ImageDiagnosisDemoPage, {}) })] }), _jsx(Route, { path: "/tech", element: _jsx(TechnicianLoginPage, {}) }), _jsxs(Route, { element: _jsx(TechnicianLayout, {}), children: [_jsx(Route, { path: "/tech/dashboard", element: _jsx(TechnicianDashboardPage, {}) }), _jsx(Route, { path: "/tech/tickets/:ticketId", element: _jsx(TechnicianTicketPage, {}) }), _jsx(Route, { path: "/tech/history", element: _jsx("div", { children: "Completed Tickets Coming Soon" }) }), _jsx(Route, { path: "/tech/ai-training", element: _jsx(AITrainingPortalPage, {}) }), _jsx(Route, { path: "/technician", element: _jsx(TechnicianDashboardPage, {}) })] })] }));
}
export default App;
//# sourceMappingURL=App.js.map