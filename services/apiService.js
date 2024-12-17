export const fetchRandomCocktail = async () => {
  const BASE_RANDOM_URL = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
  try {
    const res = await fetch(BASE_RANDOM_URL);
    if (!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log(`Data fetched successfully: ${data}`);
    return data;
  } catch (error) {
    console.error(`An error occured while fetching data: ${error.message}`);
    throw error;
  } finally {
    console.log("Fetch operation completed");
  }
};

export const fetchCocktailDetails = async (cocktailId) => {
  try {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
    );
    if (!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log(`Data fetched successfully: ${data}`);
    return data;
  } catch (error) {
    console.error(`An error occured while fetching data: ${error.message}`);
    throw error;
  } finally {
    console.log("Fetch operation completed");
  }
};

export const fetchSearchedCocktail = async (searchValueQuery, searchType) => {
  let apiUrl;
  switch (searchType) {
    case "name":
      apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValueQuery}`;
      break;
    case "ingredient":
      apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValueQuery}`;
      break;
    case "category":
      apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchValueQuery}`;
      break;
    case "glass":
      apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${searchValueQuery}`;
      break;
    default:
      throw new Error("Inavlid Search type");
  }

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log(`Data fetched successfully: ${data}`);
    return data;
  } catch (error) {
    console.error(`An error occured while fetching data: ${error.message}`);
    throw error;
  } finally {
    console.log("Fetch operation completed");
  }
};
