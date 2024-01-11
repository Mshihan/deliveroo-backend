import express from "express";
import { authRouter, categoryRouter, restaurantRouter } from "./routes";
require("dotenv").config({ path: ".env.local" });

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/restaurant", restaurantRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🏁 ✅`);
});
