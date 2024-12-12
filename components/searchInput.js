import { fetchSearchedCocktail } from "../services/apiService.js";
import { mapRawCocktailData } from "../utilities.js";
import { displaySearchedCocktail } from "../utils/domUtils.js";

const searchForm = document.querySelector(".search-form");

// Function to display the search results
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleCocktailSearch();
});

const handleCocktailSearch = () => {
  let searchInput = document.querySelector(".search-input").value;
  const searchResultsContainer = document.querySelector(
    ".result-container"
  );
  const formattedSearchInput = searchInput.toLowerCase();
  if (formattedSearchInput === "") {
    alert("Enter a value");
  } else {
    searchResultsContainer.innerHTML = "";
    fetchSearchedCocktail(formattedSearchInput).then((inputData) => {
      console.log(inputData);
      const inputCocktail = inputData.drinks ? inputData.drinks : inputData;

      inputCocktail.map((cocktail) => {
        const mappedInputCocktail = mapRawCocktailData(cocktail);
        displaySearchedCocktail(mappedInputCocktail);
      });
    });
    console.log(`Form submitted, value: ${formattedSearchInput}`);
  }
};
