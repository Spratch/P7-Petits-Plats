import { displayFiltersLists, toggleDropdownClasses, toggleFilter, toggleFilterDropdown } from "./filters.js";
import { filterFromSearchbar } from "./filters/index.js";
import { displayRecipes } from "./recipes.js";

// Click listener on filter list dropdown buttons
function setupFilterDropdownEvents() {
    document.querySelectorAll(".filter-button").forEach((button) => {
        button.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            toggleFilterDropdown(category);
        });
    });
}

// Click listener on dropdown filter list items
export function setupFilterItemEvents() {
    document.querySelectorAll(".filter-item").forEach((label) => {
        const itemName = label.textContent;
        const itemId = label.getAttribute("for");
        label.addEventListener('click', () => {
            console.log("click on", itemName);
            toggleFilter(itemName, itemId, true)});
    });
}

// Click listener on selecter filter list items
export function setupSelectedFilterItemEvents() {
    document.querySelectorAll(".selected-filter-item").forEach((item) => {
        const itemName = item.dataset.filterName;
        const itemId = item.dataset.filterId;

        item.addEventListener('click', () => toggleFilter(itemName, itemId, false));
    });
}

// Closes opened dropdown if user click outside
export function closeDropdownsOnClickOutside(event) {
    const dropdownButtons = document.querySelectorAll("[id^='sort-button-']");
    if (!event.target.closest(".filter-button") && !event.target.closest(".dropdown-content")) {
        dropdownButtons.forEach((button) => {
            if (button.classList.contains("rounded-t-xl")) {
                toggleDropdownClasses(button);
            }
        });
    }
}

// Closes opened dropdown if user press escape
export function closeDropdownsOnEscape(event) {
    if (event.key === "Escape") {
        document.querySelectorAll("[id^='sort-button-']").forEach((button) => {
            if (button.classList.contains("rounded-t-xl")) {
                toggleDropdownClasses(button);
            }
        });
    }
}

// Keydown listener in main searchbar
function setupSearchbarKeydownEvents() {
    const searchbarInput = document.getElementById("searchbar");
    const resetButton = document.getElementById("main-reset");

    searchbarInput.addEventListener('input', () => {
        const inputValue = searchbarInput.value;
        const minimumValueLength = 3;

        // Displays cross
        if (inputValue.length >= 1) {
            resetButton.classList.remove("opacity-0", "pointer-events-none");
        }
        // Updates recipes and filters lists
        if (inputValue.length >= minimumValueLength) {
            const updatedRecipesList = filterFromSearchbar(inputValue);
            displayUpdatedLists(updatedRecipesList);
        }
        // Reset recipes list
        if (inputValue.length == 0) {
            resetButton.classList.add("opacity-0", "pointer-events-none");
            displayUpdatedLists();
        }
        resetButton.addEventListener('click', () => {
            resetButton.classList.add("opacity-0", "pointer-events-none");
            displayUpdatedLists();
        });
    });
}

export function displayUpdatedLists(updatedRecipesList = recipes) {
    displayRecipes(updatedRecipesList);
    displayFiltersLists(updatedRecipesList);
}

// Initial interactions
export function initInteractions() {
    setupFilterDropdownEvents();
    setupSearchbarKeydownEvents();
}