import { recipeTemplate } from "./templates.js";

export function displayRecipes(){
    const recipesGrid = document.getElementById("recipes-grid")

    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const article = recipeModel.getRecipeDOM();

        recipesGrid.append(article);
    });
}
