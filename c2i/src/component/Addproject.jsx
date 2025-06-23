import React, { useState } from 'react';
import { X } from 'lucide-react';

const Addproject = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    results: '',
    category: '',
    type: ''
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const formDataToSend = new FormData();
  formDataToSend.append('title', formData.title);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('technologies', formData.technologies);
  formDataToSend.append('results', formData.results);
  formDataToSend.append('category', formData.category);
  formDataToSend.append('type', formData.type);
  
  if (image) {
    formDataToSend.append('image', image);
  }

  try {
    await onSubmit(formDataToSend);
    // No need to call onClose here - parent handles it after successful submission
  } catch (err) {
    setError(err.message || 'Failed to create project');
    console.error("Submission error:", err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4">Add New Project</h3>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-green-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="3"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-green-200 outline-none"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-green-200 outline-none"
            >
              <option value="">Select Type</option>
              <option value="iot">IoT</option>
              <option value="web">Web Development</option>
              <option value="automation">Automation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Healthcare"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-green-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Technologies (comma separated)</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-green-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Results (comma separated)</label>
            <input
              type="text"
              name="results"
              value={formData.results}
              onChange={handleChange}
              placeholder="Fast loading, Secure"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-green-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-50 file:text-green-700 file:font-semibold hover:file:bg-green-100"
            />
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-40 rounded border border-gray-200 shadow-sm"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-md hover:bg-green-700 transition-colors ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Adding...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproject;