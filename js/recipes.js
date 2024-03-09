import { recipeTemplate } from "./templates.js";

export function displayRecipes(recipesList = recipes){
    const recipesGrid = document.getElementById("recipes-grid")
    recipesGrid.innerHTML = '';
    
    recipesList.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const article = recipeModel.getRecipeDOM();

        recipesGrid.append(article);
    });
}
