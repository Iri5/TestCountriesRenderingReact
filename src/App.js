import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import loader from './loader.gif';
import './loader.css';
function App() {
  return (
    <Routes className="list-group">
      <Route path='/' element={<CountriesList />}></Route>
      <Route path='/:name' element={<CountryCard />}></Route>
    </Routes>
  );
}
function CountriesList() {
  const countryURL = 'https://restcountries.com/v3.1/all';

  const [countries, setCountries] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetch(countryURL)
      .then((res) => {
        setStatus(res.status);
        return res.json();
      })
      .then((data) => {
        setIsFetching(false);
        setCountries(data);
      });
  }, []);
  if ((status != 200) && !isFetching) return <h2>Error</h2>
  return (
    <div className="container-fluid text-left">
      <h1>Countries</h1>
      {isFetching ? <Preloader /> : null}
      <ul className="list-group">
        {countries &&
          countries.map((country, index) => {
            return (
              <li className='list-group-item list-group-item-action list-group-item-primary'>
                <NavLink to={`${country.name.official}`} className="text-decoration-none text-reset" key={index}>
                  <div className="" >
                    <h2>{country.name.official}</h2>
                  </div>
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
function CountryCard() {
  const params = useParams();
  const oneCountryURL = `https://restcountries.com/v3.1/name/${params.name}`;
  const [country, setCountry] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetch(oneCountryURL)
      .then((res) => {
        setStatus(res.status);
        return res.json();
      })
      .then((data) => {
        setIsFetching(false);
        setCountry(data);
        console.log(status);
      });
  }, []);
  if ((status != 200) && !isFetching) return <h2>Error</h2>
  if (country) {
    return (
      <div className="container-fluid">
        {isFetching ? <Preloader /> : null}
        <div className='card text-bg-info' style={{ width: 30 + '%' }}>
          <img className='card-img-top' src={country[0].flags.png} alt={'The flag of' + country[0].name.official}></img>
          <div>
            <h2 className='card-title'>{country[0].name.official}</h2>
            <p>Status: {country[0].status}</p>
            <p>Region: {country[0].region}</p>
            <p>Capital: {country[0].capital}</p>
          </div>
        </div>
      </div>
    )
  }
}
const Preloader = () => {
  return <img src={loader} className="loader" alt="preloader" />
}
export default App;
