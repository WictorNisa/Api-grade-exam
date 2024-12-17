export let allResults = [];
export const state = {
  currentPage: 0,
}
export const resultsPerPage = 10;


import { fetchSearchedCocktail } from "../services/apiService.js";
import { displayPage, createPaginationControls } from "../utils/domUtils.js";

export const handleCocktailSearch = (searchValueQuery, searchType) => {
  const searchResultsContainer = document.querySelector(".result-container");

  if (searchValueQuery === "") {
    alert("Enter a value");
    return;
  }

  searchResultsContainer.innerHTML = "";

  fetchSearchedCocktail(searchValueQuery, searchType)
    .then((inputData) => {
      allResults.length = 0; // Reset the array
      allResults.push(...(inputData.drinks ? inputData.drinks : []));
      state.currentPage = 0; // Access currentPage from state
      displayPage(state.currentPage);
      createPaginationControls();
    })
    .catch((error) => {
      console.error(`An error occurred while fetching data: ${error.message}`);
    });
};
