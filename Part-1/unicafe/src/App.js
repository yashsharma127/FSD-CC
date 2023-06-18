import { useState } from 'react'


const goodCounter = (good,setGood) => {
  setGood(good + 1)
}

const neutralCounter = (neutral,setNeutral) => {
  setNeutral(neutral + 1)
}

const badCounter = (bad,setBad) => {
  setBad(bad + 1)
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

console.log("good button clicked",good,"times")
console.log("neutral button clicked",neutral,"times")
console.log("bad button clicked",bad,"times")

 
  return (
    <div>
      <h1>Give Feedback</h1>
      
      <button onClick={() => goodCounter(good , setGood)}>good</button>
      <button onClick={() => neutralCounter(neutral,setNeutral)}>neutral</button>
      <button onClick={() => badCounter(bad,setBad)}>bad</button>

      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App