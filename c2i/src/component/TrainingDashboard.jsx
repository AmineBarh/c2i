import React, { useState, useEffect } from "react";
import AddTraining from "./Addtraining";
import {
  fetchtrainings,
  createtraining,
  updatetraining,
  deletetraining,
} from "../services/api";

import {
  Plus,
  Edit,
  Trash2,
  Search,
  BookOpen,
  Award,
  Calendar,
  X,
} from "lucide-react";

const TrainingDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("trainings");
  const [selectedTrainings, setSelectedTrainings] = useState([]);

  useEffect(() => {
    loadTrainings();
    loadCategories();
  }, []);

  const loadTrainings = async () => {
    try {
      const data = await fetchtrainings();
      setTrainings(data);
    } catch (error) {
      console.error("Error loading trainings:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/training/categories`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(["All", ...data]);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingTraining) {
        await updatetraining(editingTraining._id, data);
      } else {
        await createtraining(data);
      }
      await loadTrainings();
      resetForm();
    } catch (err) {
      console.error("Training submission failed:", err);
    }
  };

  const handleEdit = (training) => {
    setEditingTraining(training);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      try {
        await deletetraining(id);
        setTrainings(trainings.filter((t) => t._id !== id));
      } catch (error) {
        console.error("Error deleting training:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingTraining(null);
    setIsFormOpen(false);
  };

  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || training.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSelectTraining = (trainingId) => {
    setSelectedTrainings((prevSelected) =>
      prevSelected.includes(trainingId)
        ? prevSelected.filter((id) => id !== trainingId)
        : [...prevSelected, trainingId]
    );
  };

  const toggleSelectAllTrainings = () => {
    if (selectedTrainings.length === filteredTrainings.length) {
      setSelectedTrainings([]);
    } else {
      setSelectedTrainings(filteredTrainings.map((t) => t._id));
    }
  };

  const handleBulkDeleteTrainings = async () => {
    if (
      selectedTrainings.length > 0 &&
      window.confirm(
        `Are you sure you want to delete ${selectedTrainings.length} selected training(s)?`
      )
    ) {
      for (const trainingId of selectedTrainings) {
        await handleDelete(trainingId);
      }
      setSelectedTrainings([]);
    }
  };

  const stats = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: "Total Programs",
      value: trainings.length,
      color: "bg-blue-500",
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: "Instructors",
      value: new Set(trainings.map((t) => t.instructor)).size,
      color: "bg-purple-500",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "Categories",
      value: new Set(trainings.map((t) => t.category)).size,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Training Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your training programs and analytics.
          </p>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("trainings")}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "trainings"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <BookOpen className="w-5 h-5 mr-1" />
                Training Programs
              </button>
            </nav>
          </div>
        </div>

        {activeTab === "trainings" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white mr-4`}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search trainings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Training
                </button>
                <button
                  onClick={handleBulkDeleteTrainings}
                  disabled={selectedTrainings.length === 0}
                  className={`bg-red-600 text-white px-6 py-2 rounded-lg font-medium flex items-center ${
                    selectedTrainings.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-700"
                  }`}
                >
                  <X className="w-4 h-4 mr-2" />
                  Delete Selected
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        <input
                          type="checkbox"
                          checked={
                            selectedTrainings.length ===
                              filteredTrainings.length &&
                            filteredTrainings.length > 0
                          }
                          onChange={toggleSelectAllTrainings}
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Instructor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Technologies
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Locations
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTrainings.map((training) => (
                      <tr key={training._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedTrainings.includes(training._id)}
                            onChange={() => toggleSelectTraining(training._id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="px-6 py-4 flex items-center">
                          <img
                            src={
                              training.media
                                ? training.media.startsWith("http")
                                  ? training.media
                                  : `${process.env.REACT_APP_API_URL}${training.media}`
                                : "https://via.placeholder.com/800x400?text=No+Image"
                            }
                            alt={training.title}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />

                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {training.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {training.description}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {training.category}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {training.instructor}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {training.technologies?.slice(0, 3).join(", ")}
                          {training.technologies?.length > 3 &&
                            ` +${training.technologies.length - 3}`}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {training.locations}
                        </td>
                        <td className="px-6 py-4 text-right text-sm">
                          <button
                            onClick={() => handleEdit(training)}
                            className="text-blue-600 hover:text-blue-900 mr-2"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(training._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <AddTraining
              isOpen={isFormOpen}
              onClose={resetForm}
              onSubmit={handleFormSubmit}
              initialData={editingTraining || undefined}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TrainingDashboard;
