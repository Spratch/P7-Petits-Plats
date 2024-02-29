function recipeTemplate(recipe) {
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
        const recipeContainer = createDOMElement("div", { class: "flex flex-col gap-3.5"});
        const recipeH3 = createDOMElement("h3", { class: "uppercase text-grey text-xs font-bold tracking-wider"}, "Recette");
        const recipeInstructions = createDOMElement("p", { class: "text-sm"}, description);
        recipeContainer.append(recipeH3, recipeInstructions);

        const ingredientsContainer = createDOMElement("div", { class: "flex flex-col gap-3.5"});
        const ingredientsH3 = createDOMElement("h3", { class: "uppercase text-grey text-xs font-bold tracking-wider"}, "Ingrédients");
        const ingredientsList = createDOMElement("div", { class: "grid grid-cols-2 gap-y-5 text-sm" });
        ingredients.forEach((item) => {
            const ingredientName = createDOMElement("p", {}, item.ingredient);
            const ingredientQuantity = createDOMElement("p", { class: "text-grey"}, `${item.quantity || ''} ${item.unit || ''}`);
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

    return { getRecipeDOM };
}