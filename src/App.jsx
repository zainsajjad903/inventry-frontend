import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Empolyeetable from "./pages/Empolyeetable";
import Home from "./pages/Home";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Desigination from "./pages/Desigination";
import Department from "./pages/Department";
import User from "./pages/User";
import Shift from "./pages/Shift";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Topbar onToggleSidebar={handleToggleSidebar} />

      <div
        className={`app-shell ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <Sidebar isOpen={sidebarOpen} />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/empolyeetable" element={<Empolyeetable />} />
            <Route path="/department" element={<Department />} />
            <Route path="/user" element={<User />} />
            <Route path="/shift" element={<Shift />} />
            <Route path="/desigination" element={<Desigination />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
