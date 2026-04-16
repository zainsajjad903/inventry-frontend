import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Empolyeetable from "./pages/Empolyeetable";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empolyeetable" element={<Empolyeetable />} />
      </Routes>
    </Router>
  );
}

export default App;
