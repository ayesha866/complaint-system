const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const complaintRoutes = require("./routes/complaint.routes");
const assignedComplaintRoutes = require("./routes/assigned.routes");
const messageRoutes = require("./routes/message.routes");

const app = express();
const PORT = 8000;

const dotenv = require("dotenv");
dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/assigned", assignedComplaintRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));