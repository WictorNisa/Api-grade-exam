import { generateNewDrink } from "../components/randomButton.js";
import { showDrinkDetails } from "../components/detailsButton.js";
import { setAsFavourite } from "../components/favouriteButton.js";
import { handleCocktailSearch } from "../components/searchInput.js";
import { allResults, state, resultsPerPage } from "../components/searchInput.js";
import { mapRawCocktailData } from "../utilities.js";

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

  let favouriteObj = localStorage.getItem("favouritesArr");
  let favouriteArr = favouriteObj ? JSON.parse(favouriteObj) : [];
  if (favouriteArr.some((fav) => fav.id === cocktailId.id)) {
    favouriteIcon.classList.add("favourite-active");
  }

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
  const favouriteContainer = document.querySelector(
    ".favourite-cocktails-container"
  );
  favouriteContainer.innerHTML = ""; // Clear previous content

  favourites.forEach((cocktailId) => {
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

export const clearSearchContainer = () => {
  const searchAltContainer = document.querySelector(
    ".search-alternatives-container"
  );
  const searchResultsContainer = document.querySelector(".result-container");
  if (searchAltContainer) {
    searchAltContainer.innerHTML = "";
    searchResultsContainer.innerHTML = "";
  }
};

export const displayNameSearchContainer = () => {
  clearSearchContainer();
  const searchAltContainer = document.querySelector(
    ".search-alternatives-container"
  );
  if (searchAltContainer) {
    searchAltContainer.innerHTML = `
   <form class="search-form">
  <input type="text" id="search-input" placeholder="Search by name" />
  <button type="submit" id="search-button">Search</button>
  </form>
  `;
  }
  const searchForm = document.querySelector(".search-form");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameSearchInput = document
      .querySelector("#search-input")
      .value.toLowerCase();
    handleCocktailSearch(nameSearchInput, "name");
  });
};

export const displayIngredientSearchContainer = () => {
  clearSearchContainer();
  const searchAltContainer = document.querySelector(
    ".search-alternatives-container"
  );
  if (searchAltContainer) {
    searchAltContainer.innerHTML = `
      <form>
    <select id="ingredient-select">
                  <option value="Light rum">Light rum</option>
                  <option value="Bourbon">Bourbon</option>
                  <option value="Vodka">Vodka</option>
                  <option value="Gin">Gin</option>
                  <option value="Blended whiskey">Blended whiskey</option>
                  <option value="Tequila">Tequila</option>
                  <option value="Sweet Vermouth">Sweet Vermouth</option>
                  <option value="Apricot brandy">Apricot brandy</option>
                  <option value="Triple sec">Triple sec</option>
                  <option value="Southern Comfort">Southern Comfort</option>
                  <option value="Orange bitters">Orange bitters</option>
                  <option value="Brandy">Brandy</option>
                  <option value="Lemon vodka">Lemon vodka</option>
                  <option value="Dry Vermouth">Dry Vermouth</option>
                  <option value="Dark rum">Dark rum</option>
                  <option value="Amaretto">Amaretto</option>
                  <option value="Tea">Tea</option>
                  <option value="Applejack">Applejack</option>
                  <option value="Champagne">Champagne</option>
                  <option value="Scotch">Scotch</option>
                  <option value="Coffee liqueur">Coffee liqueur</option>
                  <option value="Añejo rum">Añejo rum</option>
                  <option value="Bitters">Bitters</option>
                  <option value="Sugar">Sugar</option>
                  <option value="Kahlua">Kahlua</option>
                  <option value="Dubonnet Rouge">Dubonnet Rouge</option>
                  <option value="Lime juice">Lime juice</option>
                  <option value="Irish whiskey">Irish whiskey</option>
                  <option value="Apple brandy">Apple brandy</option>
                  <option value="Carbonated water">Carbonated water</option>
                  <option value="Cherry brandy">Cherry brandy</option>
                  <option value="Creme de Cacao">Creme de Cacao</option>
                  <option value="Grenadine">Grenadine</option>
                  <option value="Port">Port</option>
                  <option value="Coffee brandy">Coffee brandy</option>
                  <option value="Red wine">Red wine</option>
                  <option value="Rum">Rum</option>
                  <option value="Grapefruit juice">Grapefruit juice</option>
                  <option value="Ricard">Ricard</option>
                  <option value="Sherry">Sherry</option>
                  <option value="Cognac">Cognac</option>
                  <option value="Sloe gin">Sloe gin</option>
                  <option value="Strawberry schnapps">Strawberry schnapps</option>
                  <option value="Apple juice">Apple juice</option>
                  <option value="Pineapple juice">Pineapple juice</option>
                  <option value="Lemon juice">Lemon juice</option>
                  <option value="Sugar syrup">Sugar syrup</option>
                  <option value="Milk">Milk</option>
                  <option value="Strawberries">Strawberries</option>
                  <option value="Chocolate syrup">Chocolate syrup</option>
                  <option value="Yoghurt">Yoghurt</option>
                  <option value="Mango">Mango</option>
                  <option value="Ginger">Ginger</option>
                  <option value="Lime">Lime</option>
                  <option value="Cantaloupe">Cantaloupe</option>
                  <option value="Berries">Berries</option>
                  <option value="Grapes">Grapes</option>
                  <option value="Kiwi">Kiwi</option>
                  <option value="Tomato juice">Tomato juice</option>
                  <option value="Cocoa powder">Cocoa powder</option>
                  <option value="Chocolate">Chocolate</option>
                  <option value="Heavy cream">Heavy cream</option>
                  <option value="Galliano">Galliano</option>
                  <option value="Peach Vodka">Peach Vodka</option>
                  <option value="Ouzo">Ouzo</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Spiced rum">Spiced rum</option>
                  <option value="Water">Water</option>
                  <option value="Espresso">Espresso</option>
                  <option value="Angelica root">Angelica root</option>
                  <option value="Orange">Orange</option>
                  <option value="Cranberries">Cranberries</option>
                  <option value="Johnnie Walker">Johnnie Walker</option>
                  <option value="Apple cider">Apple cider</option>
                  <option value="Everclear">Everclear</option>
                  <option value="Cranberry juice">Cranberry juice</option>
                  <option value="Egg yolk">Egg yolk</option>
                  <option value="Egg">Egg</option>
                  <option value="Grape juice">Grape juice</option>
                  <option value="Peach nectar">Peach nectar</option>
                  <option value="Lemon">Lemon</option>
                  <option value="Firewater">Firewater</option>
                  <option value="Lemonade">Lemonade</option>
                  <option value="Lager">Lager</option>
                  <option value="Whiskey">Whiskey</option>
                  <option value="Absolut Citron">Absolut Citron</option>
                  <option value="Pisco">Pisco</option>
                  <option value="Irish cream">Irish cream</option>
                  <option value="Ale">Ale</option>
                  <option value="Chocolate liqueur">Chocolate liqueur</option>
                  <option value="Midori melon liqueur">
                    Midori melon liqueur
                  </option>
                  <option value="Sambuca">Sambuca</option>
                  <option value="Cider">Cider</option>
                  <option value="Sprite">Sprite</option>
                  <option value="7-Up">7-Up</option>
                  <option value="Blackberry brandy">Blackberry brandy</option>
                  <option value="Peppermint schnapps">Peppermint schnapps</option>
                  <option value="Creme de Cassis">Creme de Cassis</option>
                  <option value="Jack Daniels">Jack Daniels</option>
                  <option value="Baileys irish cream">Baileys irish cream</option>
                </select>
             
    <button type="submit" id="search-button">Search</button>
    </form>
    `;
  }
  const searchForm = document.querySelector(".search-form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const ingredientSearchInput =
      document.querySelector("#ingredient-select").value;
    handleCocktailSearch(ingredientSearchInput, "ingredient");
  });
};

export const displayCategorySearchContainer = () => {
  clearSearchContainer();
  const searchAltContainer = document.querySelector(
    ".search-alternatives-container"
  );
  if (searchAltContainer) {
    searchAltContainer.innerHTML = `
     <form>
      <select id="category-select">
                  <option value="Cocktail">Cocktail</option>
                  <option value="Ordinary Drink">Ordinary Drink</option>
                  <option value="Punch / Party Drink">
                    Punch / Party Drink
                  </option>
                  <option value="Shake">Shake</option>
                  <option value="Other / Unknown">Other / Unknown</option>
                  <option value="Cocoa">Cocoa</option>
                  <option value="Shot">Shot</option>
                  <option value="Coffee / Tea">Coffee / Tea</option>
                  <option value="Homemade Liqueur">Homemade Liqueur</option>
                  <option value="Beer">Beer</option>
                  <option value="Soft Drink">Soft Drink</option>
                </select>
                <button type="submit" id="search-button">Search</button>
     </form>`;
  }

  const searchForm = document.querySelector(".search-form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const categorytSearchInput =
      document.querySelector("#category-select").value;
    handleCocktailSearch(categorytSearchInput, "category");
  });
};

export const displayGlassSearchContainer = () => {
  clearSearchContainer();
  const searchAltContainer = document.querySelector(
    ".search-alternatives-container"
  );
  if (searchAltContainer) {
    searchAltContainer.innerHTML = `
      <form>
   <select id="glass-select">
                  <option value="Highball glass">Highball glass</option>
                  <option value="Old-fashioned glass">
                    Old-fashioned glass
                  </option>
                  <option value="Cocktail glass">Cocktail glass</option>
                  <option value="Copper Mug">Copper Mug</option>
                  <option value="Whiskey Glass">Whiskey Glass</option>
                  <option value="Collins glass">Collins glass</option>
                  <option value="Pousse cafe glass">Pousse cafe glass</option>
                  <option value="Champagne flute">Champagne flute</option>
                  <option value="Whiskey sour glass">Whiskey sour glass</option>
                  <option value="Brandy snifter">Brandy snifter</option>
                  <option value="White wine glass">White wine glass</option>
                  <option value="Nick and Nora Glass">
                    Nick and Nora Glass
                  </option>
                  <option value="Hurricane glass">Hurricane glass</option>
                  <option value="Coffee mug">Coffee mug</option>
                  <option value="Shot glass">Shot glass</option>
                  <option value="Jar">Jar</option>
                  <option value="Irish coffee cup">Irish coffee cup</option>
                  <option value="Punch bowl">Punch bowl</option>
                  <option value="Pitcher">Pitcher</option>
                  <option value="Pint glass">Pint glass</option>
                  <option value="Cordial glass">Cordial glass</option>
                  <option value="Beer mug">Beer mug</option>
                  <option value="Margarita/Coupette glass">
                    Margarita/Coupette glass
                  </option>
                  <option value="Beer pilsner">Beer pilsner</option>
                  <option value="Beer Glass">Beer Glass</option>
                  <option value="Parfait glass">Parfait glass</option>
                  <option value="Wine Glass">Wine Glass</option>
                  <option value="Mason jar">Mason jar</option>
                  <option value="Margarita glass">Margarita glass</option>
                  <option value="Martini Glass">Martini Glass</option>
                  <option value="Balloon Glass">Balloon Glass</option>
                  <option value="Coupe Glass">Coupe Glass</option>
                </select>
                <button type="submit" id="search-button">Search</button>
    </form>`;
  }
  const searchForm = document.querySelector(".search-form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const glasstSearchInput = document.querySelector("#glass-select").value;
    handleCocktailSearch(glasstSearchInput, "glass");
  });
};

export const displayPage = (pageIndex) => {
  const searchResultsContainer = document.querySelector(".result-container");
  searchResultsContainer.innerHTML = "";
  const start = pageIndex * resultsPerPage;
  const end = start + resultsPerPage;
  const pageResults = allResults.slice(start, end);

  pageResults.forEach((cocktail) => {
    const mappedCocktail = mapRawCocktailData(cocktail);
    displaySearchedCocktail(mappedCocktail);
  });
};

export const createPaginationControls = () => {
  const totalPages = Math.ceil(allResults.length / resultsPerPage);
  const paginationContainer = document.querySelector(".pagination-container");
  paginationContainer.innerHTML = ""; // Clear previous buttons

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = state.currentPage === 0;

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = state.currentPage === totalPages - 1;

  const pageNumber = document.createElement("span");
  pageNumber.textContent = `Page ${state.currentPage + 1} of ${totalPages}`;

  // Event Listeners
  prevButton.addEventListener("click", () => {
    if (state.currentPage > 0) {
      state.currentPage--;
      displayPage(state.currentPage);
      createPaginationControls();
    }
  });

  nextButton.addEventListener("click", () => {
    if (state.currentPage < totalPages - 1) {
      state.currentPage++;
      displayPage(state.currentPage);
      createPaginationControls();
    }
  });

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageNumber);
  paginationContainer.appendChild(nextButton);
};
