import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/navbar";
import Home from "./pages/Home";
import Iot from "./pages/Iot";
import WebDev from "./pages/WebDev";
import Automation from "./pages/Automation";
import Admin from "./pages/Admin";
import ScrollToTop from "./component/ScrollToTop";
import Training from "./pages/Training";

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iot" element={<Iot />} />
        <Route path="/web-dev" element={<WebDev />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/c2i-2025-admin" element={<Admin />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </>
  );
}

export default App;
