function openFilterDropdown(category) {
    const button = document.querySelector(`#sort-button-${category}`);
    const dropdown = document.querySelector(`#dropdown-${category}`);
    const chevron = button.querySelector("svg");

    button.classList.toggle("rounded-xl");
    button.classList.toggle("rounded-t-xl");
    dropdown.classList.toggle("hidden");
    dropdown.classList.toggle("flex");
    chevron.classList.toggle("rotate-180");


}