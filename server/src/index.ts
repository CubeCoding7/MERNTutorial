import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import { config } from "dotenv";
config();

import Deck from './models/Deck'

const app = express();
const PORT = 5000;

app.use(cors);
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    res.send('sup');
    console.log('rendered')
})

app.post('/decks', async (req: Request, res: Response) => {
    
    const newDeck = new Deck({
        title: req.body.title
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URI!).then(()=> {
    console.log(`listening on port ${PORT}`)
    app.listen(PORT)
});
