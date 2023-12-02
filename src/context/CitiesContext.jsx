import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}
CitiesProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside the cities provider");
  return context;
}
export { CitiesProvider, useCities };
