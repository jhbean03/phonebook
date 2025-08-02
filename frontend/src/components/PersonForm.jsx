const PersonForm = ({ onSubmit, onNameChange, onNumberChange, newName, newNumber}) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          Name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default PersonForm