import React from "react";
import {
  BookOpen,
  Users,
  Clock,
  MapPin,
  ChevronLeft,
  CheckCircle,
  BarChart2,
} from "lucide-react";

const ViewTraining = ({ onClose, training, theme }) => {
  if (!training) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="mr-2" />
            Back to Trainings
          </button>
          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                theme?.categoryBg || "bg-blue-500"
              } text-white`}
            >
              {training.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Main Image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={
                training.media
                  ? training.media.startsWith("http")
                    ? training.media
                    : `http://localhost:7000${training.media}`
                  : "https://via.placeholder.com/1200x600?text=No+Image"
              }
              alt={training.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Title and Basic Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {training.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{training.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-gray-700">
                <Users className="w-5 h-5 mr-2" />
                <span>Instructor: {training.instructor}</span>
              </div>
              {training.duration && (
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Duration: {training.duration}</span>
                </div>
              )}
              {training.locations && (
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Locations: {training.locations}</span>
                </div>
              )}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="md:col-span-2">
              {/* Technologies */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart2 className="mr-2" />
                  Technologies Covered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {training.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        theme?.badgeBg || "bg-blue-100"
                      } ${theme?.badgeText || "text-blue-600"}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modules */}
              {training.modules?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="mr-2" />
                    Training Modules
                  </h2>
                  <ul className="space-y-3">
                    {training.modules.map((module, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{module}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Description */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTraining;
