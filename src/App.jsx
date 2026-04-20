import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Empolyeetable from "./pages/Empolyeetable";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

function App() {
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
      <Topbar />
      <Navbar />

      <div style={{ marginTop: "25px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empolyeetable" element={<Empolyeetable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
