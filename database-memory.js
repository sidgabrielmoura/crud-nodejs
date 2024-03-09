import { randomUUID } from "crypto"

export class DatabaseMemory{
    #advert = new Map()

    list(){
        return Array.from(this.#advert.entries()).map((advertArray) => {
            const id = advertArray[0]
            const data = advertArray[1]

            return {
                id,
                ...data,
            }
        })
    }

    create(advert){
        const advertId = randomUUID()

        this.#advert.set(advertId, advert)
    }

    update(id, advert){
        this.#advert.set(id, advert)
    }

    delete(id){
        this.#advert.delete(id)
    }
}