import { displayFiltersLists } from "../filters.js";
import { displayRecipes } from "../recipes.js";

export function displayUpdatedLists(updatedRecipesList = recipes) {
    displayRecipes(updatedRecipesList);
    displayFiltersLists(updatedRecipesList);
}
