import {
  displayNameSearchContainer,
  displayIngredientSearchContainer,
  displayCategorySearchContainer,
  displayGlassSearchContainer,
} from "../utils/domUtils.js";

const allRadioButtons = document.querySelectorAll('input[type="radio"]');

export const handleRadioChange = () => {
  allRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", (e) => {
      const selectedValue = e.target.value;
      console.log(selectedValue);
      if (selectedValue === "name") {
        displayNameSearchContainer();
      } else if (selectedValue === "ingredient") {
        displayIngredientSearchContainer();
      } else if (selectedValue === "category") {
        displayCategorySearchContainer();
      } else if (selectedValue === "glass") {
        displayGlassSearchContainer();
      }
    });
  });
};
