import { recipeTemplate } from "./templates.js";

export function displayRecipes(recipesList = recipes){
    const recipesGrid = document.getElementById("recipes-grid")
    recipesGrid.innerHTML = '';
    
    recipesList.forEach((recipe) => {
        const article = recipeTemplate(recipe).getRecipeDOM();

        recipesGrid.append(article);
    });

    // Message for empty list
    if (recipesList.length == 0) {
        const noRecipeMessageDOM = recipeTemplate().getNoRecipeMessageDOM();

        recipesGrid.append(noRecipeMessageDOM);
    }

    // Display total recipes number
    const recipesNumber = document.getElementById("recipes-number");
    recipesNumber.innerText = `${recipesList.length} recettes`;
}
