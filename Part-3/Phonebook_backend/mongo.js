const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('1. provide password only as argument to print phonebook')
  console.log('2. provide password name and number as an argument respectively to add a name with its number')
  process.exit(1)
}

const [password, name, number] = process.argv.slice(2)

const url =
  `mongodb+srv://fullstack:${password}@cluster0.mcl0shi.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


mongoose.connect(url).then((result) => {
  console.log('connected')
  if(name && number) {
    const person =new Person({
      name,
      number,
    })
    return person.save().then(person => {
      console.log(
        `added ${person.name} number ${person.number} to phonebook`
      )
      mongoose.connection.close()
    })
  }
  console.log('phonebook:')
  Person.find({}).then(person => {
    person.map(person => console.log(person.name, person.number))
    mongoose.connection.close()
  })
})
  .catch(error => {
    console.log(error)
  })
