export function filterFromSelectedFilters(selectedFiltersList) {
    
    let updatedRecipesList = recipes;
    selectedFiltersList.forEach((filterObj) => {
        const filterType = filterObj.filterId.split("-")[0];
        const filterName = filterObj.filterName.toLowerCase();

        updatedRecipesList = updatedRecipesList.filter((recipe) => {
            switch (filterType) {
                case "ingredients":
                    return recipe.ingredients.some(item => item.ingredient.toLowerCase() === filterName);
                case "appliances":
                    return recipe.appliance.toLowerCase() === filterName;
                case "ustensils":
                    return recipe.ustensils.some(item => item.toLowerCase() === filterName);
                default:
                    return false;
            }
        });
    });
    console.log(updatedRecipesList);
    return updatedRecipesList;
}