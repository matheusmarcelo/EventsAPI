import {Entity, Column, PrimaryColumn} from "typeorm";
import { v4 as uuid }from "uuid";

@Entity("users")
class User {

   @PrimaryColumn()
   readonly id: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   password: string;

   @Column()
   admin: boolean;

   constructor()
   {
       if(!this.id)
       {
           this.id = uuid();
       }
   }
}

export { User };
