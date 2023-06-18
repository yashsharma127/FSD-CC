import { useState } from 'react'

const Headings = (props) => <h1>{props.text}</h1>

const Button = ({handleClick,text}) => <button onClick={handleClick} > {text} </button>
  
const Statistics = (props) => {
  if(props.good+props.neutral+props.bad===0 ){
  return(
    <div>
      <h1>{props.text}</h1>
      No Feedback
    </div>
  )
}
  return(
    <div>
      <h1>{props.text}</h1>
      <table>
          <tbody>
              <StatisticLine text = "good"     value ={props.good} />
              <StatisticLine text = "neutral"  value ={props.neutral} />
              <StatisticLine text = "bad"      value ={props.bad} />
              <StatisticLine text = "all"      value = {props.good+props.neutral+props.bad}/>
              <StatisticLine text = "Average"  value = {(props.good-props.bad)/(props.good+props.neutral+props.bad)} />
              <StatisticLine text = "Positive" value = {((props.good)/(props.good+props.neutral+props.bad))*100+'%'}/>
          </tbody>
      </table>
    </div>
  )
  
}

const goodCounter = (good,setGood) => setGood(good + 1)
 
const neutralCounter = (neutral,setNeutral) => setNeutral(neutral + 1)

const badCounter = (bad,setBad) => setBad(bad + 1)

const StatisticLine = (props) => 
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
  


const App = () => {
  const text = "Give Feedback"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

console.log("good button clicked",good,"times")
console.log("neutral button clicked",neutral,"times")
console.log("bad button clicked",bad,"times")

  return (
    <div>
      <Headings text = {text}/>

      <Button text= {"good"} handleClick = { () => goodCounter(good,setGood) }/>
      <Button text= {"neutral"} handleClick = { () => neutralCounter(neutral,setNeutral)}/>
      <Button text= {"bad"} handleClick = { () => badCounter(bad,setBad)}/>

      <Statistics text = {"Statistics"} 
                  good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}


export default App