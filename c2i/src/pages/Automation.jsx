import React, { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";
import {
  CircleCheckBig,
  MoveRight,
  BarChart3,
  RefreshCw,
  Clock,
  TrendingUp,
} from "lucide-react";
import ViewProject from "../component/ViewProject";
import { useNavigate } from "react-router-dom";

const Automation = () => {
  const navigate = useNavigate();
  const goToAndScrollToBottom = () => {
    navigate("/");

    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const allProjects = await fetchProjects();
        const automationProjects = allProjects
          .filter((project) => project.type === "automation")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const uniqueCategories = [
          ...new Set(automationProjects.map((p) => p.category)),
        ].filter((cat) => cat && cat.trim() !== "");

        setProjects(automationProjects);
        setCategories(["All", ...uniqueCategories]);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="pt-16">
      {selectedProject && (
        <ViewProject
          theme={{
            background: "#ffffff",
            text: "text-blackc2i-500",
            badgeBg: "bg-orangec2i-100",
            badgeText: "text-orangec2i-900",
            categoryBg: "bg-orangec2i-500",
            projectTypeBg: "bg-orangec2i-500",
          }}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}

      {/* Hero Section */}
      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-96 h-96 bg-orangec2i-500/50 rounded-full blur-3xl animate-float-1"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orangec2i-500/50 rounded-full blur-3xl animate-float-2"></div>
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-orangec2i-900/20 rounded-full blur-3xl animate-float-3"></div>
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-orangec2i-500/25 rounded-full blur-3xl animate-float-4"></div>
          <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-orangec2i-900/50 rounded-full blur-3xl animate-float-5"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <div className="text-orange-500 uppercase mb-5">
                Solutions d'automatisation
              </div>
              <div>Qui transforment les industries</div>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connectez, surveillez et optimisez vos opérations avec nos
              solutions Internet des objets de pointe. Des capteurs intelligents
              aux plateformes complètes, nous construisons l'infrastructure de
              demain.
            </p>
          </div>
        </div>

        <style>{`
          @keyframes float-1 {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.3;
            }
            25% {
              transform: translate(-30px, -30px) scale(1.1);
              opacity: 0.5;
            }
            50% {
              transform: translate(-50px, 20px) scale(0.9);
              opacity: 0.7;
            }
            75% {
              transform: translate(-30px, 40px) scale(1.05);
              opacity: 0.4;
            }
          }

          @keyframes float-2 {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.3;
            }
            25% {
              transform: translate(40px, -20px) scale(1.15);
              opacity: 0.6;
            }
            50% {
              transform: translate(20px, -40px) scale(0.85);
              opacity: 0.4;
            }
            75% {
              transform: translate(-30px, -30px) scale(1.1);
              opacity: 0.7;
            }
          }

          @keyframes float-3 {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.2;
            }
            25% {
              transform: translate(20px, 30px) scale(1.1);
              opacity: 0.4;
            }
            50% {
              transform: translate(-20px, 10px) scale(0.9);
              opacity: 0.3;
            }
            75% {
              transform: translate(30px, -20px) scale(1.05);
              opacity: 0.5;
            }
          }

          @keyframes float-4 {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.25;
            }
            25% {
              transform: translate(-40px, 20px) scale(0.95);
              opacity: 0.45;
            }
            50% {
              transform: translate(30px, -10px) scale(1.1);
              opacity: 0.35;
            }
            75% {
              transform: translate(10px, 40px) scale(0.9);
              opacity: 0.55;
            }
          }

          @keyframes float-5 {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.2;
            }
            25% {
              transform: translate(30px, -40px) scale(1.1);
              opacity: 0.35;
            }
            50% {
              transform: translate(-10px, 30px) scale(0.95);
              opacity: 0.25;
            }
            75% {
              transform: translate(-40px, -10px) scale(1.05);
              opacity: 0.4;
            }
          }

          @keyframes gradient-move {
            0% {
              background-position: 100% 0%;
            }
            100% {
              background-position: 0% 100%;
            }
          }

          .animate-float-1 {
            animation: float-1 12s ease-in-out infinite;
          }

          .animate-float-2 {
            animation: float-2 14s ease-in-out infinite;
          }

          .animate-float-3 {
            animation: float-3 10s ease-in-out infinite;
          }

          .animate-float-4 {
            animation: float-4 16s ease-in-out infinite;
          }

          .animate-float-5 {
            animation: float-5 18s ease-in-out infinite;
          }

          .animate-gradient-move {
            animation: gradient-move 20s ease-in-out infinite alternate;
            background-size: 200% 200%;
          }
        `}</style>
      </section>

      {/* Capabilities */}
      <section className="py-16 mb-16 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-blackc2i-900 mb-4">
            Nos{" "}
            <span className="text-orangec2i-500">
              compétences en automatisation
            </span>
          </h2>
          <p className="text-xl text-blackc2i-600 max-w-2xl mx-auto">
            Nous fournissons des solutions d'automatisation complètes, de la
            connectivité des appareils aux analyses de données.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {[
            {
              icon: <RefreshCw />,
              title: "Automatisation des processus",
              desc: "Rationalisez les tâches répétitives et les flux de travail pour une efficacité maximale.",
            },
            {
              icon: <BarChart3 />,
              title: "Solutions de connectivité",
              desc: "Prise en charge de divers protocoles, notamment WiFi, LoRaWAN, Zigbee et cellulaire",
            },
            {
              icon: <Clock />,
              title: "Sécurité avant tout",
              desc: "Sécurité de niveau entreprise avec chiffrement et gestion sécurisée des appareils",
            },
            {
              icon: <TrendingUp />,
              title: "Analyse de données",
              desc: "Analyses avancées et apprentissage automatique pour des informations exploitables",
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orangec2i-500 to-orangec2i-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-blackc2i-900 mb-3">
                {item.title}
              </h3>
              <p className="text-blackc2i-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <div className="mb-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blackc2i-900 mb-4 inline-flex items-center gap-3">
            Notre
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orangec2i-500 to-orangec2i-900">
              portfolio d'automatisation
            </span>
          </h2>
          <p className="text-xl text-blackc2i-600 mb-8 max-w-3xl mx-auto">
            Découvrez notre collection complète de mises en œuvre
            d'automatisation dans divers secteurs.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 px-4 sm:px-44">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-orangec2i-500 text-white shadow-lg"
                  : "bg-white text-blackc2i-600 hover:bg-orangec2i-50 hover:text-orangec2i-500 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading/Error */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orangec2i-500 mx-auto"></div>
            <p className="mt-4 text-lg text-blackc2i-600">
              Chargement des projets...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-orangec2i-500 text-white rounded-md hover:bg-orangec2i-600"
            >
              Réessayer
            </button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-blackc2i-600 text-lg">
              Aucun projet trouvé dans la catégorie {selectedCategory}
            </p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="mt-4 px-4 py-2 bg-orangec2i-500 text-white rounded-md hover:bg-orangec2i-600"
            >
              Voir tous les projets
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-sm mx-auto flex flex-col"
              >
                <div className="relative rounded-lg overflow-hidden">
                  {project.media?.length > 0 ? (
                    project.media[0].type === "image" ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}${project.media[0].url}`}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="relative">
                        <video
                          className="w-full h-48 object-cover rounded"
                          poster={`${process.env.REACT_APP_API_URL}${project.media[0].url}?thumbnail`}
                        >
                          <source
                            src={`${process.env.REACT_APP_API_URL}${project.media[0].url}`}
                          />
                        </video>
                        <div className="absolute top-2 right-2 bg-black/50 text-white px-1.5 py-0.5 rounded text-xs">
                          Vidéo
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500">Pas de média</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 font-bold text-xl text-blackc2i-900">
                  {project.title}
                </div>
                <p className="text-blackc2i-600 mt-1 text-sm flex-grow line-clamp-4 h-fit">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <ul className="flex gap-2 items-start text-sm flex-wrap">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <li
                        className="bg-orangec2i-100 text-orangec2i-500 rounded-md px-2 py-1"
                        key={index}
                      >
                        {tech}
                      </li>
                    ))}
                    {project.technologies.length > 3 && (
                      <li className="text-blackc2i-600 bg-gray-100 rounded-md px-2 py-1">
                        +{project.technologies.length - 3} de plus
                      </li>
                    )}
                  </ul>
                  <div className="checks">
                    <div className="result text-blackc2i-600 text-sm">
                      {project.results.map((result, index) => (
                        <li
                          className="list-none flex gap-2 items-center"
                          key={index}
                        >
                          <CircleCheckBig size={16} color="#F8B74C" />
                          <span className="truncate">{result}</span>
                        </li>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="mt-4 w-full bg-orangec2i-500 text-white py-2.5 rounded-lg font-medium hover:bg-orangec2i-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                  >
                    Voir les détails
                    <MoveRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="py-16 bg-gradient-to-r from-orangec2i-500 to-orangec2i-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Automate Your Business?
          </h2>
          <p className="text-xl text-orangec2i-100 mb-8 max-w-2xl mx-auto">
            Transform your operations with intelligent automation solutions.
            Let's discuss your automation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={goToAndScrollToBottom}
              className="bg-white text-orangec2i-500 px-8 py-3 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
            >
              Start Your automation Project
              <MoveRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automation;
