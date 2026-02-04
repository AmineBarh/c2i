import { CircleCheckBig, X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

const CarouselItem = ({
  item,
  index,
  trackItemOffset,
  itemWidth,
  round,
  x,
}) => {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className={`relative shrink-0 ${
        round
          ? "items-center justify-center text-center bg-[#060010] border-0"
          : "bg-[#222] border border-[#222] rounded-[12px]"
      } overflow-hidden cursor-grab active:cursor-grabbing`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "300px",
        rotateY: rotateY,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={SPRING_OPTIONS}
    >
      {item.type === "image" ? (
        <img
          src={`${process.env.REACT_APP_API_URL || ""}${item.url}`}
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-cover"
          draggable="false"
          onError={(e) => {
            e.target.onerror = null;
            e.target.parentNode.innerHTML = `
              <div class="w-full h-full flex items-center justify-center bg-gray-200">
                <span class="text-gray-500">Image failed to load</span>
              </div>
            `;
          }}
        />
      ) : (
        <video
          className="w-full h-full object-cover"
          controls={true}
          muted
          loop
          playsInline
          onError={(e) => {
            e.target.onerror = null;
            e.target.parentNode.innerHTML = `
              <div class="w-full h-full flex items-center justify-center bg-gray-200">
                <span class="text-gray-500">Video failed to load</span>
              </div>
            `;
          }}
        >
          <source
            src={`${process.env.REACT_APP_API_URL || ""}${item.url}`}
            type={`video/${item.url.split(".").pop()}`}
          />
        </video>
      )}
    </motion.div>
  );
};

const Carousel = ({
  items = [],
  autoplay = false,
  autoplayDelay = 1000,
  pauseOnHover = false,
  loop = false,
  round = false,
  baseWidth = 600,
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Measure container width responsively
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  const itemWidth = Math.min(containerWidth - 32, baseWidth - 32); // Responsive width
  const trackItemOffset = itemWidth + GAP;
  const carouselItems = loop ? [...items, items[0]] : items;

  useEffect(() => {
    const container = containerRef.current;
    if (pauseOnHover && container) {
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) return prev + 1;
          if (prev === carouselItems.length - 1) return loop ? 0 : prev;
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  // Calculate responsive width and height
  const getResponsiveDimensions = () => {
    if (typeof window === "undefined") return { width: baseWidth, height: 300 };
    const screenWidth = window.innerWidth;
    let width, height;

    if (screenWidth < 640) {
      width = Math.min(screenWidth - 32, baseWidth);
      height = 200;
    } else if (screenWidth < 768) {
      width = Math.min(screenWidth - 48, baseWidth);
      height = 250;
    } else if (screenWidth < 1024) {
      width = Math.min(screenWidth - 64, baseWidth);
      height = 280;
    } else {
      width = baseWidth;
      height = 300;
    }

    return { width, height };
  };

  const { width: responsiveWidth } = getResponsiveDimensions();

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-2 sm:p-4 ${
        round ? "rounded-full border-white" : "rounded-[24px] border-[#222]"
      } mx-auto transition-transform duration-300 w-full`}
      style={{
        maxWidth: `${responsiveWidth}px`,
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${
            currentIndex * trackItemOffset + itemWidth / 2
          }px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <CarouselItem
            key={index}
            item={item}
            index={index}
            trackItemOffset={trackItemOffset}
            itemWidth={itemWidth}
            round={round}
            x={x}
          />
        ))}
      </motion.div>

      {/* Indicators */}
      {items.length > 1 && (
        <div className="flex w-full justify-center mt-3 sm:mt-4">
          <div className="flex gap-1 sm:gap-2">
            {items.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full cursor-pointer ${
                  currentIndex % items.length === index
                    ? "bg-white"
                    : "bg-gray-500"
                }`}
                animate={{
                  scale: currentIndex % items.length === index ? 1.2 : 1,
                }}
                onClick={() => setCurrentIndex(index)}
                transition={{ duration: 0.15 }}
              />
            ))}
          </div>
        </div>
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2 sm:p-4 overflow-y-auto">
      <div
        className="rounded-lg p-3 sm:p-4 md:p-6 w-full max-w-6xl shadow-lg relative my-4"
        style={{
          backgroundColor: currentTheme.background,
          color: currentTheme.text,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700 z-10 p-1"
          aria-label="Close project details"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Media Carousel */}
          <div className="w-full lg:w-1/2">
            <div className="p-1 sm:p-2 md:p-4">
              {mediaItems.length > 0 ? (
                <Carousel
                  items={mediaItems}
                  baseWidth={600}
                  autoplay={false}
                  autoplayDelay={5000}
                  pauseOnHover={true}
                  loop={false}
                  round={false}
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 sm:h-64 md:h-80 flex items-center justify-center text-gray-500 text-center text-xs sm:text-sm">
                  No media available
                </div>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="w-full lg:w-1/2 px-1 sm:px-2 md:px-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
              {project.title}
            </h3>

            <p className="mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg">
              {project.description}
            </p>

            <div className="mb-3 sm:mb-4 md:mb-6">
              <h4 className="font-semibold text-base sm:text-lg md:text-xl mb-2">
                Technologies:
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${currentTheme.badgeBg} ${currentTheme.badgeText}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-3 sm:mb-4 md:mb-6">
              <h4 className="font-semibold text-base sm:text-lg md:text-xl mb-2">
                Results:
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                {project.results.map((result, index) => (
                  <li
                    key={index}
                    className="flex items-start text-xs sm:text-sm md:text-base"
                  >
                    <CircleCheckBig
                      size={16}
                      className={`sm:w-5 sm:h-5 ${currentTheme.badgeText} flex-shrink-0 mt-0.5 mr-1.5 sm:mr-2`}
                    />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-10">
              <div>
                <h4 className="font-semibold text-xs sm:text-sm md:text-base mb-1">
                  Category:
                </h4>
                <span
                  className={`inline-block rounded-full px-2 py-1 sm:px-3 sm:py-1.5 text-xs ${currentTheme.categoryBg} ${currentTheme.categoryText}`}
                >
                  {project.category}
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-xs sm:text-sm md:text-base mb-1">
                  Project Type:
                </h4>
                <span
                  className={`inline-block rounded-full px-2 py-1 sm:px-3 sm:py-1.5 text-xs ${currentTheme.projectTypeBg} ${currentTheme.categoryText}`}
                >
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
