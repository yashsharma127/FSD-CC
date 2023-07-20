import { useState,useEffect } from "react"
import axios from 'axios'

const COUNTRIES_IN_LOCALSTORAGE = 'countries';

const App = () =>  {

  const [countries, setCountries] = useState([])

  useEffect(() => {
    
        console.log('Fetching from server');
        axios
          .get('https://restcountries.com/v3.1/all')
            .then((response) => {
              const fetchedCountries = response.data
              console.log('Fetched countries:', fetchedCountries);
              setCountries(fetchedCountries)
              localStorage.setItem(COUNTRIES_IN_LOCALSTORAGE, JSON.stringify(fetchedCountries))
        })
    
}, [])
   

  return (
    <div >
      <form>
        find countries: <input />
      </form>
    </div>
  );
}

export default App;
