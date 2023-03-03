import { Book, PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express'

const app = express()
app.use(express.json())

const prisma = new PrismaClient()
const port = process.env.PORT ?? 3030

app.get('/books', async (req, res) => {
  
  const response = await prisma.book.findMany()

  return res.json(response)
})

app.post('/register', async ( req: Request, res: Response) => {

  const {name, price}: Book = req.body

  const createBook = await prisma.book.create({
    data:{
      name,
      price
    }
  })

  return res.json(createBook)
})

app.listen(port)