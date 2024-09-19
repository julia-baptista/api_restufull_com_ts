// npm init -y // => para criar o projeto com Express e TypeScript
// npx tsc --init  // => inicia o TS
// npm install @types/config @types/express @types/mongoose @types/morgan @types/node ts-node-dev typescript --save-dev
// npm install config dotenv express express-validator mongoose morgan winston
// package.json: "dev": "ts-node-dev --respawn --transpile-only src/app.ts"
// npm run dev

// congig: arquivos de configuração para poder puxar as informações mais importantes do sistema
// dotnvie: para salvar variáveis de ambiente. Ex.: quando salva chave de api
// morgan: para logs
// winston: para criar arquivos de log com o que acontece na nossa aplicação
// mongodb atlas: https://www.mongodb.com/products/platform/atlas-database
// user: juliabaptista


// ENV variables
require("dotenv").config()

import express from "express"
import config from "config"


const app = express()

// JSON middleware
app.use(express.json())


// DB
import db from "../config/db"

// Routes
import router from "./router"

// Logger
import Logger from "../config/logger" 


//Middlewares
import morganMiddleware from "./middleware/morganMiddleware"

app.use(morganMiddleware)
app.use("/api/", router)


// app port
const port = config.get<number>("port")

app.listen(port, async () => {

  await db();
  Logger.info(`Aplicação está funcionando na porta: ${port}`)
})