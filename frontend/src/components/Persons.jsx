const Persons = ({ persons, filter, deleteName }) => {
    const filterFunc = person => person.name.toLowerCase().includes(filter)
    
    const mapFunc = person => {
      return (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteName(person)}>Delete</button>
        </div>
      )
    }

    return (
      <div>
        {persons.filter(person => filterFunc(person)).map(person => mapFunc(person))}
      </div>
    )
}

export default Persons