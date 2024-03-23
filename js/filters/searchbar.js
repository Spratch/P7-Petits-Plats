export function filterFromSearchbar(inputValueSource, currentRecipesList) {
    const inputValue = inputValueSource.toLowerCase();

    const checkName = (name) => name.toLowerCase().includes(inputValue);
    const checkSomeIngredient = (ingredients) => ingredients.some(item => item.ingredient.toLowerCase().includes(inputValue));
    const checkDescription = (description) => description.toLowerCase().includes(inputValue);

    const updatedRecipesList = currentRecipesList.filter((recipe) => checkName(recipe.name) || checkSomeIngredient(recipe.ingredients) || checkDescription(recipe.description));

    return updatedRecipesList;
}