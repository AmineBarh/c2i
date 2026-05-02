import { CircleCheckBig, X, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  if (!items || items.length === 0) {
    return (
      <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500 text-center text-xs sm:text-sm">
        No media available
      </div>
    );
  }

  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-xl bg-black group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex items-center justify-center"
        >
          {items[currentIndex].type === "image" ? (
            <img
              src={`${process.env.REACT_APP_API_URL || ""}${items[currentIndex].url}`}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              src={`${process.env.REACT_APP_API_URL || ""}${items[currentIndex].url}`}
              className="w-full h-full object-contain"
              controls
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${currentIndex === index ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ViewProject = ({ onClose, project, theme }) => {
  const mediaItems = project.media || [];

  const currentTheme = {
    background: theme?.background || "#ffffff",
    text: theme?.text || "#111827",
    badgeBg: theme?.badgeBg || "bg-bluec2i-100",
    badgeText: theme?.badgeText || "text-bluec2i-800",
    categoryBg: theme?.categoryBg || "bg-bluec2i-900",
    categoryText: theme?.categoryText || "text-white",
    projectTypeBg: theme?.projectTypeBg || "bg-bluec2i-700",
  };

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop wrapper or the alignment container
    if (e.target.id === "modal-backdrop" || e.target.id === "modal-alignment-container") {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <div
        id="modal-alignment-container"
        className="flex min-h-full items-center justify-center p-4 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="rounded-3xl w-full max-w-3xl shadow-2xl relative flex flex-col border border-white/10 overflow-hidden bg-white text-gray-900" // Ensure bg/text colors are set even if theme fails
          style={{
            backgroundColor: currentTheme.background,
            color: currentTheme.text,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full transition-all backdrop-blur-sm border border-white/10 shadow-lg group"
            aria-label="Close project details"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Media Section */}
          <div className="w-full bg-black relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
            <Carousel items={mediaItems} />
          </div>

          {/* Content Section - Natural Layout (No fixed height) */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-transparent to-black/5">
            <div className="flex flex-col gap-8">
              {/* Header */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${currentTheme.categoryBg} ${currentTheme.categoryText}`}>
                    {project.category}
                  </span>
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${currentTheme.projectTypeBg} ${currentTheme.categoryText}`}>
                    {project.type}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight">{project.title}</h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{project.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        tech.trim() !== "" && (
                          <span
                            key={index}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${currentTheme.badgeBg} ${currentTheme.badgeText}`}
                          >
                            {tech}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {project.results && project.results.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      Key Results
                    </h3>
                    <ul className="space-y-3">
                      {project.results.map((result, index) => (
                        result.trim() !== "" && (
                          <li key={index} className="flex items-start gap-3">
                            <div className={`mt-1 p-1 rounded-full ${currentTheme.badgeBg}`}>
                              <CircleCheckBig size={14} className={currentTheme.badgeText} />
                            </div>
                            <span className="text-gray-700">{result}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewProject;
