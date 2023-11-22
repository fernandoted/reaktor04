import { randomUUID } from "node:crypto"

export class DatabaseMemory {
	#produtos = new Map()

	list(search) {
		return Array.from(this.#produtos.entries())
		.map((prodArray) => {
			const id = prodArray[0]
			const data = prodArray[1]

			return {
				id,
				...data,
			}
		})
		.filter(produto => {
			if (search) {
				return produto.title.includes(search)
			}

			return true
		})
	}

	create(produto) {
		const produtoId = randomUUID()

		this.#produtos.set(produtoId, produto)
	}

	update(id, produto) {
		this.#produtos.set(id, produto)
	}

	delete(id) {
		this.#produtos.delete(id)
	}
}