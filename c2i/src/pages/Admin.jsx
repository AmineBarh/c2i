import React, { useState, useEffect } from "react";
import Addproject from "../component/Addproject";
import {
  ChartNoAxesCombined,
  Cog,
  Cpu,
  Globe,
  MessageSquareDot,
  Plus,
  X,
} from "lucide-react";
import { fetchProjects, deleteProject } from "../services/api";

const Admin = () => {
  // Add these states to your Admin component:
  const [partners, setPartners] = useState([]);
  const [partnerType, setPartnerType] = useState("trusted");
  const [partnerFile, setPartnerFile] = useState(null);

  // Add this useEffect for fetching partners:
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/partners");
        const data = await response.json();
        setPartners(data);
      } catch (err) {
        console.error("Error fetching partners:", err);
      }
    };
    fetchPartners();
  }, []);

  // Add these functions:
  const handleAddPartner = async (e) => {
    e.preventDefault();
    if (!partnerFile) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("type", partnerType);
    formData.append("image", partnerFile);

    try {
      const response = await fetch("http://localhost:7000/api/partners", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add partner");

      const newPartner = await response.json();
      setPartners([...partners, newPartner]);
      setPartnerFile(null);
      // Reset file input
      e.target.reset();
    } catch (err) {
      console.error("Add partner error:", err);
      setError(err.message);
    }
  };

  const handleDeletePartner = async (partnerId) => {
    if (!window.confirm("Are you sure you want to delete this partner?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:7000/api/partners/${partnerId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete partner");

      setPartners(partners.filter((p) => p._id !== partnerId));
    } catch (err) {
      console.error("Delete partner error:", err);
      setError(err.message);
    }
  };

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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
    loadProjects();
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

  const handleAddProject = async (formData) => {
    try {
      setError(null);
      const response = await fetch("http://localhost:7000/Projects/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create project");
      }

      const newProject = await response.json();
      setProjects((prev) => [...prev, newProject]);
      setShowAddProject(false);
    } catch (err) {
      setError(err.message);
      console.error("Add project error:", err);
      throw err;
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await deleteProject(projectId);

      if (response.success) {
        setProjects(projects.filter((p) => p._id !== projectId));
      } else {
        setError(response.message || "Failed to delete project");
      }
    } catch (err) {
      setError(err.message || "Failed to delete project");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-8 px-4 sm:px-8 mt-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Partners</h2>

          <div className="mb-6 bg-white rounded-md border border-gray-200 p-4">
            <h3 className="text-lg font-medium mb-4">Add New Partner</h3>
            <form
              onSubmit={handleAddPartner}
              className="flex flex-wrap items-center gap-4"
            >
              <select
                value={partnerType}
                onChange={(e) => setPartnerType(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="trusted">Trusted By</option>
                <option value="partner">Our Partner</option>
              </select>

              <input
                type="file"
                onChange={(e) => setPartnerFile(e.target.files[0])}
                className="border border-gray-300 rounded-md p-2"
                required
              />

              <button
                type="submit"
                className="bg-bluec2i-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Partner
              </button>
            </form>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {partners.map((partner) => (
                  <tr key={partner._id}>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {partner.type === "trusted"
                        ? "Trusted By"
                        : "Our Partner"}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={`http://localhost:7000/uploads/${partner.img}`}
                        alt="Partner logo"
                        className="h-16 object-contain"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeletePartner(partner._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Messages Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-4">Messages</h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center justify-start bg-white border border-gray-200 p-4 rounded-lg w-full sm:w-1/3 mx-auto">
              <div className="icon p-3 bg-red-200 rounded-lg">
                <MessageSquareDot color="#FF5757" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600">Total Messages</span>
                <span className="font-bold text-xl">1</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-gray-200 rounded-xl p-4 w-full">
              <div className="w-full sm:w-3/4 mb-4 sm:mb-0 px-4 border border-gray-100 rounded-lg">
                <p className="text-gray-500">
                  From: Foulen ben foulen | Email: gfdlmdfm@gmail.com | Phone:
                  +216 94 320 000
                </p>
                <p className="text-red-500 mt-2">Message:</p>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <button className="font-semibold bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full sm:w-auto">
                Delete Message
              </button>
            </div>
          </div>
        </section>

        {/* Projects Summary Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <SummaryCard
              icon={<ChartNoAxesCombined />}
              label="Total Projects"
              count={totalProjects}
              bgColor="bg-gradient-to-br from-bluec2i-500 via-greenc2i-500 to-orangec2i-500"
            />
            <SummaryCard
              icon={<Cpu />}
              label="IoT Projects"
              count={iotProjects}
              bgColor="bg-green-500"
            />
            <SummaryCard
              icon={<Cog />}
              label="Automation Projects"
              count={automationProjects}
              bgColor="bg-orange-500"
            />
            <SummaryCard
              icon={<Globe />}
              label="Web Projects"
              count={webProjects}
              bgColor="bg-blue-500"
            />
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap justify-between items-center bg-white rounded-md border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center w-full md:w-3/4 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search project name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none border border-gray-300 rounded-md p-2 w-full md:w-1/3"
              />
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setSelectedCategory("");
                }}
                className="border border-gray-300 rounded-md p-2 w-full md:w-1/4"
              >
                <option value="">All Types</option>
                <option value="iot">IoT</option>
                <option value="web">Web Development</option>
                <option value="automation">Automation</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full md:w-1/4"
              >
                <option value="">All Categories</option>
                {Array.from(new Set(projects.map((p) => p.category))).map(
                  (cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  )
                )}
              </select>
            </div>
            <button
              onClick={() => setShowAddProject(true)}
              className="font-semibold flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
            >
              <Plus size={16} /> Add Project
            </button>
          </div>

          {/* Table */}
          {filteredProjects.length === 0 ? (
            <div className="mt-8 text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">
                No projects found matching your criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("");
                  setSelectedCategory("");
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Media
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project._id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {project.media?.length > 0 ? (
                          project.media[0].type === "image" ? (
                            <img
                              src={`http://localhost:7000${project.media[0].url}`}
                              alt={project.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="relative">
                              <video className="w-16 h-16 object-cover rounded">
                                <source
                                  src={`http://localhost:7000${project.media[0].url}`}
                                />
                              </video>
                              <div className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 rounded">
                                Video
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-500 text-xs">
                              No Media
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="font-medium text-gray-900 truncate">
                          {project.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-gray-500 text-wrap">
                          {project.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 capitalize">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            project.type === "web"
                              ? "bg-blue-100 text-blue-800"
                              : project.type === "iot"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {project.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 capitalize">
                        {project.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project._id);
                          }}
                          className="text-red-600 hover:text-red-900 flex items-center gap-1"
                        >
                          <X size={16} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Modal */}
        {showAddProject && (
          <Addproject
            onClose={() => setShowAddProject(false)}
            onSubmit={handleAddProject}
          />
        )}

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

const SummaryCard = ({ icon, label, count, bgColor }) => (
  <div className="flex items-center bg-white border border-gray-200 rounded-xl p-4 w-full max-w-xs">
    <div className={`${bgColor} p-3 rounded-md`}>
      {React.cloneElement(icon, { color: "#ffffff", size: 24 })}
    </div>
    <div className="ml-3">
      <p className="text-gray-600 font-medium">{label}</p>
      <p className="font-bold text-2xl">{count}</p>
    </div>
  </div>
);

export default Admin;
