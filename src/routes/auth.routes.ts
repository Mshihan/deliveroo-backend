import express from "express";
import authController from "../controllers/auth.controller";
import passport from "./../service/google.service";

const router = express.Router();

//TODO: Refresh token circle route [Need to implement rotation]
router.post("/refresh-token", authController.refreshToken);

// Registration user route
router.post("/register", authController.register);

// Login user route
router.post("/login", authController.login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/login/failed", (req, res, next) => {
  res.status(401).json({ success: false, message: "failed" });
});

router.get("/login/success", (req, res, next) => {
  if (req.user) {
    res.status(200).json({ success: true, message: "success", user: req.user });
  }
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
);

// router.get("/logout", (req, res) => {
//   // req.logout();
//   res.redirect("http://localhost:3000/");
// });

export default router;
