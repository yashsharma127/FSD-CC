const Persons = ({personsToShow,deletePerson}) => {

    return (
      <>
      {personsToShow.map((person,i) => 
        <div key={i}> 
        {person.name}: {person.number} {' '}
        <button onClick={() => deletePerson(person.id)} >Delete</button><br/> 
           </div>
      )}
      </>
    )
}

export default Persons