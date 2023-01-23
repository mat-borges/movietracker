import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { signInSchema, signUpSchema } from "../../schemas/userSchema.js";

import { NextFunction } from "express";
import bcrypt from "bcrypt";
import { cleanStringData } from "../../server.js";
import dotenv from "dotenv";
import sessionRepository from "../../repositories/sessionRepository.js";
import userRepository from "../../repositories/userRepository.js";

dotenv.config();

export function signUpSchemaValidation(req: Request, res: Response, next: NextFunction) {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const { name, email, password }: { name: string; email: string; password: string } = req.body;

  const user = {
    name: cleanStringData(name),
    email: cleanStringData(email).toLowerCase(),
    password: cleanStringData(password),
  };

  const { error } = signUpSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send({ errors });
  } else {
    const hashPassword = bcrypt.hashSync(password, 12);
    res.locals.user = { ...user, password: hashPassword };
    next();
  }
}

export function signInSchemaValidation(req: Request, res: Response, next: NextFunction) {
  const { email, password }: { email: string; password: string } = req.body;
  const user = { email: cleanStringData(email).toLowerCase(), password: cleanStringData(password) };
  const { error } = signInSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ message: errors });
  } else {
    res.locals.user = user;
    next();
  }
}

export async function checkEmailExists(req: Request, res: Response, next: NextFunction) {
  const { email }: { email: string } = res.locals.user;
  try {
    const emailExists = (await userRepository.checkEmail(email)).rows[0];

    if (emailExists) {
      return res.sendStatus(409);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function verifyUserCredentials(req: Request, res: Response, next: NextFunction) {
  const { email, password }: { email: string; password: string } = res.locals.user;
  try {
    const user = await userRepository.checkEmail(email);
    if (!user.rows[0]) {
      return res.status(401).send({ message: "Usuário inválido!" });
    }

    const checkPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!checkPassword) {
      return res.status(401).send({ message: "Senha inválida!" });
    } else {
      res.locals.user.user_id = user.rows[0].id;
      res.locals.user.name = user.rows[0].name;
      next();
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function sessionExists(req: Request, res: Response, next: NextFunction) {
  const { email }: { email: string } = res.locals.user;

  try {
    const sessionExist = (await sessionRepository.checkSession(email)).rows[0];
    if (sessionExist?.status) {
      const { token } = sessionExist;
      return res.send({ token });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function generateToken(req: Request, res: Response, next: NextFunction) {
  const { user_id, name, email }: { user_id: number; name: string; email: string } = res.locals.user;

  const token = jwt.sign({ user_id, name, email }, String(process.env.JWT_SECRET));

  try {
    await sessionRepository.newSession(user_id, token);
    res.locals.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(404);
  }

  const token: string = authorization?.replace(`Bearer `, ``);
  try {
    const { user_id, name, email } = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload;
    res.locals.token = token;
    res.locals.user = { user_id, name, email };
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}

export async function verifySession(req: Request, res: Response, next: NextFunction) {
  const { token } = res.locals;

  try {
    const session = await sessionRepository.getSessionByToken(token);
    if (!session.rows[0]) {
      res.sendStatus(401);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
