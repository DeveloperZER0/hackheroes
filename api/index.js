const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
var cors = require('cors')

const app = express() //express

app.use(cors({
  origin: ['*']
}))

app.get('/', async (req, res) => {
    const allMarkers = await prisma.post.findMany()
    res.json(allMarkers)
  })

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)