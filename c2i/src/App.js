import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./component/navbar";
import ScrollToTop from "./component/ScrollToTop";
import Loading from "./component/Loading";

// Lazy load page components for better performance
const Home = lazy(() => import("./pages/Home"));
const Iot = lazy(() => import("./pages/Iot"));
const WebDev = lazy(() => import("./pages/WebDev"));
const Automation = lazy(() => import("./pages/Automation"));
const Admin = lazy(() => import("./pages/Admin"));
const Training = lazy(() => import("./pages/Training"));
const Chatbot = lazy(() => import("./component/Chatbot"));

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iot" element={<Iot />} />
          <Route path="/web-dev" element={<WebDev />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/c2i-2025-admin" element={<Admin />} />
          <Route path="/training" element={<Training />} />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </>
  );
}

export default App;
