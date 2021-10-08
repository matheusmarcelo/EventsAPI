import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { EventServices } from "../services/EventServices";
import { Event } from "../entities/Event";


class EventController
{
    // Metodo de criacao do evento
    async create(request: Request, response: Response)
    {
        const eventService = new EventServices();

        // Campos de registro
        const { title, description, startTime, finishTime } = request.body;
        const { user_id } = request;

        // Cria o evento
        const event = await eventService.createEvent({
            user_id: user_id,
            title,
            description,
            startTime,
            finishTime
        }); 

        return response.json(event);
    }

    // Metodo de listagem de evento do usuario
    async listByUser(request: Request, response: Response)
    {
        const eventService = new EventServices();

        // Pega o id do usuario 
        const { user_id } = request;

        // Passa o id para o service
        const event = await eventService.listEventByUser(user_id);

        return response.json(event);
    }

    // Metodo de listagem de evento
    async list(request: Request, response:Response)
    {
        const eventService = new EventServices();

        // Pega os eventos
        const event = await eventService.listEvent();

        // Retorna os evento em json
        return response.json(event);
    }

    // Metodo de atualizacao do evento
    async update(request: Request, response: Response): Promise<Response>
    {
        // Pega o id do evento
        const eventId = await getRepository(Event).findOne(request.params);

        // Verifica se existe o evento
        if(!eventId)
        {
            throw new Error("Not found!");
        }

        // Faz a atualizacao do evento
        getRepository(Event).merge(eventId, request.body);

        // Salva o evento no banco de dados
        const eventUpdate = await getRepository(Event).save(eventId)

        // Retorna o evento em json
        return response.json(eventUpdate);
    }

    // Metodo de exclusao do evento
    async delete(request: Request, response: Response)
    {
        const eventService = new EventServices();

        // Pega o id do headers
        const { id } = request.params;

        // Deleta o evento
        const event = await eventService.deleteEvent(id);

        // Retorna o evento em json
        return response.json(event);
    }
}

export { EventController };