import { getCustomRepository } from "typeorm";
import { EventRepositories } from "../repositories/EventRepositories";


interface IEvent
{
    user_id: string;
    title: string
    description: string;
    startTime: string;
    finishTime: string;
}

class EventServices
{
    // Metodo de criacao de evento
    async createEvent({user_id, title, description, startTime, finishTime}: IEvent)
    {
        const eventRepository = getCustomRepository(EventRepositories);

        // Verifica se os campos estao vazios
        if(!title || !description || !startTime || !finishTime)
        {
            throw new Error("Event register incorrect!");
        }

        const descriptionExists = await eventRepository.findOne({
            title
        });

        // Verifica se ja existe um evento com este titulo
        if(descriptionExists)
        {
            throw new Error("This title already exists!");
        }

        // Cria o evento
        const event = eventRepository.create({
            user_id,
            title,
            description,
            startTime,
            finishTime
        });

        await eventRepository.save(event);

        return event;
    }

    // Metodo de listagem
    async listEvent()
    {
        const eventRepository = getCustomRepository(EventRepositories);

        // Encontra os eventos
        const events = await eventRepository.find();

        return events;
    }

    // Metodo de listagem de evento do usuario
    async listEventByUser(user_id: string)
    {
        const eventRepository = getCustomRepository(EventRepositories);

        // Procura o evento com o id do usuario
        const event = await eventRepository.find({
            where: {
                user_id: user_id
            }
        });        

        return event;
    }

    // Metodo de exclusao do evento
    async deleteEvent(id: string)
    {
        const eventRepository = getCustomRepository(EventRepositories);
        
        // Encontra o id do evento
        const event = await eventRepository.findOne({
            where: {
                id: id
            }
        });

        // Deleta o evento
        await eventRepository.delete(event);

        // Salva o evento
        await eventRepository.save;

        return event;
    }

}

export { EventServices };