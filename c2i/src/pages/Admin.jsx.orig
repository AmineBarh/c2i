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

import {
  fetchProjects,
  fetchtrainings,
  createtraining,
  updatetraining,
  deletetraining,
} from "../services/api";

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

  const [sidebarOpen, setSidebarOpen] = useState(true); // In Admin.jsx, add this state near your other state declarations

  const [partnerType, setPartnerType] = useState("trusted"); // default to "trusted"
  const [partnerFile, setPartnerFile] = useState(null);

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
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/partners`
        );
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
            partners={partners}
            loading={loading}
          />
        );
      // Replace your current Trust component rendering with this:
      case "partners":
        return (
          <Trust
            partners={partners}
            partnerType={partnerType}
            setPartnerType={setPartnerType}
            partnerFile={partnerFile}
            setPartnerFile={setPartnerFile}
            handleAddPartner={handleAddPartner}
            handleDeletePartner={async (id) => {
              if (
                window.confirm("Are you sure you want to delete this partner?")
              ) {
                try {
                  const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/partners/${id}`,
                    {
                      method: "DELETE",
                    }
                  );
                  if (!response.ok) {
                    throw new Error("Failed to delete partner");
                  }
                  setPartners(partners.filter((p) => p._id !== id));
                } catch (error) {
                  console.error("Error deleting partner:", error);
                  alert("Failed to delete partner");
                }
              }
            }}
          />
        );
      case "projects":
        const handleDeleteProject = async (id) => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/projects/delete/${id}`,
              {
                method: "DELETE",
              }
            );
            if (!response.ok) {
              throw new Error("Failed to delete project");
            }
            setProjects(projects.filter((p) => p._id !== id));
          } catch (error) {
            console.error("Error deleting project:", error);
          }
        };

        const handleAddProject = async (formData) => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/Projects/create`, {
              method: "POST",
              body: formData,
            });
            if (!response.ok) throw new Error("Failed to create project");
            const newProject = await response.json();
            setProjects([...projects, newProject]);
            return newProject;
          } catch (error) {
            console.error("Error creating project:", error);
            throw error;
          }
        };

        const handleUpdateProject = async (id, formData) => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/update/${id}`, {
              method: "PUT",
              body: formData,
            });
            if (!response.ok) throw new Error("Failed to update project");
            const updatedProject = await response.json();

            // Check if the backend returns the updated project or just a success message/status
            // Assuming it returns the updated object. If not, we might need to refetch or assume formData has the new values.
            // A safe bet if response is the object:
            setProjects(projects.map(p => p._id === id ? updatedProject : p));
            return updatedProject;
          } catch (error) {
            console.error("Error updating project:", error);
            throw error;
          }
        };

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
            handleDeleteProject={handleDeleteProject}
            handleAddProject={handleAddProject}
            handleUpdateProject={handleUpdateProject}
          />
        );
      case "training":
        return (
          <TrainingDashboard
            trainings={trainings}
            handleCreateTraining={handleCreateTraining}
            handleUpdateTraining={handleUpdateTraining}
            handleDeleteTraining={handleDeleteTraining}
          />
        );
      default:
        return <Dashboard projects={projects} trainings={trainings} />;
    }
  };

  // Training Handlers
  const handleCreateTraining = async (data) => {
    try {
      const newTraining = await createtraining(data);
      setTrainings([...trainings, newTraining]);
      return newTraining;
    } catch (err) {
      console.error("Error creating training:", err);
      throw err;
    }
  };

  const handleUpdateTraining = async (id, data) => {
    try {
      const updated = await updatetraining(id, data);
      setTrainings(trainings.map((t) => (t._id === id ? updated : t)));
      return updated;
    } catch (err) {
      console.error("Error updating training:", err);
      throw err;
    }
  };

  const handleDeleteTraining = async (id) => {
    try {
      await deletetraining(id);
      setTrainings(trainings.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  // Add this function to your Admin component
  const handleAddPartner = async (e) => {
    e.preventDefault();

    if (!partnerFile) {
      setError("Please select an image file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("type", partnerType);
      formData.append("image", partnerFile);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/partners`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add partner");
      }

      const newPartner = await response.json();
      setPartners([...partners, newPartner]);
      setPartnerFile(null); // Reset file input
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"
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
          <SidebarButton
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Analytics"
            isActive={activeSection === "analytics"}
            onClick={() => setActiveSection("analytics")}
            sidebarOpen={sidebarOpen}
            color="teal"
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
