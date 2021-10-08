import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { hash, compare } from "bcryptjs"
import { sign } from "jsonwebtoken";

interface IUserRequest
{
    name: string,
    email: string,
    password: string,
    admin?: boolean
}

interface IUserAuthenticate
{
    email: string,
    password: string
}

class UserServices
{
    // Método de autenticacao
    async authenticateUser({email, password}: IUserAuthenticate)
    {
        const userRepository = getCustomRepository(UserRepositories);

        const user = await userRepository.findOne({
            email,
        });

        // Verifica se o email ja esta cadastrado
        if(!user)
        {
            throw new Error("Email/Password Incorrect!");
        }

        // Verifica se a senha esta correta
        const passwordCompare = await compare(password, user.password);

        if(!passwordCompare)
        {
            throw new Error("Email/Password Incorrect!");
        }

        // Pega o token do usuario.
        const token = sign({
            email: user.email,
        }, "72901cdcea22ec6a3abfe543c06193ae", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }


    // Metodo de cadastro de usuario.
    async createUser({name, email, password, admin=false}: IUserRequest)
    {
        const userRepository = getCustomRepository(UserRepositories);

        // Verifica se os campos estao vazios
        if(!name || !email || !password)
        {
            throw new Error("Registration incorrect!");
        }

        const userExists = await userRepository.findOne({
            email
        });

        // Verifica se ja existe um usuario com este email
        if(userExists)
        {
            throw new Error("User already exists!");
        }

        // Faz um hash na senha
        const passwordHash = await hash(password, 8);

        // Cria o registro do usuario
        const user = userRepository.create({
            name,
            email,
            password: passwordHash,
            admin
        });

        // Salva no banco de dados.
        await userRepository.save(user);

        return user;
    }
}

export { UserServices };