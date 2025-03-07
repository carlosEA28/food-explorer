import { FastifyInstance } from "fastify";
import { prisma } from "../config/db/prisma";
import { loginSchema } from "../types/loginSchema";
import { verifyPassword } from "../utils/hash";

export function login(app: FastifyInstance) {
  app.post("/login", async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({ message: "Password incorrect" });
    }

    const token = await app.jwt.sign({ id: user.userId, email: user.email });

    return res.status(200).send({ token: token });
  });
}
