import { sql } from "./db.js"
import { randomUUID } from "crypto"

export class DatabasePostgres{
    async list(){
        const dados = await sql`select * from adverts`
        return dados
    }

    async create(advert){
        const advertId = randomUUID()

        const {title, description, price} = advert

        await sql`insert into adverts (id, title, description, price) VALUES (${advertId}, ${title}, ${description}, ${price})`
    }

    async update(id, advert){
        const {title, description, price} = advert

        await sql`update adverts set title = ${title}, description = ${description}, price = ${price} WHERE id = ${id}`
    }

    async delete(id){
      await sql`delete from adverts where id = ${id}`
    }
}