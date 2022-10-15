const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
var cors = require('cors')

const app = express()

app.use(cors())
app.get('/', async (req, res) => {
    const allMarkers = await prisma.category.findMany({
      include: {
        markers: true
      }
    });
    res.json(allMarkers);
})

app.listen(3000, () =>
  console.log('REST API server ready'),
)