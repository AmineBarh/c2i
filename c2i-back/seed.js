const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("DB connection error:", error));

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  technologies: [String],
  results: [String],
  category: String,
  type: String,
  createdAt: Date,
  updatedAt: Date
});

const Project = mongoose.model('Project', projectSchema);

// Paste your array of projects here:
const projects = [
    {
      "title": "Smart Factory Monitoring",
      "description": "Real-time monitoring system for manufacturing equipment with predictive maintenance capabilities and AI-powered anomaly detection.",
      "image": "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["MQTT", "Node-RED", "InfluxDB", "Grafana", "TensorFlow", "Docker"],
      "results": ["40% reduction in downtime", "25% increase in efficiency", "Predictive maintenance alerts", "Real-time dashboard"],
      "category": "Manufacturing",
      "type": "iot",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "title": "Smart Agriculture Platform",
      "description": "IoT-enabled crop monitoring with automated irrigation, soil analysis, and weather prediction for optimal farming conditions.",
      "image": "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["AWS IoT", "React Dashboard", "Machine Learning", "Weather APIs", "Soil Sensors"],
      "results": ["30% water savings", "Improved crop yield by 22%", "Remote monitoring capability", "Weather-based automation"],
      "category": "Agriculture",
      "type": "iot",
      "createdAt": "2024-01-20T14:15:00Z",
      "updatedAt": "2024-01-20T14:15:00Z"
    },
    {
      "title": "Smart Building Management",
      "description": "Comprehensive building automation with energy optimization, security integration, and occupancy-based climate control.",
      "image": "https://images.pexels.com/photos/2850290/pexels-photo-2850290.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["Zigbee", "BACnet", "Edge Computing", "AI Analytics", "Mobile App", "Cloud Integration"],
      "results": ["35% energy reduction", "Enhanced security protocols", "Automated climate control", "Occupancy optimization"],
      "category": "Smart Buildings",
      "type": "iot",
      "createdAt": "2024-02-01T09:45:00Z",
      "updatedAt": "2024-02-01T09:45:00Z"
    },
    {
      "title": "Connected Vehicle Fleet",
      "description": "Fleet management system with real-time tracking, fuel optimization, driver behavior analytics, and maintenance scheduling.",
      "image": "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["GPS Tracking", "Cellular IoT", "Azure IoT Hub", "Power BI", "Telematics", "Mobile SDK"],
      "results": ["20% fuel savings", "Improved driver safety scores", "Real-time fleet visibility", "Predictive maintenance"],
      "category": "Transportation",
      "type": "iot",
      "createdAt": "2024-02-10T16:20:00Z",
      "updatedAt": "2024-02-10T16:20:00Z"
    },
    {
      "title": "Smart Grid Analytics",
      "description": "Energy distribution monitoring with load balancing, outage prediction, and renewable energy integration capabilities.",
      "image": "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["Modbus", "DNP3", "Time Series DB", "Machine Learning", "SCADA", "Renewable Integration"],
      "results": ["15% energy efficiency gain", "Reduced outage time by 45%", "Predictive maintenance", "Grid stability improvement"],
      "category": "Energy",
      "type": "iot",
      "createdAt": "2024-02-15T11:30:00Z",
      "updatedAt": "2024-02-15T11:30:00Z"
    },
    {
      "title": "Environmental Monitoring Network",
      "description": "City-wide air quality and weather monitoring with public dashboard, health alerts, and pollution source tracking.",
      "image": "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["LoRaWAN", "Sensor Networks", "Public API", "Mobile App", "Data Visualization", "Alert System"],
      "results": ["Real-time air quality data", "Public health alerts", "99.9% uptime", "Pollution source identification"],
      "category": "Environment",
      "type": "iot",
      "createdAt": "2024-02-20T13:45:00Z",
      "updatedAt": "2024-02-20T13:45:00Z"
    },
    {
      "title": "E-Commerce Marketplace",
      "description": "Modern multi-vendor e-commerce platform with advanced analytics, inventory management, and seamless checkout experience.",
      "image": "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["React", "Node.js", "PostgreSQL", "Stripe", "Redis", "AWS S3"],
      "results": ["300% increase in conversions", "Mobile-first design", "Real-time inventory tracking", "Multi-vendor support"],
      "category": "E-Commerce",
      "type": "web",
      "createdAt": "2024-01-10T09:15:00Z",
      "updatedAt": "2024-01-10T09:15:00Z"
    },
    {
      "title": "Healthcare Management System",
      "description": "Comprehensive patient management platform with appointment scheduling, medical records, telemedicine, and billing integration.",
      "image": "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["Vue.js", "Django", "MySQL", "WebRTC", "Payment Gateway", "Cloud Storage"],
      "results": ["Streamlined patient flow", "HIPAA compliant", "Integrated telemedicine", "Automated billing"],
      "category": "Healthcare",
      "type": "web",
      "createdAt": "2024-01-18T14:30:00Z",
      "updatedAt": "2024-01-18T14:30:00Z"
    },
    {
      "title": "Financial Trading Platform",
      "description": "Real-time financial analytics dashboard with portfolio management, risk assessment, and algorithmic trading capabilities.",
      "image": "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["Angular", "Spring Boot", "MongoDB", "D3.js", "WebSocket", "Machine Learning"],
      "results": ["Real-time data visualization", "Advanced risk analytics", "Mobile responsive", "Algorithmic trading"],
      "category": "FinTech",
      "type": "web",
      "createdAt": "2024-01-25T11:45:00Z",
      "updatedAt": "2024-01-25T11:45:00Z"
    },
    {
      "title": "Online Learning Platform",
      "description": "Interactive e-learning platform with video courses, live sessions, quizzes, certificates, and community features.",
      "image": "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["React", "Firebase", "Video.js", "WebSocket", "Payment Integration", "Analytics"],
      "results": ["10,000+ active learners", "Interactive video player", "Real-time collaboration", "Certificate generation"],
      "category": "Education",
      "type": "web",
      "createdAt": "2024-02-02T16:20:00Z",
      "updatedAt": "2024-02-02T16:20:00Z"
    },
    {
      "title": "Corporate Digital Transformation",
      "description": "Complete corporate website redesign with modern UI/UX, content management system, and employee portal integration.",
      "image": "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["Next.js", "Tailwind CSS", "Strapi CMS", "Vercel", "Authentication", "Analytics"],
      "results": ["50% increase in engagement", "Improved SEO ranking", "Fast loading times", "Employee portal integration"],
      "category": "Corporate",
      "type": "web",
      "createdAt": "2024-02-08T10:15:00Z",
      "updatedAt": "2024-02-08T10:15:00Z"
    },
    {
      "title": "Supply Chain Automation",
      "description": "End-to-end supply chain automation with inventory tracking, automated ordering, predictive analytics, and supplier integration.",
      "image": "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["Python", "RPA", "SAP Integration", "Machine Learning", "API Gateway", "Cloud Computing"],
      "results": ["60% reduction in processing time", "Automated inventory management", "Predictive demand forecasting", "Supplier integration"],
      "category": "Supply Chain",
      "type": "automation",
      "createdAt": "2024-01-12T08:30:00Z",
      "updatedAt": "2024-01-12T08:30:00Z"
    },
    {
      "title": "Customer Service Automation",
      "description": "Intelligent customer service platform with AI chatbots, ticket routing, automated responses, and sentiment analysis.",
      "image": "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["NLP", "Chatbot Framework", "CRM Integration", "Analytics", "Sentiment Analysis", "Multi-channel"],
      "results": ["80% reduction in response time", "24/7 customer support", "90% customer satisfaction rate", "Multi-channel support"],
      "category": "Customer Service",
      "type": "automation",
      "createdAt": "2024-01-19T14:45:00Z",
      "updatedAt": "2024-01-19T14:45:00Z"
    },
    {
      "title": "Financial Process Automation",
      "description": "Automated financial reporting, invoice processing, compliance monitoring, and fraud detection with real-time dashboards.",
      "image": "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["OCR", "Workflow Engine", "ERP Integration", "Compliance Tools", "Fraud Detection", "Reporting"],
      "results": ["95% accuracy in data processing", "Automated compliance reporting", "50% cost reduction", "Fraud prevention"],
      "category": "Finance",
      "type": "automation",
      "createdAt": "2024-01-26T11:20:00Z",
      "updatedAt": "2024-01-26T11:20:00Z"
    },
    {
      "title": "Manufacturing Process Control",
      "description": "Automated production line control with quality assurance, real-time monitoring, and predictive maintenance systems.",
      "image": "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["PLC Programming", "SCADA", "Industrial IoT", "Quality Control", "Predictive Analytics", "HMI"],
      "results": ["40% increase in production efficiency", "Zero-defect quality control", "Predictive maintenance", "Real-time monitoring"],
      "category": "Manufacturing",
      "type": "automation",
      "createdAt": "2024-02-03T16:35:00Z",
      "updatedAt": "2024-02-03T16:35:00Z"
    },
    {
      "title": "HR Process Automation",
      "description": "Complete HR workflow automation including recruitment, onboarding, performance management, and payroll processing.",
      "image": "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
      "technologies": ["Workflow Automation", "HRIS Integration", "Document Management", "Analytics", "AI Screening", "Payroll API"],
      "results": ["70% faster recruitment process", "Automated onboarding", "Performance tracking", "Payroll automation"],
      "category": "Human Resources",
      "type": "automation",
      "createdAt": "2024-02-09T09:50:00Z",
      "updatedAt": "2024-02-09T09:50:00Z"
    },
  ];

Project.insertMany(projects)
  .then(() => {
    console.log("✅ Data inserted successfully");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Insert failed", err);
    mongoose.disconnect();
  });
