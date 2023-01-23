import { Request, Response, Router } from "express";
import {
  checkEmailExists,
  generateToken,
  sessionExists,
  signInSchemaValidation,
  signUpSchemaValidation,
  verifyUserCredentials,
} from "../middlewares/authMiddlewares/authMiddleware.js";
import { signIn, signUp } from "../services/authServices.js";

const router = Router();

router.post("/sign-up", signUpSchemaValidation, checkEmailExists, signUp);
router.post("/sign-in", signInSchemaValidation, verifyUserCredentials, sessionExists, generateToken, signIn);
router.delete("/sign-out", (req: Request, res: Response) => res.sendStatus(501));

export default router;
