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
