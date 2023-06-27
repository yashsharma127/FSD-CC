import { useState } from 'react'

const Filter = ({filterPerson,handelFilterperson,filterPersons}) => {
    return(
      <div>
      filter shown with: <input 
                            value={filterPerson}
                            onChange={handelFilterperson}/>
                            <button onClick={filterPersons} >show</button>
     </div>
    )

}


const PersonForm = ({newName,handlePerson,newNumber,handleNumber,persons,setPersons,setNewName,setNewNumber}) => {

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if( persons.find(person => person.name === newName) )
      alert(newName + ' is already added to phonebook')
    
    else
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
  }

  return(
  <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={handlePerson}/>
        </div>
         <div>
          number: <input 
                    value={newNumber} 
                    onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const Persons = ({personsToShow}) => {
    return (
      <>
      {personsToShow.map((person,i) => 
        <div key={i}> {person.name}: {person.number} <br/> 
           </div>
      )}
      </>
    )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true) 
  const [filterPerson , setFilterperson] = useState('')
  const [result, setResult] = useState([]);

  const personsToShow = showAll
    ? persons
    : persons.filter(person => result.some(resultPerson => resultPerson.name === person.name));


  const filterCaseInsensitive = () => {
    const lowerValue = filterPerson.toLowerCase();
    return persons.filter(person => person.name.toLowerCase().includes(lowerValue));
  }

  const filterPersons = () => {
    const filteredResult = filterCaseInsensitive()
    setResult(filteredResult)
    
    if (filteredResult.length > 0) 
      setShowAll(false);
    else 
      setShowAll(true)
  }

  

  const handleNumber = (event) => setNewNumber(event.target.value)
  const handlePerson = (event) => setNewName(event.target.value)
  const handelFilterperson = (event) => setFilterperson(event.target.value)
  


  return (
    <div>
       
      <h1>Phonebook</h1>
     <Filter filterPerson ={filterPerson} handelFilterperson={handelFilterperson} filterPersons={filterPersons}/>
      
      <h2>Add a new</h2>
      <PersonForm newName={newName} 
                  handlePerson={handlePerson} 
                  newNumber={newNumber} 
                  handleNumber={handleNumber} 
                  persons={persons}
                  setPersons = {setPersons}
                  setNewName = {setNewName}
                  setNewNumber = {setNewNumber}/>

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />

    </div>
  )
}

export default App