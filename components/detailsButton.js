import { mapRawCocktailData } from "../utilities.js";
import { fetchCocktailDetails } from "../services/apiService.js";
import { displayCocktailDetails } from "../utils/domUtils.js";
const detailsContainer = document.querySelector(".detail-module");



// Function to show the details of a cocktail
export const showDrinkDetails = (cocktailId) => {
  fetchCocktailDetails(cocktailId).then((response) => {
    const cocktailId = response.drinks ? response.drinks[0] : response;
    const mappedCocktailId = mapRawCocktailData(cocktailId);
    detailsContainer.style.display = "flex";
    console.log(mappedCocktailId);
    displayCocktailDetails(mappedCocktailId);
  });
};
