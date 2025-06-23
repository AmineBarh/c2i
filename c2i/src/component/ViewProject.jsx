import { CircleCheckBig, X } from "lucide-react";
import React from "react";
import Carousel from "../blocks/Carousel/Carousel";

const ViewProject = ({ onClose, project }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
        <div className="grid grid-cols-2 gap-52">
          <div className="h-fit">
            <Carousel
              items={[
                {
                  image: `http://localhost:7000${project.image}`,
                  alt: project.title,
                },
              ]}
              baseWidth={500}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
          <div className="project-details">
            <h3 className="text-2xl font-bold text-blackc2i-500 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-700 mb-4">{project.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-orangec2i-100 text-orangec2i-500 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Results:</h4>
              <ul className="space-y-2">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-center">
                    <CircleCheckBig
                      size={16}
                      color="#8BC445"
                      className="mx-2"
                    />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
            <h4 className="font-semibold mb-2">Category:</h4>
            <p className="text-white bg-bluec2i-900 rounded-3xl w-fit px-4 py-1 mb-4">
              {project.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
