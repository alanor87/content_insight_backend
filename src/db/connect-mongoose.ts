import mongoose from 'mongoose';

import dotenv from "dotenv";
dotenv.config();


const { MONGO_DB_NAME, MONGO_DB_USER, MONGO_DB_PASS } = process.env;

const DB_HOST = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@cluster0.chh3o.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

const mongoDBconnection = mongoose.connect(DB_HOST);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connection open.')
});
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection closed.')
});
mongoose.connection.on('error', () => {
    console.log('MongoDB connection error.')
});

export {mongoDBconnection};