import { FastifyInstance } from "fastify";
import { createAccountSchema } from "../types/createAccountSchema";
import { prisma } from "../config/db/prisma";
import { hashPassword } from "../utils/hash";

export function createAccount(app: FastifyInstance) {
  app.post("/user", async (req, res) => {
    const { name, email, password } = createAccountSchema.parse(req.body);

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).send({ message: "user already exists" });
    }

    const hashUserPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashUserPassword,
        role: "USER",
      },
    });

    return res.status(201).send(user);
  });
}
