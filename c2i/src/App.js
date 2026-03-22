import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/navbar";
import ScrollToTop from "./component/ScrollToTop";
import Chatbot from "./component/Chatbot";

// ⚡ Bolt: Lazy load routes to reduce initial bundle size and speed up page load
const Home = React.lazy(() => import("./pages/Home"));
const Iot = React.lazy(() => import("./pages/Iot"));
const WebDev = React.lazy(() => import("./pages/WebDev"));
const Automation = React.lazy(() => import("./pages/Automation"));
const Admin = React.lazy(() => import("./pages/Admin"));
const Training = React.lazy(() => import("./pages/Training"));

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
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
