export function filterFiltersFromSearch(inputValueSource, filtersItems) {
    const inputValue = inputValueSource.toLowerCase();
    
    const checkName = (name) => name.toLowerCase().includes(inputValue);

    filtersItems.forEach((listItem) => {
        if (checkName(listItem.textContent)) {
            listItem.style.display = ""
        } else {
            listItem.style.display = "none"
        }
    });
    // return filtersItems
    //     .filter((listItem) => checkName(listItem.innerHTML))
    //     .map((listItem) => listItem.outerHTML)
    //     .join('');
}

export function resetFilterSearch(filtersItems) {
    filtersItems.forEach((listItem) => {
        listItem.style.display = "";
    });
}