import { toggleDropdownClasses, toggleFilter, toggleFilterDropdown } from "./filters.js";

// Click listener on filter list dropdown buttons
function setupFilterDropdownEvents() {
    document.querySelectorAll(".filter-button").forEach((button) => {
        button.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            toggleFilterDropdown(category);
        });
    });
}

// Click listener on dropdown filter list items
function setupFilterItemEvents() {
    document.querySelectorAll(".filter-item").forEach((label) => {
        const itemValue = label.getAttribute("for");
        label.addEventListener('click', () => toggleFilter(itemValue, true));
    });
}

// Click listener on selecter filter list items
export function setupSelectedFilterItemEvents() {
    document.querySelectorAll(".selected-filter-item").forEach((item) => {
        const itemValue = item.dataset.filter;
        item.addEventListener('click', () => toggleFilter(itemValue, false));
    });
}

// Closes opened dropdown if user click outside
export function closeDropdownsOnClickOutside(event) {
    const dropdownButtons = document.querySelectorAll("[id^='sort-button-']");
    if (!event.target.closest(".filter-button") && !event.target.closest(".dropdown-content")) {
        dropdownButtons.forEach((button) => {
            if (button.classList.contains("rounded-t-xl")) {
                toggleDropdownClasses(button);
            }
        });
    }
}

// Closes opened dropdown if user press escape
export function closeDropdownsOnEscape(event) {
    if (event.key === "Escape") {
        document.querySelectorAll("[id^='sort-button-']").forEach((button) => {
            if (button.classList.contains("rounded-t-xl")) {
                toggleDropdownClasses(button);
            }
        });
    }
}

// Initial interactions
export function initInteractions() {
    setupFilterDropdownEvents();
    setupFilterItemEvents();
}