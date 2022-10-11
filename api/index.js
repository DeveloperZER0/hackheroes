const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')

const app = express() //express

app.use(express.json())

app.get('/', async (req, res) => {
    const allMarkers = await prisma.post.findMany()
    res.json(allMarkers)
  })

app.listen(5000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)