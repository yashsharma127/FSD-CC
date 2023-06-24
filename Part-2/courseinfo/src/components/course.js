const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({part}) => {
  return(
    part.reduce( (sum , part) => {
    return sum + part.exercises
  },0))
}

const Part = ({ part }) => {

  return(<p>
    {part.name} {part.exercises}
  </p>
)}

const Content = ({ parts }) => {
  console.log(parts)
  return(
    <div>
         {
         parts.map( part => 
          <Part key={part.id} part={part}/>
         )
         }
         <h3>total of <Total part = {parts} /> exercises</h3>
    </div>)
}

const Course = ({courses}) => {
  console.log(courses)
  return(
    <div>
      <Header course={courses[0]} />
      <Content parts={courses[0].parts} />
      <Header course={courses[1]} /> 
      <Content parts={courses[1].parts} />
      
    </div>
  )
}

export default Course