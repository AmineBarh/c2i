import React, { useState } from "react";
import { X } from "lucide-react";

const Addproject = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    results: "",
    category: "",
    type: "",
  });

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const validFiles = newFiles.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    // Filter out duplicates
    const existingFileNames = files.map((f) => f.name);
    const uniqueFiles = validFiles.filter(
      (file) => !existingFileNames.includes(file.name)
    );

    setFiles([...files, ...uniqueFiles]);

    uniqueFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviews((prev) => [
          ...prev,
          {
            url: reader.result,
            type: file.type.startsWith("image") ? "image" : "video",
            name: file.name,
            size: file.size,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    const newPreviews = [...previews];

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.type
    ) {
      setError("Please fill in all required fields");
      return false;
    }

    if (files.some((file) => file.size > 50 * 1024 * 1024)) {
      setError("One or more files exceed the 50MB limit");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate form
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("technologies", formData.technologies);
    formDataToSend.append("results", formData.results);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("type", formData.type);

    // Append all files
    files.forEach((file) => {
      formDataToSend.append("media", file);
    });

    try {
      await onSubmit(formDataToSend);
      onClose();
    } catch (err) {
      // Handle specific error messages
      let errorMessage = "Failed to create project";

      if (err.message.includes("File too large")) {
        errorMessage = "File size exceeds limit (50MB max)";
      } else if (err.message.includes("Only images and videos are allowed")) {
        errorMessage =
          "Only images and videos are allowed (JPEG, PNG, GIF, SVG, MP4, MOV, AVI, MKV, WEBM)";
      } else if (err.message.includes("Missing required fields")) {
        errorMessage = "Please fill in all required fields";
      } else if (err.message.includes("Unexpected field")) {
        errorMessage = "Invalid file upload. Please try again.";
      } else if (err.message) {
        // Try to parse server error message
        try {
          const serverError = JSON.parse(err.message);
          if (serverError.error) {
            errorMessage = serverError.error;
          }
          if (serverError.details) {
            errorMessage += `: ${serverError.details}`;
          }
        } catch {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4">Add New Project</h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-start">
            <div className="flex-1">
              <strong>Error:</strong> {error}
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-2 text-red-700 hover:text-red-900"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-bluec2i-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type<span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-bluec2i-200 outline-none"
              >
                <option value="">Select Type</option>
                <option value="iot">IoT</option>
                <option value="web">Web Development</option>
                <option value="automation">Automation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows="3"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-bluec2i-200 outline-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Healthcare"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-bluec2i-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-bluec2i-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Results (comma separated)
            </label>
            <input
              type="text"
              name="results"
              value={formData.results}
              onChange={handleChange}
              placeholder="Fast loading, Secure"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-bluec2i-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Media (images/videos)
            </label>
            <div className="mt-1 flex flex-col sm:flex-row gap-2">
              <label className="cursor-pointer bg-bluec2i-50 text-bluec2i-700 px-4 py-2 rounded-md font-medium hover:bg-bluec2i-100 transition-colors flex items-center justify-center">
                <span>Select Files</span>
                <input
                  type="file"
                  name="media"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <div className="text-xs text-gray-500 flex items-center">
                Max 50MB per file (JPEG, PNG, GIF, SVG, MP4, MOV, AVI, MKV,
                WEBM)
              </div>
            </div>

            {previews.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Selected Media:
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {previews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative group border border-gray-200 rounded-lg overflow-hidden"
                    >
                      {preview.type === "image" ? (
                        <img
                          src={preview.url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <div className="relative">
                          <video className="w-full h-32 object-cover" muted>
                            <source src={preview.url} type="video/mp4" />
                          </video>
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-1.5 py-0.5 rounded text-xs">
                            Video
                          </div>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                      <div className="p-2 bg-gray-50">
                        <div className="text-xs text-gray-500 truncate">
                          {preview.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {Math.round(preview.size / 1024)} KB
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-70"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-gradient-to-r from-bluec2i-900 to-bluec2i-500 text-white rounded-md hover:from-bluec2i-500 hover:to-bluec2i-900 transition-colors flex items-center justify-center ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Add Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproject;
