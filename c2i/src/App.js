import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/navbar";
import ScrollToTop from "./component/ScrollToTop";
import Chatbot from "./component/Chatbot";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Iot = lazy(() => import("./pages/Iot"));
const WebDev = lazy(() => import("./pages/WebDev"));
const Automation = lazy(() => import("./pages/Automation"));
const Admin = lazy(() => import("./pages/Admin"));
const Training = lazy(() => import("./pages/Training"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
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
