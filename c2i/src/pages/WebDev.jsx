import React, { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";
import { CircleCheckBig, MoveRight, Cpu, Wifi, Shield, BarChart3 } from "lucide-react";

const WebDev = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(["All"]); 
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadProjects = async () => {
      const allProjects = await fetchProjects();
      const WebDevProjects = allProjects.filter(project => project.type === "web");
      const uniqueCategories = [...new Set(WebDevProjects.map(project => project.category))];
      
      setProjects(WebDevProjects);
      setCategories(["All", ...uniqueCategories.filter(Boolean)]); 
    };
    loadProjects();
  }, []);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  return (
    <div className="pt-5">
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-bluec2i-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-bluec2i-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-bluec2i-900">
                WebDev Solutions
              </span>
              <br />
              That Transform Industries
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect, monitor, and optimize your operations with our cutting-edge Internet of Things solutions. 
              From smart sensors to comprehensive platforms, we build the infrastructure for tomorrow.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16 mb-16 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-blackc2i-500 mb-4">
            Our WebDev <span className="text-bluec2i-900">Capabilities</span>
          </h2>
          <p className="text-xl text-blackc2i-500 max-w-2xl mx-auto">
            We provide end-to-end WebDev solutions from device connectivity to data insights.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-bluec2i-500 to-bluec2i-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Cpu className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-blackc2i-500 mb-3">Edge Computing</h3>
            <p className="text-blackc2i-500">Process data locally for faster response times and reduced bandwidth usage</p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-bluec2i-500 to-bluec2i-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Wifi className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-blackc2i-500 mb-3">Connectivity Solutions</h3>
            <p className="text-blackc2i-500">Support for various protocols including WiFi, LoRaWAN, Zigbee, and cellular</p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-bluec2i-500 to-bluec2i-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-blackc2i-500 mb-3">Security First</h3>
            <p className="text-blackc2i-500">Enterprise-grade security with encryption and secure device management</p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-bluec2i-500 to-bluec2i-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-blackc2i-500 mb-3">Data Analytics</h3>
            <p className="text-blackc2i-500">Advanced analytics and machine learning for actionable insights</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blackc2i-500 mb-4 inline-flex items-center gap-5">
            Our WebDev
            <span className="text-transparent bg-clip-text bg-bluec2i-500">
              Portfolio
            </span>
          </h2>
          <p className="text-xl text-blackc2i-500 mb-8 max-w-3xl mx-auto">
            Explore our comprehensive collection of WebDev implementations across various industries.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-bluec2i-900 text-white shadow-lg'
                  : 'bg-white text-blackc2i-500 hover:bg-bluec2i-100 hover:text-bluec2i-900 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {filteredProjects.map((project) => (
            <div key={project._id} className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-sm mx-auto flex flex-col">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 font-bold text-xl text-blackc2i-500">{project.title}</div>
              <p className="text-blackc2i-100 mt-1 text-sm flex-grow">{project.description}</p>
              <div className="mt-3 flex flex-col gap-2">
                <ul className="flex gap-2 items-start text-sm flex-wrap">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <li
                      className="bg-bluec2i-100 text-bluec2i-900 rounded-md px-2 py-1"
                      key={index}
                    >
                      {tech}
                    </li>
                  ))}
                  {project.technologies.length > 3 && (
                    <li className="text-blackc2i-100 bg-blackc2i-2 rounded-md px-2 py-1">
                      +{project.technologies.length - 3} more
                    </li>
                  )}
                </ul>
                <div className="checks">
                  <div className="result text-blackc2i-100 text-sm">
                    {project.results.map((result, index) => (
                      <li className="list-none flex gap-2 items-center" key={index}>
                        <CircleCheckBig size={16} color="#2469E4" />
                        <span className="truncate">{result}</span>
                      </li>
                    ))}
                  </div>
                </div>
                <button className="mt-4 w-full bg-gradient-to-r from-bluec2i-500 to-bluec2i-900 text-white py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center group">
                  View Details
                  <MoveRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16 bg-gradient-to-r from-bluec2i-500 to-bluec2i-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Connect Your Business?
          </h2>
          <p className="text-xl text-bluec2i-200 mb-8 max-w-2xl mx-auto">
            Transform your operations with intelligent WebDev solutions. Let's discuss your connectivity needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-bluec2i-900 px-8 py-3 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
              Start Your WebDev Project
              <MoveRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-white hover:text-bluec2i-900 transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDev;