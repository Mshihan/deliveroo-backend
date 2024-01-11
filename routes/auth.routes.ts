import express, { NextFunction } from "express";
import authController from "../controllers/auth.controller";
import authentication from "../middleware/auth.middleware";

const router = express.Router();

router.post("/refresh-token", authController.refreshToken);
router.post("/register", authController.register);
router.post("/login", authController.login);

router.use(authentication);

router.get("/get-user", authController.test);
// router.get("/get-user", (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json({ user: req.user });
// });

export default router;
