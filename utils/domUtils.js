

export const displayRandomCocktail = (cocktail) => {
  const randomCocktailContainer = document.querySelector(
    ".random-cocktail-display-container"
  );
  randomCocktailContainer.innerHTML = `
    <h2>${cocktail.name}</h2>
    <div class="random-image-wrapper">
    <img src=${cocktail.thumbnail} alt="">
    </div>
   
    <p>${cocktail.instructions}</p>
  `;
};


