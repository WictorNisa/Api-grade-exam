import { mapRawCocktailData } from "./utilities.js";
import { fetchRandomCocktail } from "../services/apiService.js";
import { displayRandomCocktail, displayFavourites } from "./utils/domUtils.js";
import { handleRadioChange } from "./components/radioButtons.js";
import "./components/randomButton.js";
import "./components/searchInput.js";

const navbar = document.querySelector(".nav");
const startPage = document.querySelector("#start-page");
const detailsPage = document.querySelector("#details-page");
const searchPage = document.querySelector("#search-page");
const favouritesPage = document.querySelector("#favo-page");

navbar.addEventListener("click", handleOnNavbarClick);

function handleOnNavbarClick(e) {
  const classList = e.target.classList;
  if (classList.contains("link")) return handleOnLinkClick(e.target.id);
}

function handleOnLinkClick(id) {
  if (id === "start-link") {
    startPage.classList.add("open");
    detailsPage.classList.remove("open");
    searchPage.classList.remove("open");
    favouritesPage.classList.remove("open");
  }

  if (id === "search-link") {
    startPage.classList.remove("open");
    detailsPage.classList.remove("open");
    favouritesPage.classList.remove("open");
    searchPage.classList.add("open");
  }

  if (id === "favourites-link") {
    startPage.classList.remove("open");
    detailsPage.classList.remove("open");
    searchPage.classList.remove("open");
    favouritesPage.classList.add("open");
  }
}

//Fetches a random cocktail from the api and then saves it into a mapable variable in order to display it in the dom
fetchRandomCocktail().then((response) => {
  console.log(response);
  const cocktail = response.drinks ? response.drinks[0] : response;
  const mappedCocktail = mapRawCocktailData(cocktail);
  console.log(mapRawCocktailData(cocktail));
  displayRandomCocktail(mappedCocktail);
});

document.addEventListener("DOMContentLoaded", () => {
  handleRadioChange();
  const favouriteObj = localStorage.getItem("favouritesArr");
  const favouriteObjParsed = JSON.parse(favouriteObj);
  if (!Array.isArray(favouriteObjParsed)) {
    favouriteObjParsed = [];
  }
  displayFavourites(favouriteObjParsed);
});
