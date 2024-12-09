import { mapRawCocktailData } from "../utilities.js";
import { fetchRandomCocktail } from "../services/apiService.js";
import { displayRandomCocktail } from "../utils/domUtils.js";



// Fetches a new random cocktail from the api and then saves it into a mapable variable in order to display it in the dom
export const generateNewDrink = () => {
  fetchRandomCocktail().then((res) => {
    const cocktail = res.drinks ? res.drinks[0] : res;
    const mappedCocktail = mapRawCocktailData(cocktail);
    displayRandomCocktail(mappedCocktail);
    console.log(cocktail);
  });
};
