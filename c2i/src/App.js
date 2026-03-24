import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./component/navbar";
import Home from "./pages/Home";
import ScrollToTop from "./component/ScrollToTop";
import Chatbot from "./component/Chatbot";

// ⚡ Bolt: Implemented route-level code splitting using React.lazy and Suspense.
// This reduces the initial bundle size by lazy-loading heavy page components (e.g., Admin, Training, WebDev)
// only when their routes are accessed, improving First Contentful Paint (FCP) and initial load performance.
const Iot = lazy(() => import("./pages/Iot"));
const WebDev = lazy(() => import("./pages/WebDev"));
const Automation = lazy(() => import("./pages/Automation"));
const Admin = lazy(() => import("./pages/Admin"));
const Training = lazy(() => import("./pages/Training"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
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
