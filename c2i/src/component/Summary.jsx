import React, { useState } from "react";
import { ChartNoAxesCombined, Cpu, Cog, Globe, Plus, X, Pencil } from "lucide-react";
import Addproject from "./Addproject"; // Make sure this path is correct

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

const Summary = ({
  projects = [],
  filteredProjects = [],
  totalProjects = 0,
  iotProjects = 0,
  webProjects = 0,
  automationProjects = 0,
  searchTerm = "",
  setSearchTerm = () => { },
  selectedType = "",
  setSelectedType = () => { },
  selectedCategory = "",
  setSelectedCategory = () => { },
  handleAddProject = () => { },
  handleDeleteProject = () => { },
  handleEditProject = () => { },
}) => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const displayProjects =
    Array.isArray(filteredProjects) && filteredProjects.length
      ? filteredProjects
      : Array.isArray(projects)
        ? projects
        : [];

  const categories = Array.isArray(projects)
    ? [...new Set(projects.map((p) => p?.category).filter(Boolean))]
    : [];

  const toggleSelectProject = (projectId) => {
    setSelectedProjects((prevSelected) =>
      prevSelected.includes(projectId)
        ? prevSelected.filter((id) => id !== projectId)
        : [...prevSelected, projectId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProjects.length === displayProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(displayProjects.map((p) => p._id || p.id));
    }
  };

  const handleBulkDelete = () => {
    if (
      selectedProjects.length > 0 &&
      window.confirm(
        `Are you sure you want to delete ${selectedProjects.length} selected project(s)?`
      )
    ) {
      selectedProjects.forEach((projectId) => {
        handleDeleteProject(projectId);
      });
      setSelectedProjects([]);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-8 px-4 sm:px-8 mt-10">
      <div className="max-w-6xl mx-auto">
        {showAddProject && (
          <Addproject
            onClose={() => {
              setShowAddProject(false);
              setEditingProject(null);
            }}
            initialData={editingProject}
            onSubmit={(formData) => {
              if (editingProject) {
                return fetch(`${process.env.REACT_APP_API_URL}/projects/update/${editingProject._id}`, {
                  method: "PUT",
                  body: formData,
                });
              } else {
                return fetch(`${process.env.REACT_APP_API_URL}/Projects/create`, {
                  method: "POST",
                  body: formData,
                });
              }
            }}
          />
        )}
        <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>

        {/* Projects Summary Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <SummaryCard
              icon={<ChartNoAxesCombined />}
              label="Total Projects"
              count={totalProjects}
              bgColor="bg-gradient-to-br from-blue-500 via-green-500 to-orange-500"
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
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowAddProject(true)}
                className="font-semibold flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Add Project
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={selectedProjects.length === 0}
                className={`font-semibold flex items-center gap-2 bg-gradient-to-r ${selectedProjects.length === 0
                    ? "from-gray-400 to-gray-600 cursor-not-allowed"
                    : "from-red-600 to-red-800 hover:bg-red-700"
                  } text-white px-4 py-2 rounded-md transition-colors`}
              >
                <X size={16} />
                Delete Selected
              </button>
            </div>
          </div>

          {/* Projects Table */}
          {displayProjects.length === 0 ? (
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
                      <input
                        type="checkbox"
                        checked={
                          selectedProjects.length === displayProjects.length &&
                          displayProjects.length > 0
                        }
                        onChange={toggleSelectAll}
                      />
                    </th>
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
                  {displayProjects.map((project) => (
                    <tr
                      key={project._id || project.id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProjects.includes(
                            project._id || project.id
                          )}
                          onChange={() =>
                            toggleSelectProject(project._id || project.id)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {project.media?.length > 0 ? (
                          project.media[0].type === "image" ? (
                            <img
                              src={`${process.env.REACT_APP_API_URL}${project.media[0].url}`}
                              alt={project.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="relative">
                              <video className="w-16 h-16 object-cover rounded">
                                <source
                                  src={`${process.env.REACT_APP_API_URL}${project.media[0].url}`}
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
                          className={`px-2 py-1 rounded-full text-xs ${project.type === "web"
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
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingProject(project);
                              setShowAddProject(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          >
                            <Pencil size={16} /> Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project._id || project.id);
                            }}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <X size={16} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Summary;
