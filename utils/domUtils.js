import { generateNewDrink } from "../components/randomButton.js";
import { showDrinkDetails } from "../components/detailsButton.js";
import { setAsFavourite } from "../components/favouriteButton.js";

// Function to display a random cocktail
export const displayRandomCocktail = (cocktail) => {
  console.log(cocktail);
  const randomCocktailContainer = document.querySelector(
    ".random-cocktail-display-container"
  );
  randomCocktailContainer.innerHTML = `
    <div class="random-image-wrapper">
        <div class="border-div"></div>
    <img src=${cocktail.thumbnail} alt=${cocktail.thumbnail}>
    <h2>${cocktail.name}</h2>
    <p>${cocktail.category}</p>
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
    <div class="details-image-modal">

        <div class="detail-image-wrapper">
            <img src=${cocktailId.thumbnail} alt="">
             <h2 class="modal-image-h2">${cocktailId.name}</h2>
            <p class="modal-image-p">${cocktailId.category}</p>
        </div>
    </div>
   
        <div class="details-guide-modal">
        <button id="favourite-button">
         <span class="material-symbols-outlined" id="favourite-icon">
            favorite
        </span> 
        </button>
       
         <div class="detail-header">
        <button type="button" class="close-details-btn">Close</button>
    </div>
    
        <h2>Ingridients</h2>
         
        <p>${cocktailId.glass}</p>
        <ul>
            ${cocktailId.ingredients
              .map(
                (ingredient) =>
                  `<li>${ingredient.measure} ${ingredient.ingredient}</li>`
              )
              .join("")}
        </ul>

        <ul>
          ${cocktailId.tags.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>

        <h2>Instructions</h2>
        <p>${cocktailId.instructions}</p>
        </div>
    
        
</div>
    `;
  const favouriteButton = detailsContainer.querySelector("#favourite-button");
  const favouriteIcon = document.querySelector("#favourite-icon");
  const closeButton = detailsContainer.querySelector(".close-details-btn");
  closeButton.addEventListener("click", () => {
    detailsContainer.style.display = "none";
  });
  favouriteButton.addEventListener("click", () => {
    setAsFavourite(favouriteIcon, cocktailId);
  });
};

export const displaySearchedCocktail = (cocktailId) => {
  const searchResultsContainer = document.querySelector(".result-container");

  const searchResultsCard = document.createElement("div");
  searchResultsCard.classList.add("result-card");
  searchResultsCard.innerHTML = `
    
    <h2>${cocktailId.name}</h2>
    <p>${cocktailId.category}</p>
    <div class="result-image-wrapper">
    <img src=${cocktailId.thumbnail} alt="">
    </div>
    <div class="button-container">
            <button type="button" class="show-details-btn">See more</button>
          </div>
    
    `;

  const detailsButton = searchResultsCard.querySelector(".show-details-btn");

  detailsButton.addEventListener("click", () => {
    showDrinkDetails(cocktailId.id);
  });
  searchResultsContainer.appendChild(searchResultsCard);
};

export const displayFavourites = (favourites) => {
  const favouriteContainer = document.querySelector(".favourite-cocktails-container");
  favouriteContainer.innerHTML = ""; // Clear previous content

  favourites.forEach(cocktailId => {
    const favouriteCard = document.createElement("div");
    favouriteCard.classList.add("result-card");
    favouriteCard.innerHTML = `
      <h2>${cocktailId.name}</h2>
      <p>${cocktailId.category}</p>
      <div class="result-image-wrapper">
        <img src=${cocktailId.thumbnail} alt="">
      </div>
      <div class="button-container">
        <button type="button" class="show-details-btn">See more</button>
      </div>
    `;
    favouriteContainer.appendChild(favouriteCard);

    const detailsButton = favouriteCard.querySelector(".show-details-btn");
    detailsButton.addEventListener("click", () => {
      showDrinkDetails(cocktailId.id);
    });
  });
};