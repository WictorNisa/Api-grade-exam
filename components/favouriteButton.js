export const setAsFavourite = (favouriteIcon, cocktailId) => {
  //Retrive existing favourites from local storage
  let favouriteObj = localStorage.getItem("favouritesArr");
  let favouriteArr = favouriteObj ? JSON.parse(favouriteObj) : [];


  if (!Array.isArray(favouriteArr)) {
    favouriteArr = [];
  }

  //Check if the cocktail is already a favourite
  const index = favouriteArr.findIndex((fav) => fav.id === cocktailId.id);

  if (index !== -1) {
    //If it is, remove it from the array
    favouriteArr.splice(index, 1);
    favouriteIcon.classList.remove("favourite-active");
  } else {
    //If it is not, add it to the array
    favouriteArr.push(cocktailId);
    favouriteIcon.classList.add("favourite-active");
  }

  //Save the updated array to local storage
  localStorage.setItem("favouritesArr", JSON.stringify(favouriteArr));
  console.log("Updated favourites:", favouriteArr);
};
