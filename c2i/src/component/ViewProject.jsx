import { CircleCheckBig, X } from "lucide-react";
import React from "react";
import Carousel from "../blocks/Carousel/Carousel";

const ViewProject = ({ onClose, project }) => {
  // Ensure media is always an array
  const mediaItems = project.media || [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
          aria-label="Close project details"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Media Carousel */}
          <div className="lg:w-1/2 p-5">
            {mediaItems.length > 0 ? (
              <Carousel
                items={mediaItems}
                baseWidth={600}
                autoplay={true}
                autoplayDelay={5000}
                pauseOnHover={true}
                loop={false}
                round={false}
                showControls={true}
                showIndicators={true}
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
                No media available
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="lg:w-1/2 ms-9 project-details">
            <h3 className="text-3xl font-bold text-bluec2i-900 mb-4">
              {project.title}
            </h3>

            <p className="text-gray-700 mb-6 text-lg">{project.description}</p>

            <div className="mb-6">
              <h4 className="font-semibold text-xl mb-3">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-bluec2i-100 text-bluec2i-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-xl mb-3">Results:</h4>
              <ul className="space-y-3">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <CircleCheckBig
                      size={20}
                      className="text-green-500 flex-shrink-0 mt-1 mr-3"
                    />
                    <span className="text-gray-700">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">Category:</h4>
                <span className="inline-block bg-bluec2i-900 text-white rounded-full px-4 py-2">
                  {project.category}
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Project Type:</h4>
                <span className="inline-block bg-bluec2i-700 text-white rounded-full px-4 py-2">
                  {project.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
