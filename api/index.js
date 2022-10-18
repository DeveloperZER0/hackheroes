const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
var cors = require('cors')

const app = express()

app.use(cors())
app.get('/markers', async (req, res) => {
    const allMarkers = await prisma.post.findMany()
    res.json(allMarkers)
})
app.post('/receive', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})

app.listen(3000, () =>
  console.log('REST API server ready'),
)