import express from "express";
import {
  authRouter,
  dishCategoryRouter,
  dishRouter,
  restaurantRouter,
  dishReviewRouter,
  orderRouter,
  reportsRouter,
} from "./routes";
import morgan from "morgan";
require("dotenv").config({ path: ".env.local" });
import cors from "cors";
import passport from "./service/google.service";
import cookieSession from "cookie-session";
import errorHandlerMiddleware from "./middleware/error.middleware";

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["google"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb: () => void) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb: () => void) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/dish", dishRouter);
app.use("/api/dish-category", dishCategoryRouter);
app.use("/api/dish-review", dishReviewRouter);
app.use("/api/order", orderRouter);
app.use("/api/reports", reportsRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🏁 ✅`);
});
