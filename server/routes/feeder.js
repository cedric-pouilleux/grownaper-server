import express from 'express';
import mongoose from 'mongoose';
import "../utils/database";
import { Feeders } from '../models';

const app = express();

export default {

    get: app.get('/', async (req, res) => {
    }),

    add: app.post('/add', (req, res) => {
    }),

    edit: app.put('/edit', (req, res) => {
    }),

    remove: app.delete('/delete/:id', (req, res) => {
    }),
}