import express, { Request, Response } from "express";
import { client } from "@repo/db/client";

const app = express();

console.log("Hello world");

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Healthy Server" });
});

app.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const newUser = await client.user.create({
    data: {
      username,
      password,
    },
  });
  res.status(200).json({ message: `New user created with id ${newUser.id}` });
});

app.listen(3001, () => console.log("Listening on PORT 3001"));
