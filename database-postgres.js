import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class DatabasePostgres {
	#produtos = new Map()

	async list(search) {
		let produtos
		if (search) {
			produtos = await sql`select * from products_table where title ilike ${'%' +search + '%'}`
		} else {
			produtos = await sql`select * from products_table`
		}

		return produtos
	}

	async create(produto) {
		const produtoId = randomUUID()
		const { title, description, price } = produto

		await sql`insert into products_table (id, title, description, price) VALUES (${produtoId}, ${title}, ${description}, ${price})`
	}

	async update(id, produto) {
		const { title, description, price } = produto

		await sql`update products_table set title = ${title}, description = ${description}, price = ${price} WHERE id = ${id}`
	}

	async delete(id) {
		await sql`delete from products_table where id = ${id}`
	}
}