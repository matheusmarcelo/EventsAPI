import { Request, Response } from "express";
import { UserServices } from "../services/UserServices";

class UserController
{
    // Metodo de autenticacao
    async authenticate(request: Request, response: Response)
    {
        // Campos de registro
        const { email, password } = request.body;

        const userService = new UserServices();

        // Autentica o usuario
        const token = await userService.authenticateUser({
            email,
            password
        });

        return response.json(token);
    }

    // Metodo de registro do usuario
    async create(request: Request, response: Response)
    {
        // Campos de registro
        const {name, email, password, admin} = request.body;

        const userService = new UserServices();

        // Cadastra o usuario
        const user = await userService.createUser({
            name,
            email,
            password,
            admin
        });

        return response.json(user);
    }
}

export { UserController };