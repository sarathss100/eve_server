import express from "express";
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}`});

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Started Successfully!`);
});

