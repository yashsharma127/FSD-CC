import { useState,useEffect } from "react"

const App = () =>  {

  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (country) {
      console.log('fetching country details...')
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => {
          setRates(response.data.rates)
        })
    }
  }, [country])

  return (
    <div >
      <form>
        find countries: <input />
      </form>
    </div>
  );
}

export default App;
