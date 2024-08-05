import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import Deck from "./models/Deck";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardController } from "./controllers/createCardController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardController } from "./controllers/deleteCardController";

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// Logging middleware
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(`Received ${req.method} request for ${req.url}`);
//   next();
// });

// Routes
app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardController);
app.delete("/decks/:deckId/cards/:index", deleteCardController);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Database connection and server start
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log(`MongoDB connected`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
