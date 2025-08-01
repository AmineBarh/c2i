const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Initialize app
const app = express();

// Load environment variables
dotenv.config();

// Middleware setup
app.use(
  cors({
    origin: `${process.env.REACT_APP_FRONTEND_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// partener
const partnerRouter = require("./Router/partnerRouter");
app.use("/api/partners", partnerRouter);
// Serve static files from uploads directory

const uploadsPath = path.join(__dirname, "uploads");
console.log(`Serving static files from: ${uploadsPath}`);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const projectRouter = require("./Router/projectRouter");
app.use(projectRouter);

const trainingRouter = require("./Router/trainingRouter");
app.use(trainingRouter);

// Database connection
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// Example Express route for POST /quotes/create
const quoteRoutes = require("./Router/quoteRouter");
const sendEmail = require("./utils/sendEmail");
app.use("/quotes", quoteRoutes);

const contactRouter = require("./Router/contactRouter");
app.use("/api/contact", contactRouter);

mongoose
  .connect(MONGOURL)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("DB connection error:", error));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require("dotenv").config();

const chatRouter = require("./Router/chatRouter");

app.use(cors());
app.use(express.json());

app.use("/api", chatRouter);

// Start your server in a function
async function startServer() {
  try {
    // You can put any async/await logic here if needed

    app.listen(7001, () => {
      console.log(`✅ Backend is running on ${process.env.REACT_APP_API_URL}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
}

startServer(); // <== Call the async wrapper
