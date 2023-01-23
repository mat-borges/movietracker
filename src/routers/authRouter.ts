import {
  checkEmailExists,
  generateToken,
  sessionExists,
  signInSchemaValidation,
  signUpSchemaValidation,
  validateToken,
  verifySession,
  verifyUserCredentials,
} from "../middlewares/authMiddlewares/index.js";
import { signIn, signUp } from "../services/authServices.js";

import { Router } from "express";

const router = Router();

router.post("/sign-up", signUpSchemaValidation, checkEmailExists, signUp);
router.post("/sign-in", signInSchemaValidation, verifyUserCredentials, sessionExists, generateToken, signIn);
router.delete("sign-out");

export const authRouter = router;
