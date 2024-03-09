import { closeDropdownsOnClickOutside, closeDropdownsOnEscape, setupFilterItemEvents, setupSelectedFilterItemEvents } from "./interactions.js";
import { filtersTemplate } from "./templates.js";

let selectedFiltersList = [];

// Filters selection handling functions
function displaySelectedFilters() {
    const selectedFiltersUl = document.getElementById("selected-filters");
    
    selectedFiltersUl.innerHTML = '';

    if (selectedFiltersList.length > 0) {
        selectedFiltersUl.classList.remove("hidden");
        selectedFiltersUl.classList.add("flex");
        
        selectedFiltersList.forEach((selectedFilter) => {
            const selectedFilterDOM = filtersTemplate().getSelectedFilterDOM(selectedFilter);
            selectedFiltersUl.append(selectedFilterDOM);
        });
    } else {
        selectedFiltersUl.classList.add("hidden");
        selectedFiltersUl.classList.remove("flex");
    }
    setupSelectedFilterItemEvents();
}

function unselectFilter(filterToRemove) {
    selectedFiltersList = selectedFiltersList.filter(item => item.filterId !== filterToRemove.filterId);
    displaySelectedFilters();
}

function selectFilter(filterToAdd) {
    selectedFiltersList.push(filterToAdd);
    displaySelectedFilters();
}

export function toggleFilter(filterName, filterId, fromCheckbox) {
    const checkedFilter = document.getElementById(filterId);
    const isChecked = checkedFilter.checked;
    const filterToToggle = { filterName, filterId };
    console.log("toggleFilter", filterToToggle);
    if (isChecked) {
        unselectFilter(filterToToggle);
        
        if (!fromCheckbox) {
            checkedFilter.checked = false;
        }
    } else {
        selectFilter(filterToToggle);
    }
}

// Filters dropdowns handling functions
export function toggleDropdownClasses(button) {
    const dropdown = button.querySelector("[id^='dropdown-']");
    const chevron = button.querySelector("svg");

    button.classList.toggle("rounded-xl");
    button.classList.toggle("rounded-t-xl");
    dropdown.classList.toggle("hidden");
    dropdown.classList.toggle("flex");
    chevron.classList.toggle("rotate-180");
}

export function toggleFilterDropdown(category) {
    const button = document.getElementById(`sort-button-${category}`);

    // Closes other dropdowns
    if (button.classList.contains("rounded-xl")) {
        const otherButtons = document.querySelectorAll(`[id^='sort-button-']:not(#sort-button-${category})`);
        otherButtons.forEach((otherButton) => {
            // Selects only oppened dropdowns
            if (otherButton.classList.contains("rounded-t-xl")) {
                toggleDropdownClasses(otherButton);
            }
        });
    }

    // Opens clicked dropdown
    toggleDropdownClasses(button);

    // Closes dropdown if user click elsewhere or press escape
    document.addEventListener('click', closeDropdownsOnClickOutside);
    document.addEventListener('keydown', closeDropdownsOnEscape);
}

export function displayFiltersLists(recipesList = recipes) {
    const ulIngredients = document.querySelector("#dropdown-ingredients ul");
    const ulAppliances = document.querySelector("#dropdown-appliances ul");
    const ulUstensils = document.querySelector("#dropdown-ustensils ul");
    ulIngredients.innerHTML = '';
    ulAppliances.innerHTML = '';
    ulUstensils.innerHTML = '';

    const { ingredientsListDOM, appliancesListDOM, ustensilsListDOM } = filtersTemplate(recipesList).getFilterListDOM(selectedFiltersList);

    ingredientsListDOM.forEach((li) => {
        ulIngredients.append(li);
    });
    appliancesListDOM.forEach((li) => {
        ulAppliances.append(li);
    });
    ustensilsListDOM.forEach((li) => {
        ulUstensils.append(li);
    });

    setupFilterItemEvents();
}
