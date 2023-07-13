const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('req-body', (req) => {
    if(req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    return '-'
})

const customFormat = ':method :url :status :response-time ms - :req-body';

app.use(morgan(customFormat))

app.use(express.json())

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})


app.post('/api/persons', (request, response) => {
    const body  = request.body
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.random()*1000
    }

    const uniqueCheck = persons.find(per =>per.name === person.name)    
    if(uniqueCheck){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    persons = persons.concat(person)

    response.json(person)
})


app.delete('/api/persons/:id', (request, response) => {
    const id =Number(request.params.id)
    persons =persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/info', (request, response) => {
    
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})