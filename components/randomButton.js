import { mapRawCocktailData } from "../utilities.js";
import { fetchRandomCocktail } from "../services/apiService.js";
import { displayRandomCocktail } from "../utils/domUtils.js";
const randomButton = document.querySelector(".generate-cocktail-btn");

export const generateNewDrink = () => {
  randomButton.addEventListener("click", () => {
    fetchRandomCocktail().then((res) => {
      const cocktail = res.drinks ? res.drinks[0] : res;
      const mappedCocktail = mapRawCocktailData(cocktail);
      displayRandomCocktail(mappedCocktail);
      console.log("clicked");
      console.log(cocktail);
    });
  });
};
