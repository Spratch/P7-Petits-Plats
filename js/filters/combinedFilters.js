import { displayUpdatedLists } from "./listsUpdater.js";
import { filterFromSearchbar } from "./searchbar.js";
import { filterFromSelectedFilters } from "./selectedFilters.js";

export function applyCombinedFilters() {
    let currentRecipesList = recipes;

    // Get searchbar value
    const inputValue = document.getElementById("searchbar").value;
    if (inputValue.length >= 3) {
        currentRecipesList = filterFromSearchbar(inputValue, currentRecipesList);
    }

    // Get selected filters
    let selectedFiltersList = [];
    const selectedFilters = document.getElementById("selected-filters").querySelectorAll("li");
    selectedFilters.forEach((li) => {
        const filterName = li.dataset.filterName;
        const filterId = li.dataset.filterId;
        const selectedFilter = { filterName, filterId };
        selectedFiltersList.push(selectedFilter);
    });
    currentRecipesList = filterFromSelectedFilters(selectedFiltersList, currentRecipesList);

    // Apply filters
    displayUpdatedLists(currentRecipesList);
}