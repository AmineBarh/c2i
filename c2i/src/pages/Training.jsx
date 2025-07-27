import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Laptop,
  Code,
  Cpu,
  Cog,
  TrendingUp,
  Brain,
  Building,
  Factory,
  Phone,
  X,
  Send,
  User,
  Building2,
  FileText,
  ChevronRight,
  Play,
} from "lucide-react";
import ViewTraining from "../component/ViewTraining";

// Import API functions
import { fetchtrainings } from "../services/api";
import ContactForm from "../component/ContactForm";

const Training = () => {
  const [trainings, setTrainings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Quote modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteRequest, setQuoteRequest] = useState({
    trainingId: "",
    trainingTitle: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    teamSize: "",
    preferredLocation: "",
    preferredDates: "",
    specificRequirements: "",
    budget: "",
    urgency: "",
  });
  const [quoteStep, setQuoteStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [selectedTraining, setSelectedTraining] = useState(null);

  // Fetch trainings on load
  useEffect(() => {
    const loadTrainings = async () => {
      try {
        setLoading(true);
        const data = await fetchtrainings(); // From API
        setTrainings(data || []);
        setError(null);
      } catch (err) {
        console.error("Error loading trainings:", err);
        setError("Failed to load training programs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadTrainings();
  }, []);

  // Filter trainings based on category
  const filteredTrainings = trainings.filter((training) =>
    selectedCategory === "All" ? true : training.category === selectedCategory
  );

  // Calculate stats
  const stats = (() => {
    return [
      {
        icon: <Users className="w-6 h-6" />,
        number: "1150 +",
        label: "Professionals Trained",
      },
      {
        icon: <Award className="w-6 h-6" />,
        number: "95%",
        label: "Completion Rate",
      },
      {
        icon: <Star className="w-6 h-6" />,
        number: "4.1",
        label: "Average Rating",
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        number: "89%",
        label: "Career Advancement",
      },
    ];
  })();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Expert-Led Training",
      description:
        "Learn from industry professionals with real-world experience and proven track records.",
      color: "bg-purplec2i-500",
    },
    {
      icon: <Laptop className="w-8 h-8" />,
      title: "Hands-On Projects",
      description:
        "Build real applications and solutions that you can showcase in your portfolio.",
      color: "bg-emerald-500",
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Flexible Locations",
      description:
        "Training at our state-of-the-art facility or on-site at your location for maximum convenience.",
      color: "bg-blue-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Development",
      description:
        "Customized group training programs designed to upskill your entire team effectively.",
      color: "bg-orange-500",
    },
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "IoT":
        return <Cpu className="w-5 h-5" />;
      case "Web Development":
        return <Code className="w-5 h-5" />;
      case "Automation":
        return <Cog className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getLocationIcon = (location) => {
    if (location.includes("Factory") || location.includes("Facility")) {
      return <Factory className="w-4 h-4" />;
    } else if (location.includes("Office") || location.includes("Boardroom")) {
      return <Building className="w-4 h-4" />;
    } else {
      return <MapPin className="w-4 h-4" />;
    }
  };

  const parseLocations = (locations) => {
    if (!locations || typeof locations !== "string") {
      return [];
    }
    return locations.split(",").map((loc) => loc.trim());
  };

  const handleGetQuote = (training) => {
    setSelectedTraining(null);
    setQuoteRequest({
      ...quoteRequest,
      trainingId: training._id || "",
      trainingTitle: training.title,
    });
    setQuoteStep(1);
    setShowQuoteModal(true);
    setSubmitSuccess(false);
  };

  const handleQuoteInputChange = (field, value) => {
    setQuoteRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    setQuoteStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setQuoteStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitQuote = async () => {
    // Client-side validation for required fields
    const requiredFields = ["email", "phone", "teamSize", "preferredLocation"];

    const missingFields = requiredFields.filter(
      (field) => !quoteRequest[field]
    );

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      setQuoteStep(1); // Return to first step to show missing fields
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/quotes/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quoteRequest),
        }
      );

      const data = await response.json(); // Now data is properly defined

      if (!response.ok) {
        // Handle server-side validation errors
        if (data.missingFields) {
          throw new Error(
            `Missing required fields: ${data.missingFields.join(", ")}`
          );
        }
        throw new Error(data.message || "Failed to submit quote");
      }

      setSubmitSuccess(true);
    } catch (err) {
      console.error("Quote submission error:", err);
      alert(err.message || "Failed to submit quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowQuoteModal(false);
    setSelectedTraining(null);
    setQuoteRequest({
      trainingId: "",
      trainingTitle: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
      teamSize: "",
      preferredLocation: "",
      preferredDates: "",
      specificRequirements: "",
      budget: "",
      urgency: "",
    });
    setQuoteStep(1);
    setSubmitSuccess(false);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/training/categories`
        );
        const data = await response.json();
        setCategories(["All", ...data]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    navigate(`#${sectionId}`);

    // Wait for the URL to update before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // Small delay ensures the element exists after navigation
  };
  return (
    <div className="pt-16">
      <section className="relative py-24 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purplec2i-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r font-black from-purplec2i-500 to-bluec2i-900 bg-clip-text text-transparent">
                PROFESSIONAL TRAINING
              </span>
              <br />
              <span className="text-gray-900">Programs</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Accelerate your team's expertise with our comprehensive in-person
              training programs. Learn from industry experts at our facility or
              yours, with hands-on experience in IoT, Web Development, and
              Automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <button
                onClick={() => scrollToSection("train")}
                className="bg-gradient-to-r from-purplec2i-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-purplec2i-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center"
              >
                <Phone className="mr-2 w-5 h-5" />
                Get Custom Quote
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-purplec2i-500 hover:text-purplec2i-500 transition-all duration-300 flex items-center">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purplec2i-500 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our{" "}
              <span className="text-purplec2i-500">Training</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive, practical training that prepares your
              team for real-world challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 ">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-blackc2i-600 mt-1 text-sm line-clamp-2 overflow-hidden break-words">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedTraining && (
        <ViewTraining
          training={selectedTraining}
          onClose={() => setSelectedTraining(null)}
          onRequestInfo={(training) => {
            setSelectedTraining(null);
            handleGetQuote(training);
          }}
        />
      )}
      <div className="pt-16">
        {/* Training Programs Section */}
        <section className="py-24 bg-white " id="train">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Training{" "}
                <span className="text-purplec2i-500">Programs</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Choose from our comprehensive selection of professional
                development courses.
              </p>
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-purplec2i-500 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-purple-50 hover:text-purplec2i-500 border border-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            {/* Loading and Error States */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bluec2i-500 mx-auto"></div>
                <p className="mt-4 text-lg text-blackc2i-600">
                  Loading projects...
                </p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-bluec2i-500 text-white rounded-md hover:bg-bluec2i-600"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Training Cards */}
            {!loading && !error && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTrainings.map((training) => (
                  <div
                    key={training._id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group border border-gray-100"
                  >
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
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          {getCategoryIcon(training.category)}
                          <span className="ml-1">{training.category}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-purplec2i-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        In-Person
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purplec2i-500 transition-colors mb-3">
                        {training.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {training.description}
                      </p>

                      <div className="mb-4 ">
                        <div className="flex flex-wrap gap-1">
                          {training.technologies
                            .slice(0, 3)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="bg-purple-100 text-purplec2i-900 px-2 py-1 rounded-md text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          {training.technologies.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
                              +{training.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">
                            Available Locations:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {parseLocations(training.locations).map(
                            (location, index) => (
                              <div
                                key={index}
                                className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md"
                              >
                                {getLocationIcon(location)}
                                <span className="ml-1">{location}</span>
                              </div>
                            )
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          Instructor:{" "}
                          <span className="font-medium">
                            {training.instructor}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedTraining(training)}
                        className="flex-grow mt-auto w-full bg-gradient-to-r from-purplec2i-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                      >
                        <BookOpen className="mr-2 w-4 h-4" />
                        View Training Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* No Results */}
            {filteredTrainings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <BookOpen className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No training programs found
                </h3>
                <p className="text-gray-600">
                  Try selecting a different category to find what you're looking
                  for.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Quote Modal */}
        {showQuoteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Request Training Quote
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {selectedTraining?.title}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              {/* Progress Steps */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step <= quoteStep
                            ? "bg-purplec2i-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step}
                      </div>
                      <span
                        className={`ml-2 text-sm font-medium ${
                          step <= quoteStep
                            ? "text-purplec2i-500"
                            : "text-gray-500"
                        }`}
                      >
                        {step === 1
                          ? "Contact Info"
                          : step === 2
                          ? "Training Details"
                          : "Requirements"}
                      </span>
                      {step < 3 && (
                        <ChevronRight className="w-4 h-4 text-gray-400 mx-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {!submitSuccess ? (
                <div className="p-6">
                  {/* Step 1: Contact Information */}
                  {quoteStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <User className="w-5 h-5 mr-2 text-purplec2i-500" />
                          Contact Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              value={quoteRequest.firstName}
                              onChange={(e) =>
                                handleQuoteInputChange(
                                  "firstName",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent"
                              placeholder="First Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              value={quoteRequest.lastName}
                              onChange={(e) =>
                                handleQuoteInputChange(
                                  "lastName",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent"
                              placeholder="Last Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              value={quoteRequest.email}
                              onChange={(e) =>
                                handleQuoteInputChange("email", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent"
                              placeholder="name@company.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              value={quoteRequest.phone}
                              onChange={(e) =>
                                handleQuoteInputChange("phone", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent"
                              placeholder="+216 94 123 456"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Company *
                            </label>
                            <input
                              type="text"
                              value={quoteRequest.company}
                              onChange={(e) =>
                                handleQuoteInputChange(
                                  "company",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent"
                              placeholder="Your Company"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Job Title
                            </label>
                            <input
                              type="text"
                              value={quoteRequest.jobTitle}
                              onChange={(e) =>
                                handleQuoteInputChange(
                                  "jobTitle",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent"
                              placeholder="Your Job Title"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Training Details */}
                  {quoteStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Building2 className="w-5 h-5 mr-2 text-purplec2i-500" />
                          Training Details
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Team Size *
                            </label>
                            <select
                              value={quoteRequest.teamSize}
                              onChange={(e) =>
                                handleQuoteInputChange(
                                  "teamSize",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select team size</option>
                              <option value="1-5">1-5 people</option>
                              <option value="6-15">6-15 people</option>
                              <option value="16-30">16-30 people</option>
                              <option value="31-50">31-50 people</option>
                              <option value="50+">50+ people</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Preferred Location *
                            </label>
                            <select
                              value={quoteRequest.preferredLocation}
                              onChange={(e) =>
                                handleQuoteInputChange(
                                  "preferredLocation",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent"
                              required
                            >
                              <option value="">Select location</option>
                              <option value="Our Training Center">
                                Our Training Center
                              </option>
                              <option value="Your Facility">
                                Your Facility
                              </option>
                              <option value="Both Options">
                                Both Options (Need Quote for Both)
                              </option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Preferred Dates
                            </label>
                            <input
                              type="text"
                              value={quoteRequest.preferredDates}
                              onChange={(e) =>
                                handleQuoteInputChange(
                                  "preferredDates",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent"
                              placeholder="Next month, Q2 2025, Flexible"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Urgency
                            </label>
                            <select
                              value={quoteRequest.urgency}
                              onChange={(e) =>
                                handleQuoteInputChange(
                                  "urgency",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent"
                            >
                              <option value="">Select urgency</option>
                              <option value="ASAP">
                                ASAP (Within 2 weeks)
                              </option>
                              <option value="1 Month">Within 1 month</option>
                              <option value="3 Months">Within 3 months</option>
                              <option value="Flexible">
                                Flexible timeline
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Requirements */}
                  {quoteStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-purplec2i-500" />
                          Additional Requirements
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Specific Requirements or Customizations
                            </label>
                            <textarea
                              rows={6}
                              value={quoteRequest.specificRequirements}
                              onChange={(e) =>
                                handleQuoteInputChange(
                                  "specificRequirements",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purplec2i-500 focus:border-transparent"
                              placeholder="Please describe any specific requirements, customizations needed, current skill level of your team, specific technologies you want to focus on, or any other details that would help us provide an accurate quote..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Modal Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
                    <div className="flex items-center space-x-4">
                      {quoteStep > 1 && (
                        <button
                          onClick={handlePrevStep}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Previous
                        </button>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      {quoteStep < 3 ? (
                        <button
                          onClick={handleNextStep}
                          className="bg-gradient-to-r from-purplec2i-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center"
                        >
                          Next
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmitQuote}
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-purplec2i-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 w-4 h-4" />
                              Submit Quote Request
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Success Message */
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-greenc2i-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-greenc2i-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Quote Request Submitted!
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Thank you for your interest in our training programs. Our
                    team will review your request and contact you within 24
                    hours with a customized quote.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What happens next?
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>
                        • Our training specialist will review your requirements
                      </li>
                      <li>• We'll prepare a customized quote and curriculum</li>
                      <li>
                        • You'll receive a detailed proposal within 24 hours
                      </li>
                      <li>
                        • We'll schedule a consultation call to discuss details
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={closeModal}
                    className="bg-gradient-to-r from-purplec2i-500 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <section className="py-24 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Training <span className="text-purplec2i-500">Locations</span>
            </h2>
            <p className="text-xl text-gray-600">
              Choose the training location that works best for your team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purplec2i-500 mb-6">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Training Center
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                State-of-the-art training facility equipped with the latest
                technology and hands-on lab environments. Perfect for immersive
                learning experiences with all necessary equipment provided.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-greenc2i-500 mr-2" />
                  Modern lab equipment and workstations
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-greenc2i-500 mr-2" />
                  High-speed internet and presentation systems
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-greenc2i-500 mr-2" />
                  Catering and comfortable learning environment
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-greenc2i-500 mr-2" />
                  Dedicated support staff and technical assistance
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Factory className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Your Facility
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                On-site training at your location for maximum convenience and
                context-specific learning. We bring our expertise directly to
                your team, using your existing systems and environment.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-greenc2i-500 mr-2" />
                  Training on your actual systems and processes
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-greenc2i-500 mr-2" />
                  No travel costs or time away from office
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-greenc2i-500 mr-2" />
                  Customized content for your specific needs
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-greenc2i-500 mr-2" />
                  Immediate implementation opportunities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ContactForm />
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purplec2i-500 to-bluec2i-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Upskill Your Team?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your training needs and get a customized
            quote for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("train")}
              className="bg-white text-purplec2i-500 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
            >
              <Phone className="mr-2 w-5 h-5" />
              Get Training Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Training;
