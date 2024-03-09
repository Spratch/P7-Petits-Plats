export function filterFromSearchbar(inputValueSource) {
    const inputValue = inputValueSource.toLowerCase();

    const checkName = (name) => name.toLowerCase().includes(inputValue);
    const checkSomeIngredient = (ingredients) => ingredients.some(item => item.ingredient.toLowerCase().includes(inputValue));
    const checkDescription = (description) => description.toLowerCase().includes(inputValue);

    const updatedRecipesList = recipes.filter((recipe) => checkName(recipe.name) || checkSomeIngredient(recipe.ingredients) || checkDescription(recipe.description));

    return updatedRecipesList;
}