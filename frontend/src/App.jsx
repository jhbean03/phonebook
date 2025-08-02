import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notif, setNotif] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFilterChange = event => setFilter(event.target.value.toLowerCase())

  const addName = event => {
    event.preventDefault()

    if (persons.reduce((acc, current) => acc || (current.name === newName), false)) {
      const userConfirm = window.confirm(
        `${newName} is already added to the phonebook. Would you like to replace the old number with a new one?`
      )

      if (userConfirm) {
        const selectedPerson = persons.find(p => p.name === newName)
        const updatedObj = { ...selectedPerson, number: newNumber}

        personService
          .update(updatedObj.id, updatedObj)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === updatedObj.id ? returnedPerson : p))
            setNewName("")
            setNewNumber("")
            setIsError(false)
            setNotif(
              `Updated the number for ${returnedPerson.name}.`
            )
            setTimeout(() => {
              setNotif(null)
            }, 5000)
          })
          .catch(error => {
            setIsError(true)
            setNotif(
              `Information for ${newName} has already been removed from the server.`
            )
            setTimeout(() => {
              setNotif(null)
            }, 5000)
          })
      }
    } else {
      const newPerson = { 
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setNotif(
              `Added ${returnedPerson.name}.`
            )
            setTimeout(() => {
              setNotif(null)
            }, 5000)
        })
    }
  }

  const deleteName = person => {
      const userConfirm = window.confirm(`Delete ${person.name}?`)
      if (userConfirm) {
        personService
          .remove(person.id)
          .then(responseData => {
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    }

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notif} isError={isError} />

      <Filter onChange={handleFilterChange}/>

      <h2>Add to Phonebook</h2>

      <PersonForm 
        onSubmit={addName}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <Persons 
        persons={persons} 
        filter={filter}
        deleteName={deleteName}
      />
    </div>
  )
}

export default App