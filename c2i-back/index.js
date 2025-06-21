const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");



const app = express();
app.use('/uploads', express.static('uploads'));

app.use(cors());
dotenv.config();
app.use(express.json());

const projectRouter = require("./Router/projectRouter");
app.use(projectRouter);

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL 


mongoose.connect(MONGOURL)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);
});