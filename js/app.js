import { displayFiltersLists, toggleFilter, toggleFilterDropdown } from "./filters.js";
import { initInteractions } from "./interactions.js";
import { displayRecipes } from "./recipes.js";

// OnClick handlers
window.toggleFilterDropdown = toggleFilterDropdown;
window.toggleFilter = toggleFilter;

function init() {
    displayRecipes();
    displayFiltersLists();
    initInteractions();
}

init()