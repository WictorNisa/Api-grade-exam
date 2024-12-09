import { mapRawCocktailData } from "./utilities.js";
import { fetchRandomCocktail } from "../services/apiService.js";
import { displayRandomCocktail } from "./utils/domUtils.js";
import { generateNewDrink } from "./components/randomButton.js";
import "./components/randomButton.js";

//Fetches a random cocktail from the api and then saves it into a mapable variable in order to display it in the dom
fetchRandomCocktail().then((response) => {
  console.log(response);
  const cocktail = response.drinks ? response.drinks[0] : response;
  const mappedCocktail = mapRawCocktailData(cocktail);
  console.log(mapRawCocktailData(cocktail));
  displayRandomCocktail(mappedCocktail);
});

//Button to generate a new random drink
generateNewDrink();
