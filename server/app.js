const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const UserInput = require("./models/userInput");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const userInputRoutes = require("./routes/userInput");
app.use("/api/userInput", userInputRoutes);

// Sync database
sequelize.sync({ force: true }).then(() => {
  console.log("Database connected & tables created!");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
