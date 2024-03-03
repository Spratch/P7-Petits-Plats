function toggleDropdownClasses(button) {
    const dropdown = button.querySelector("[id^='dropdown-']");
    const chevron = button.querySelector("svg");

    button.classList.toggle("rounded-xl");
    button.classList.toggle("rounded-t-xl");
    dropdown.classList.toggle("hidden");
    dropdown.classList.toggle("flex");
    chevron.classList.toggle("rotate-180");
}

function toggleFilterDropdown(category) {
    const button = document.getElementById(`sort-button-${category}`);

    // Closes other dropdowns
    if (button.classList.contains("rounded-xl")) {
        const otherButtons = document.querySelectorAll(`[id^='sort-button-']:not(#sort-button-${category})`);
        otherButtons.forEach((otherButton) => {
            // selects only oppened dropdowns
            if (otherButton.classList.contains("rounded-t-xl")) {
                toggleDropdownClasses(otherButton);
            }
        });
    }

    toggleDropdownClasses(button);
}

function displayRecipes(){
    const recipesGrid = document.getElementById("recipes-grid")

    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const article = recipeModel.getRecipeDOM();

        recipesGrid.append(article);
    });
}

function displayFilters() {
    const ulIngredients = document.querySelector("#dropdown-ingredients ul");
    const ulAppliances = document.querySelector("#dropdown-appliances ul");
    const ulUstensils = document.querySelector("#dropdown-ustensils ul");

    const { ingredientsListDOM, appliancesListDOM, ustensilsListDOM } = filtersTemplate().getFilterListDOM();

    ingredientsListDOM.forEach((li) => {
        ulIngredients.append(li);
    });

    appliancesListDOM.forEach((li) => {
        ulAppliances.append(li);
    });
    ustensilsListDOM.forEach((li) => {
        ulUstensils.append(li);
    });
}

let selectedFiltersList = [];

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
    console.log(selectedFiltersList);
}

function unselectFilter(filterToRemove) {
    selectedFiltersList = selectedFiltersList.filter(item => item !== filterToRemove);
    displaySelectedFilters();
}

function selectFilter(filterToAdd) {
    selectedFiltersList.push(filterToAdd);
    displaySelectedFilters();
}

function toggleFilter(filterToToggle, fromCheckbox) {
    const checkedFilter = document.getElementById(filterToToggle);
    const isChecked = checkedFilter.checked;
    
    if (isChecked) {
        unselectFilter(filterToToggle);
        
        if (!fromCheckbox) {
            checkedFilter.checked = false;
        }
    } else {
        selectFilter(filterToToggle);
    }
}


function init() {
    setTimeout(() => {
        displayRecipes();
        displayFilters();
    }, 1);
}

init()