const express = require("express");
const cors = require("cors");

const companyRoutes = require("./routes/companies");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const floodRoutes = require("./routes/flood");
const dashboardRoutes = require("./routes/dashboard");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/login", authRoutes);
app.use("/users", userRoutes);
app.use("/flood", floodRoutes);
app.use("/companies", companyRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(3001, () => {
  console.log("Server running on 3001 ✅");
});
