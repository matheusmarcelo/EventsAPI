import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IAsString
{
    sub: string;
}

// Metodo que verifica se o usuario esta autenticado
export function ensureAuthenticate(request: Request, response: Response, next: NextFunction)
{
    // Pega o token autorizado
    const authToken = request.headers.authorization;

    // Se nao existir ele retorna Nao autorizado
    if(!authToken)
    {
        return response.status(401).end();
    }

    // Separa o token em um array, para separa do "Bearer"
    const [, token] = authToken.split(" ");

    try
    {
        // Verifica se o token é valido, e transforma em string
        const { sub } = verify(token, "72901cdcea22ec6a3abfe543c06193ae") as IAsString;

        // Passa o token para o id do usuario
        request.user_id = sub;

        return next();
    }
    catch (err)
    {
        // Se nao for um token valido ele retorna Nao autorizado
        return response.status(401).end();
    }
}