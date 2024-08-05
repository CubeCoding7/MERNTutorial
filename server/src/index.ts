import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Root route works");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Test route works");
});

app.get("/decks", async (req: Request, res: Response) => {
  res.send("Decks route works");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
