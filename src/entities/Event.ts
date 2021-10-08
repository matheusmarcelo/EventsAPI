import {Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { v4 as uuid }from "uuid";
import { User } from "./User";

@Entity("eventos")
class Event {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @JoinColumn({name: "user_id"})
    @ManyToOne(() => User) 
    userId: User

    @Column()
    title: string

    @Column()
    description: string;

    @Column()
    startTime: string

    @Column()
    finishTime: string
    
    constructor()
    {
        (!this.id)
        {
            this.id = uuid();
        }
    }
}

export { Event };
