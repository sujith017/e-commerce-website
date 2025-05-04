import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSidebar from "./Components/SideBar";
import CrackersPage from "./Pages/Crackers";
import OrdersPage from "./Pages/Orders";
import ReportPage from "./Pages/Report";
import Addproduct from "./Pages/addproduct";

function App() {
  return (
    <Router>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/admin/crackers" element={<CrackersPage />} />
            <Route path="/admin/orders" element={<OrdersPage />} />
            <Route path="/admin/report" element={<ReportPage />} />
            <Route path="/admin/addproduct" element={<Addproduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
