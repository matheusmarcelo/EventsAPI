// Estamos sobrescrevendo a biblioteca e colocamos a propriedade "user_id" 

declare namespace Express
{
    export interface Request
    {
        user_id: string;
    }
}