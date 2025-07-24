import React from "react";
import { Clock, Star, MapPin, X, User, Target } from "lucide-react";

const ViewTraining = ({ onClose, training, onRequestInfo }) => {
  if (!training) return null;

  const getCategoryColor = (category) => {
    switch (category) {
      case "IoT":
        return "bg-emerald-100 text-emerald-800";
      case "Web Development":
        return "bg-blue-100 text-blue-800";
      case "Automation":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderDescriptionWithLinks = (text) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={
              training.media
                ? training.media.startsWith("http")
                  ? training.media
                  : `${process.env.REACT_APP_API_URL}${training.media}`
                : "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={training.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                  training.category
                )}`}
              >
                {training.category}
              </span>
              {training.level && (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(
                    training.level
                  )}`}
                >
                  {training.level}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {training.title}
            </h1>
            <div className="flex items-center text-white/90 text-sm">
              <User className="w-4 h-4 mr-1" />
              <span className="mr-4">{training.instructor}</span>
              {training.duration && (
                <>
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="mr-4">{training.duration}</span>
                </>
              )}
              {training.rating && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  <span>{training.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              About This Training
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {renderDescriptionWithLinks(training.description)}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Technologies Covered
            </h3>
            <div className="flex flex-wrap gap-3">
              {training.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-4 py-2 rounded-lg font-medium border border-purple-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Instructor & Location */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Instructor
              </h3>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {training.instructor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {training.instructor}
                  </div>
                  <div className="text-sm text-gray-600">Expert Instructor</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Training Locations
              </h3>
              <div className="space-y-2">
                {training.locations?.split(",").map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{location.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onRequestInfo && onRequestInfo(training)}
              className="flex-1 border-2 border-purple-600 text-purple-600 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all duration-300 flex items-center justify-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Request Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTraining;
