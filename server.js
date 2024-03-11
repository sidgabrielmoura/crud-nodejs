import { fastify } from "fastify";
import cors from "@fastify/cors";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

await server.register(cors, {
  origin: true,
});

const database = new DatabasePostgres();

server.post("/adverts", async (request, reply) => {
  const payLoad = JSON.parse(request.body);

  console.log(request.body);

  await database.create(payLoad);

  return reply.status(201).send(payLoad);
});

server.get("/adverts", async () => {
  const adverts = await database.list();
  console.log(adverts)
  return adverts;
});

server.put("/adverts/:id", async (request, reply) => {
  const advertId = request.params.id;
  const { title, description, price } = request.body;

  await database.update(advertId, {
    title,
    description,
    price,
  });

  return reply.status(204).send();
});

server.delete("/adverts/:id", (request, reply) => {
  const advertId = request.params.id;

  database.delete(advertId);

  return reply.status(204).send();
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
