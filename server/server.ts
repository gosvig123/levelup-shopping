import express from 'express'
import type { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Item } from '../types'

const app = express()
app.use(bodyParser.json())

// set cors to anything
// set cors to allow any origin for the host
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  })
)

const items: Item[] = []
app.post('/items', (req: Request, res: Response) => {
  try {
    const newItem: Item = req.body

    console.log(newItem)
    // destructure newItem and add an id
    const { name, checked, count } = newItem
    const id = items.length + 1
    const newItemWithId = { id, name, checked, count }
    items.push(newItemWithId)
    res.status(201).json(newItemWithId)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Read (GET)
app.get('/items', (req: Request, res: Response) => {
  try {
    res.status(200).json(items)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/items', (req: Request, res: Response) => {
  try {
    const id = req.body.id
    const itemToUpdate = req.body

    const updatedItem = itemToUpdate

    const itemIndex = items.findIndex((item) => item.id === id)
    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not found' })
    } else {
      items[itemIndex] = updatedItem
      res.status(200).json(updatedItem)
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Delete (DELETE)
app.delete('/items', (req: Request, res: Response) => {
  try {
    items.splice(0, items.length)
    res.status(200).json({ message: 'Items deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
