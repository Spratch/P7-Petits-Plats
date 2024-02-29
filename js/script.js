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
    const button = document.querySelector(`#sort-button-${category}`);

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
    const recipesGrid = document.querySelector("#recipes-grid")

    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const article = recipeModel.getRecipeDOM();

        recipesGrid.append(article);
    });
}

function init() {
    setTimeout(() => {
        displayRecipes();
    }, 1);
}

init()