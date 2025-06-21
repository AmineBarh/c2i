// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import Addproject from '../component/Addproject';
import {
  ChartNoAxesCombined,
  Cog,
  Cpu,
  Globe,
  MessageSquareDot,
  Plus,
  X
} from 'lucide-react';
import { fetchProjects, createProject, deleteProject } from '../services/api';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType === '' || project.type === selectedType) &&
      (selectedCategory === '' || project.category === selectedCategory)
  );

  const totalProjects = projects.length;
  const iotProjects = projects.filter(p => p.type === 'iot').length;
  const webProjects = projects.filter(p => p.type === 'web').length;
  const automationProjects = projects.filter(p => p.type === 'automation').length;

  const handleAddProject = async (projectData, imageFile) => {
    try {
      const newProject = await createProject(projectData, imageFile);
      setProjects(prev => [...prev, newProject]);
    } catch (err) {
      setError('Failed to add project');
      console.error(err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter(p => p._id !== projectId));
    } catch (err) {
      setError('Failed to delete project');
      console.error(err);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>

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
                  From: Foulen ben foulen | Email: gfdlmdfm@gmail.com | Phone: +216 94 320 000
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
            <SummaryCard icon={<ChartNoAxesCombined />} label="Total Projects" count={totalProjects} bgColor="bg-gray-100" />
            <SummaryCard icon={<Cpu />} label="IoT Projects" count={iotProjects} bgColor="bg-green-100" />
            <SummaryCard icon={<Cog />} label="Automation Projects" count={automationProjects} bgColor="bg-yellow-100" />
            <SummaryCard icon={<Globe />} label="Web Projects" count={webProjects} bgColor="bg-blue-100" />
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
                  setSelectedCategory('');
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
                {Array.from(new Set(projects.map(p => p.category))).map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowAddProject(true)}
              className="font-semibold flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full md:w-auto"
            >
              <Plus /> Add Project
            </button>
          </div>

          {/* Table */}
          {filteredProjects.length === 0 ? (
            <div className="mt-8 text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No projects found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('');
                  setSelectedCategory('');
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
                    <th>Title</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project._id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4">{project.title}</td>
                      <td className="px-6 py-4">{project.description}</td>
                      <td className="px-6 py-4 capitalize">{project.type}</td>
                      <td className="px-6 py-4 capitalize">{project.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project._id);
                          }}
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
          )}
        </section>

        {/* Modal */}
        {showAddProject && (
          <Addproject
            onClose={() => setShowAddProject(false)}
            onSubmit={handleAddProject}
          />
        )}

        {/* View Project Modal */}
        {/* Optional: You can keep this or remove */}
      </div>
    </div>
  );
};

// Helper Component for Summary Cards
const SummaryCard = ({ icon, label, count, bgColor }) => (
  <div className="flex items-center bg-white border border-gray-200 rounded-xl p-4 w-full max-w-xs">
    <div className={`${bgColor} p-3 rounded-md`}>
      {React.cloneElement(icon, { color: '#4B5563', size: 24 })}
    </div>
    <div className="ml-3">
      <p className="text-gray-600">{label}</p>
      <p className="font-bold text-xl">{count}</p>
    </div>
  </div>
);

export default Admin;