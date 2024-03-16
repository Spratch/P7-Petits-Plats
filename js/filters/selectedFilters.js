export function filterFromSelectedFilters(selectedFiltersList) {
    
    let updatedRecipesList = recipes;
    selectedFiltersList.forEach((filterObj) => {
        const filterType = filterObj.filterId.split("-")[0];
        const filterName = filterObj.filterName.toLowerCase();

        updatedRecipesList = updatedRecipesList.filter((recipe) => {
            switch (filterType) {
                case "ingredient":
                    return recipe.ingredients.some(item => item.ingredient.toLowerCase().includes(filterName));
                    break;
                case "appliance":
                    return recipe.appliance.toLowerCase() === filterName;
                    break;            
                case "ustensil":
                    return recipe.ustensils.some(item => item.toLowerCase().includes(filterName));
                    break;
                default:
                    return true;
                    break;
            }
        });
    });
    console.log(updatedRecipesList);
    return updatedRecipesList;
}