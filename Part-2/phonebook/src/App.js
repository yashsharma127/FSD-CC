import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import personServices from './services/persons'

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
    if( persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) ){
      const result = window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')
      if(result){
        const personChanging = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const personChanged = {...personChanging, number:newNumber}
        personServices
          .update(personChanged.id, personChanged)
          .then(updatedPerson => {
            setPersons(
              persons.map(person => person.id !== updatedPerson.id ? person :updatedPerson)
            )
            alert(newName + `'s number is updated`)
            setNewName('')
            setNewNumber('')
          })
      }
    }
      
    else
    personServices
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
     
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



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true) 
  const [filterPerson , setFilterperson] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])
  console.log('render', persons.length, 'persons')


  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase() === filterPerson.toLowerCase());


  const filterPersons = () => {
    if (persons.find(person => person.name.toLowerCase() === filterPerson.toLowerCase())) 
      setShowAll(false);
    else 
      setShowAll(true)
  }

  const deletePerson = (id) => {
    console.log(id,'delete person clicked')

    const deletingPerson = persons.find(person => person.id ===id)
    if( window.confirm(`Do you want to delete ${deletingPerson.name}'s details?`) )
     {  personServices
          .remove(id)
          .then(removedPerson => {
            setPersons(
              persons.filter( person => person.id !== deletingPerson.id)
            )
          }) 
          .catch((error) => {
            alert(`${deletingPerson.name} is already deleted`)
            })
        }

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
      <Persons personsToShow={personsToShow}
               deletePerson = {deletePerson} />

    </div>
  )
}

export default App