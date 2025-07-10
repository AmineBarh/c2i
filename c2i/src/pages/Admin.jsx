import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Handshake,
  Folder,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";

import Dashboard from "../component/Dashboard";
import Trust from "../component/Trust";
import Summary from "../component/Summary";
import TrainingDashboard from "../component/TrainingDashboard";

import { fetchProjects, fetchtrainings } from "../services/api";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const [projects, setProjects] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [partners, setPartners] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    const loadTrainings = async () => {
      try {
        const data = await fetchtrainings();
        setTrainings(data);
      } catch (err) {
        console.error("Error fetching trainings:", err);
      }
    };

    const loadPartners = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/partners");
        const data = await response.json();
        setPartners(data);
      } catch (err) {
        console.error("Error fetching partners:", err);
      }
    };

    loadProjects();
    loadTrainings();
    loadPartners();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType === "" || project.type === selectedType) &&
      (selectedCategory === "" || project.category === selectedCategory)
  );

  const totalProjects = projects.length;
  const iotProjects = projects.filter((p) => p.type === "iot").length;
  const webProjects = projects.filter((p) => p.type === "web").length;
  const automationProjects = projects.filter(
    (p) => p.type === "automation"
  ).length;

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <Dashboard
            projects={projects}
            trainings={trainings} // ✅ NOW PASSED CORRECTLY
          />
        );
      case "partners":
        return (
          <Trust
            partners={partners}
            handleDeletePartner={(id) =>
              setPartners(partners.filter((p) => p._id !== id))
            }
          />
        );
      case "projects":
        return (
          <Summary
            projects={filteredProjects}
            totalProjects={totalProjects}
            iotProjects={iotProjects}
            webProjects={webProjects}
            automationProjects={automationProjects}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case "training":
        return <TrainingDashboard />;
      default:
        return <Dashboard projects={projects} trainings={trainings} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="p-4 space-y-1">
          <SidebarButton
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            isActive={activeSection === "dashboard"}
            onClick={() => setActiveSection("dashboard")}
            sidebarOpen={sidebarOpen}
            color="blue"
          />
          <SidebarButton
            icon={<Folder className="w-5 h-5" />}
            label="Projects"
            isActive={activeSection === "projects"}
            onClick={() => setActiveSection("projects")}
            sidebarOpen={sidebarOpen}
            color="green"
          />
          <SidebarButton
            icon={<Handshake className="w-5 h-5" />}
            label="Partners"
            isActive={activeSection === "partners"}
            onClick={() => setActiveSection("partners")}
            sidebarOpen={sidebarOpen}
            color="orange"
          />
          <SidebarButton
            icon={<BookOpen className="w-5 h-5" />}
            label="Training"
            isActive={activeSection === "training"}
            onClick={() => setActiveSection("training")}
            sidebarOpen={sidebarOpen}
            color="purple"
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto py-6">
        <div className="p-6">{renderSection()}</div>

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2">
            <X size={20} />
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-4 text-white hover:text-gray-200"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SidebarButton = ({
  icon,
  label,
  isActive,
  onClick,
  sidebarOpen,
  color,
}) => {
  const colorClass = isActive
    ? `bg-${color}-100 text-${color}-500`
    : "text-gray-600 hover:bg-gray-100";

  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 rounded-lg transition-colors ${colorClass}`}
    >
      {icon}
      {sidebarOpen && <span className="ml-3">{label}</span>}
    </button>
  );
};

export default Admin;
