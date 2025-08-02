const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

morgan.token("body", (request, response) => JSON.stringify(request.body))

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

let persons = [
    {
      name: "Toriel Dreemurr",
      number: "040-123456",
      id: "1"
    },
    {
      name: "Papyrus the Great",
      number: "39-44-5323523",
      id: "2"
    },
    {
      name: "Sans the Skeleton",
      number: "12-43-234345",
      id: "3"
    },
    {
      name: "Dr. Alphys",
      number: "39-23-6423122",
      id: "4"
    },
    {
      name: "Frisk",
      number: "123-456-7890",
      id: "5"
    }
  ]

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    response.send(`
        <p>The Phonebook has info for ${persons.length} people.</p>
        <div>${new Date()}</div>
    `)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    console.log(id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "Person's name is missing from the new entry."
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "Person's number is missing from the new entry."
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: "The entered name must be unique."
        })
    }

    const person = {
        id: String(Math.floor(Math.random() * 10000)),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})