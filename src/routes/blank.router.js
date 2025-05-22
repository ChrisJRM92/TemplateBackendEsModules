import { getAll } from '../controllers/blank.controller.js';
import express from 'express';

const routeName = express.Router();

routeName.route('/').get(getAll)

export default routeName