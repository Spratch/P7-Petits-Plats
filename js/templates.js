import { createDOMElement, toSentenceCase } from "./commons.js";

export function recipeTemplate(recipe = {}) {
    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipe;

    function getRecipeDOM() {
        const article = createDOMElement("article", { id: `recipe-${id}`, class: "rounded-3xl overflow-hidden bg-white w-full shadow-card" });
        
        const thumbnail = createDOMElement("div", { class: "w-full relative" });
        const imageElement = createDOMElement("img", { class: "aspect-[3/2] object-cover", src: `../assets/images/${image}`, alt: name });
        const timeElement = createDOMElement("span", { class: "absolute top-0 right-0 m-5 bg-yellow text-black py-1 px-4 text-xs rounded-xl" }, `${time} min`);
        thumbnail.append(imageElement, timeElement);

        const articleContent = createDOMElement("div", { class: "py-8 px-6 flex flex-col gap-7" });
        const titleElement = createDOMElement("h2", { class: "font-display text-lg" }, name);

        const contentContainer = createDOMElement("div", { class: "flex flex-col gap-8" });
        const recipeContainer = createDOMElement("div", { class: "flex flex-col gap-3.5" });
        const recipeH3 = createDOMElement("h3", { class: "uppercase text-grey text-xs font-bold tracking-wider" }, "Recette");
        const recipeInstructions = createDOMElement("p", { class: "text-sm" }, description);
        recipeContainer.append(recipeH3, recipeInstructions);

        const ingredientsContainer = createDOMElement("div", { class: "flex flex-col gap-3.5" });
        const ingredientsH3 = createDOMElement("h3", { class: "uppercase text-grey text-xs font-bold tracking-wider" }, "Ingrédients");
        const ingredientsList = createDOMElement("div", { class: "grid grid-cols-2 gap-y-5 text-sm" });
        ingredients.forEach((item) => {
            const ingredientName = createDOMElement("p", {}, item.ingredient);
            const ingredientQuantity = createDOMElement("p", { class: "text-grey" }, `${item.quantity || ''} ${item.unit || ''}`);
            const ingredientItem = createDOMElement("div", {});
            ingredientItem.append(ingredientName, ingredientQuantity);
            ingredientsList.append(ingredientItem);
        });
        ingredientsContainer.append(ingredientsH3, ingredientsList);

        contentContainer.append(recipeContainer, ingredientsContainer);
        articleContent.append(titleElement, contentContainer);

        article.append(thumbnail, articleContent);
        return article;
    }

    function getNoRecipeMessageDOM() {
        const emptyRecipeListSection = createDOMElement("section", { id: "no-recipe", class: "w-full h-full flex flex-col gap-7 items-center justify-center col-span-full pb"});
        const image = createDOMElement("img", { src: "./assets/icons/noResult.png", width: "75" });
        const message = createDOMElement("h2", { class: "font-display text-lg" }, "Aucun résultat pour cette recherche.");

        emptyRecipeListSection.append(image, message);
        return emptyRecipeListSection;
    }

    return { getRecipeDOM, getNoRecipeMessageDOM };
}

export function filtersTemplate(recipesList = recipes) {
    const ingredientsList = [... new Set(recipesList.map(recipe => recipe.ingredients.map(item => toSentenceCase(item.ingredient))).flat())];
    const appliancesList = [... new Set(recipesList.map(recipe => toSentenceCase(recipe.appliance)))];
    const ustensilsList = [... new Set(recipesList.map(recipe => recipe.ustensils.map(ustensil => toSentenceCase(ustensil))).flat())];

    function createListDOM(items, category, selectedFiltersIds = []) {
        return items.map(item => {
            const itemId = `${category}-${item.replace(/\s+/g, '-').toLowerCase()}`;
            const isChecked = selectedFiltersIds.includes(itemId);
            const input = createDOMElement("input", { 
                type: "checkbox", 
                id: itemId, 
                name: item, 
                class: "hidden peer",
            });
            if (isChecked) {
                input.setAttribute("checked", "true");
            }
            const label = createDOMElement("label", { 
                for: itemId, 
                class : "peer-checked:bg-yellow peer-checked:font-bold px-4 py-1.5 hover:bg-yellow block w-full cursor-pointer transition filter-item" 
            }, item);
            const filterCross = createDOMElement("img", { 
                src: "./assets/icons/checkedFilterCross.svg", 
                class: "absolute right-0 top-1/2 bottom-1/2 -translate-y-1/2 mx-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 group-hover:peer-checked:opacity-50 transition" 
            });
            const li = createDOMElement("li", { class: "group relative" });
            
            li.append(input, label, filterCross);
            return li;
            });
    }
    
    function getFilterListDOM(selectedFiltersList) {
        const selectedFiltersIds = selectedFiltersList.map((filter) => filter.filterId);
        const ingredientsListDOM = createListDOM(ingredientsList, "ingredient", selectedFiltersIds);
        const appliancesListDOM = createListDOM(appliancesList, "appliance", selectedFiltersIds);
        const ustensilsListDOM = createListDOM(ustensilsList, "ustensil", selectedFiltersIds);
    
        return { ingredientsListDOM, appliancesListDOM, ustensilsListDOM };
    }

    function getSelectedFilterDOM(selectedFilter) {
        const { filterName, filterId } = selectedFilter;

        const selectedFilterText = createDOMElement("p", {}, filterName);
        const filterCross = createDOMElement("img", { src: "./assets/icons/selectedFilterCross.svg", class: "group-hover:opacity-50 transition" });
        const selectedFilterDOM = createDOMElement("li", { class: "bg-yellow inline-flex p-4 rounded-xl items-center gap-14 cursor-pointer group selected-filter-item", "data-filter-id": filterId, "data-filter-name": filterName });
        
        selectedFilterDOM.append(selectedFilterText, filterCross);
        return selectedFilterDOM;
    }
    
    return { getFilterListDOM, getSelectedFilterDOM };
}