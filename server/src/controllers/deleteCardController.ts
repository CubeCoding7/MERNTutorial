import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteCardController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const index = req.params.index;
  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send("no deck of this id exists");
  if (!index) return res.status(400).send("the index does not exist");
  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  res.json(deck);
}
