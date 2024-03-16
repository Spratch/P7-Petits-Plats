import { toggleDropdownClasses, toggleFilter, toggleFilterDropdown } from "./filters.js";
import { displayUpdatedLists, filterFiltersFromSearch, filterFromSearchbar, resetFilterSearch } from "./filters/index.js";

// Click listener on filter list dropdown buttons
function setupFilterDropdownEvents() {
    document.querySelectorAll(".filter-button").forEach((button) => {
        button.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            toggleFilterDropdown(category);
        });
    });
}

let filterSelectorListeners = {};
// Click listener on dropdown filter list items
export function setupFilterItemEvents() {
    document.querySelectorAll(".filter-item").forEach((label) => {
        const itemName = label.textContent;
        const itemId = label.getAttribute("for");

        label.addEventListener('click', () => {
            toggleFilter(itemName, itemId, true) 
        });
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

// Reset buttons
function setupResetButtonsEvents(input, resetButton) {
    const inputValue = input.value;

    // Displays cross
    if (inputValue.length >= 1) {
        resetButton.classList.remove("opacity-0", "pointer-events-none");
    }
    // Reset recipes list
    if (inputValue.length == 0) {
        resetInput();
    }
    resetButton.addEventListener('click', resetInput);

    function resetInput() {
        resetButton.classList.add("opacity-0", "pointer-events-none");
        if (input.id == "searchbar") {
            displayUpdatedLists();
        } else {
            const filterType = input.id.split("-")[0];
            const filtersList = document.querySelector(`#dropdown-${filterType} ul`);
            const filtersItems = Array.from(filtersList.getElementsByTagName("li"));        
            resetFilterSearch(filtersItems);
        }
    }
}

// Keydown listener in main searchbar
function setupMainSearchbarEvents() {
    const searchbarInput = document.getElementById("searchbar");
    const resetButton = document.getElementById("main-reset");

    searchbarInput.addEventListener('input', () => {
        setupResetButtonsEvents(searchbarInput, resetButton);

        // Updates recipes and filters lists
        const inputValue = searchbarInput.value;
        const minimumValueLength = 3;
        if (inputValue.length >= minimumValueLength) {
            const updatedRecipesList = filterFromSearchbar(inputValue);
            displayUpdatedLists(updatedRecipesList);
        }
    });
}

function setupFilterSearchEvents() {
    const filterTypes = ["ingredients", "appliances", "ustensils"];
    filterTypes.forEach((filterType) => {
        const searchInput = document.getElementById(`${filterType}-search`);
        const resetButton = document.getElementById(`${filterType}-reset`);
        const filtersList = document.querySelector(`#dropdown-${filterType} ul`);

        searchInput.addEventListener('input', () => {
            setupResetButtonsEvents(searchInput, resetButton);

            // Updates filter list
            const inputValue = searchInput.value;
            const minimumValueLength = 3;
            if (inputValue.length >= minimumValueLength) {
                const filtersItems = Array.from(filtersList.getElementsByTagName("li"));
                filterFiltersFromSearch(inputValue, filtersItems);
            }
        });
    });
}


// Initial interactions
export function initInteractions() {
    setupFilterDropdownEvents();
    setupMainSearchbarEvents();
    setupFilterSearchEvents();
}