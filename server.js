import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()


server.post('/survival-guide-store', async (request, reply) => {
	const { title, description, price } = request.body

	await database.create({
		title: title,
		description: description,
		price: price,
	})

	return reply.status(201).send()
})

server.get('/survival-guide-store', async (request) => {
	const search = request.query.search
	const produtos = await database.list(search)

	console.log(search)

	return produtos
})

// server.get('/survival-guide-store/item-detail', () => {
// 	return 'item detailed and combos'
// })

server.put('/survival-guide-store/:id', async  (request, reply) => {
	const produtoId = request.params.id
	const { title, description, price } = request.body

	await database.update(produtoId, {
		title, 
		description,
		price,
	})

	return reply.status(204).send()
})

server.delete('/survival-guide-store/:id', async (request, reply) => {
	const produtoId = request.params.id

	await database.delete(produtoId)

	return reply.status(204)
})

server.listen({
	port: 3333,
})