const express = require("express");
const cors = require("cors");
const hazardRoutes = require("./routes/hazardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/hazard", hazardRoutes);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
