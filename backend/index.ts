import express from "express";
import cors from "cors";
require('dotenv').config();
import { connectedDB } from "./config/mongoAuth";
import userRoute from "./routes/userRoute";
import cookieParser from 'cookie-parser';

connectedDB();

const app = express();
const port = 5005;
app.use(cookieParser());
app.use(express.json()); 
const corsOptions = {
  origin: "http://localhost:5173",  // Allow only the React app's URL
  methods: "GET,POST,PUT,DELETE,PATCH",  // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization",  // Allowed headers
  credentials: true,  // Allow credentials like cookies or authorization headers
};

app.use(cors(corsOptions));  
app.use(userRoute);  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
