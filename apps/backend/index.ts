import express, { type Request, type Response } from "express";
import prisma from "db/client";
const app = express();

app.use(express.json());

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    return res.json({
      success: true,
      users,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: (e as Error)?.message,
    });
  }
});

app.post(
  "/signup",
  async (
    req: Request<{}, {}, { username: string; password: string }, {}>,
    res: Response
  ) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({
        success: false,
        message: "All fields are requrired",
      });
    }

    try {
      await prisma.user.create({
        data: {
          username,
          password,
        },
      });

      return res.json({
        success: true,
        message: "User created",
      });
    } catch (e) {
      return res.json({
        success: false,
        message: (e as Error)?.message,
      });
    }
  }
);

app.get(
  "user/todos",
  async (req: Request<{}, {}, { userId: string }, {}>, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
      return res.json({
        success: false,
        message: "User not signedup",
      });
    }

    try {
      const todos = await prisma.todo.findMany({
        where: {
          userId,
        },
      });

      return res.json({
        success: true,
        todos,
      });
    } catch (e) {
      return res.json({
        success: false,
        message: (e as Error)?.message,
      });
    }
  }
);

app.post(
  "/todo/create",
  async (
    req: Request<{}, {}, { userId: string; title: string }, {}>,
    res: Response
  ) => {
    const { userId, title } = req.body;

    if (!userId || !title) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    try {
      await prisma.todo.create({
        data: {
          userId,
          title,
        },
      });

      return res.json({
        success: true,
        message: "Todo created",
      });
    } catch (e) {
      return res.json({
        success: false,
        message: (e as Error)?.message,
      });
    }
  }
);

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();

    return res.json({
      success: true,
      todos,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: (e as Error)?.message,
    });
  }
});

app.listen(8080, () => {
  console.log("App is running on http://localhost:8080");
});