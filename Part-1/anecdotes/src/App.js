import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Anecdotes = ( {anecdotes,vote} ) => {
  return(
    <div>
      {anecdotes}<br/>
      has {vote} votes
    </div>
  )
}

const Button = ( {text,button} ) => {
  return (
  <button onClick={button} >{text}</button>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, {length: 8}).fill(0))
  
  
  console.log(points)
  console.log(selected)

  const RandomGen = () => {
    const random = Math.floor(Math.random() * 8) 
    setSelected(random)
}

  const VoteKeeper = () => {
    setPoints(points.map((e,i) => (i === selected ? e + 1:e )))
  }

  const MostVotes = points.indexOf(Math.max(...points))


  return (
    <div>
      <Header text = {"Anecdote of the day"}/>
      <Anecdotes anecdotes = {anecdotes[selected]} vote={points[selected]}/>

      <Button text = {"vote"} button = {VoteKeeper}/>
      <Button text = {"next anecdote"} button = {RandomGen}/>

      <Header text = {"Anecdote with most vote"}/>
      <Anecdotes anecdotes = {anecdotes[MostVotes]} vote={points[MostVotes]} />
    </div>
  )
}

export default App