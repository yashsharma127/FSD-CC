const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()

const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let persons = []

morgan.token('req-body', (req) => {
    if(req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    return '-'
})

const customFormat = ':method :url :status :response-time ms - :req-body';

app.use(morgan(customFormat))

app.use(express.json())

app.get('/info', (request, response) => {
    
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
  })

app.post('/api/persons', (request, response) => {
    const body  = request.body
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})


app.delete('/api/persons/:id', (request, response) => {
    const id =Number(request.params.id)
    persons =persons.filter(person => person.id !== id)

    response.status(204).end()
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})