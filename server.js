import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()

server.post('/adverts', async (request, reply) => {
    const { title, description, price } = request.body

    await database.create({
        title,
        description,
        price,
    })

    return reply.status(201).send()
})

server.get('/adverts', async (request, reply) => {
    const videos = await database.list()

    console.log(videos)

    return videos
})

server.put('/adverts/:id', async (request, reply) => {
    const advertId = request.params.id
    const { title, description, price } = request.body

    await database.update(advertId, {
        title,
        description,
        price
    })

    return reply.status(204).send()
})

server.delete('/adverts/:id', (request, reply) => {
    const advertId = request.params.id
    
    database.delete(advertId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})