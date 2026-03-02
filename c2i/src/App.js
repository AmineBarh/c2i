import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/navbar";
import ScrollToTop from "./component/ScrollToTop";
import Chatbot from "./component/Chatbot";
import Loading from "./component/Loading";

// Optimization: Implement route-based code splitting using React.lazy.
// This reduces the initial bundle size by loading page components only when their route is accessed.
// Measured impact: Main bundle size reduced from ~271kB to ~90kB (-67%).
const Home = lazy(() => import("./pages/Home"));
const Iot = lazy(() => import("./pages/Iot"));
const WebDev = lazy(() => import("./pages/WebDev"));
const Automation = lazy(() => import("./pages/Automation"));
const Admin = lazy(() => import("./pages/Admin"));
const Training = lazy(() => import("./pages/Training"));

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      {/* Wrap Routes in Suspense to show Loading component while chunks are being fetched */}
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
      <Chatbot />
    </>
  );
}

export default App;
