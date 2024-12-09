import { generateNewDrink } from "../components/randomButton.js";
import { showDrinkDetails } from "../components/detailsButton.js";


// Function to display a random cocktail
export const displayRandomCocktail = (cocktail) => {
  const randomCocktailContainer = document.querySelector(
    ".random-cocktail-display-container"
  );
  randomCocktailContainer.innerHTML = `
    <h2>${cocktail.name}</h2>
    <div class="random-image-wrapper">
    <img src=${cocktail.thumbnail} alt="">
    </div>
    <div class="button-container">
            <button type="button" class="generate-cocktail-btn">
              Pour me a new one
            </button>
            <button type="button" class="show-details-btn">See more</button>
          </div>
  `;

  const generateButton = randomCocktailContainer.querySelector(
    ".generate-cocktail-btn"
  );
  const detailsButton =
    randomCocktailContainer.querySelector(".show-details-btn");

  generateButton.addEventListener("click", () => {
    generateNewDrink();
  });

  detailsButton.addEventListener("click", () => {
    showDrinkDetails(cocktail.id);
  });
};


// Function to display the details of a cocktail
export const displayCocktailDetails = (cocktailId) => {
  const detailsContainer = document.querySelector(".detail-module");
  detailsContainer.innerHTML = `     
    <div class="detail-container">
    <div class="detail-header">
        <button type="button" class="close-details-btn">Close</button>
    </div>
        <h2>${cocktailId.name}</h2>
        <p>${cocktailId.category}</p>
        <div class="detail-image-wrapper">
          <img src=${cocktailId.thumbnail} alt="">
        </div>
      
        <p>${cocktailId.glass}</p>
        <ul>
            ${cocktailId.ingredients
              .map(
                (ingredient) => `
                <li>${ingredient.measure} ${ingredient.ingredient}</li>
            `
              )
              .join("")}
        </ul>
        <p>${cocktailId.instructions}</p>
</div>
    `;

  const closeButton = detailsContainer.querySelector(".close-details-btn");
  closeButton.addEventListener("click", () => {
    detailsContainer.style.display = "none";
  });
};
