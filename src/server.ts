import fastify from 'fastify'
import { knex } from './database.js'
import { randomUUID } from 'node:crypto'
const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions').insert({
    id: randomUUID(),
    title: 'New transaction',
    amount: 100,
  }).returning('*')

  return transaction
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running!')
  })
