import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import "express-async-errors";
import { router } from "./router";
import "./database";
import cors from "cors";

const app = express();

app.use(express.json());

// Middleware que permite outras aplicação fazer requisição nesta api
app.use((res, resp, next) =>{

    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");
    resp.header("Access-Control-Allow-Headers",['Content-Type', 'Authorization'])
    app.use(cors());

    next();
})

// Pega as rotas
app.use(router);

// Middleware de tratamento de erro
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

        if(err instanceof Error){
            return response.status(400).json({
                error: err.message
            });
        }

        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    });


// Porta do servido
app.listen(3333, () => console.log("runnig"));