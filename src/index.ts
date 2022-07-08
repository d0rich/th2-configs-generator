import { Request, Response } from 'express'
import express from 'express'
const app = express()

app.disable('x-powered-by')

import {configRouter} from "./controllers/configs";

app.use('/config', configRouter)

export const server = app

