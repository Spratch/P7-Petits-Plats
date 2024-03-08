import { displayFiltersLists, toggleFilter, toggleFilterDropdown } from "./filters.js";
import { initInteractions } from "./interactions.js";
import { displayRecipes } from "./recipes.js";

function init() {
    displayRecipes();
    displayFiltersLists();
    initInteractions();
}

init()