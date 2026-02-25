import React, { useState } from "react";
import { FiX as X, FiSave as Save } from "react-icons/fi";

const AddTraining = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {
    title: "",
    category: "",
    description: "",
    media: "",
    instructor: "",
    locations: "",
    technologies: [],
  },
}) => {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define resetForm to reset form and close modal
  const resetForm = () => {
    setFormData(initialData);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTechnologyAdd = (tech) => {
    if (tech && !formData.technologies.includes(tech)) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, tech],
      }));
    }
  };

  const handleTechnologyRemove = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  // Determine if editing or adding new training
  const editingTraining = !!initialData.title;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingTraining
                ? "Edit Training Program"
                : "Add New Training Program"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Training Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Advanced IoT Implementation"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Category
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., IoT, Web Development, Automation"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed description of the training program..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Media File
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData((prev) => ({ ...prev, media: file }));
                  }
                }}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.media && (
                <div className="flex items-center text-sm text-green-600">
                  <Save className="w-4 h-4 mr-1" />
                  File selected
                </div>
              )}
            </div>
            {formData.media && (
              <div className="mt-2">
                <img
                  src={formData.media}
                  alt="Preview"
                  className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Instructor
              </label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    instructor: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Dr. Sarah Chen"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Locations
              </label>
              <input
                type="text"
                required
                value={formData.locations}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    locations: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Our Training Center, Your Office"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Technologies
            </label>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleTechnologyRemove(tech)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add technology (press Enter)"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.target;
                      handleTechnologyAdd(input.value.trim());
                      input.value = "";
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 ${
                isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-lg font-medium transition-colors flex items-center`}
            >
              <Save className="w-4 h-4 mr-2" />
              {editingTraining ? "Update Training" : "Create Training"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTraining;
