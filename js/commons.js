/**
 * Creates a new DOM element with specified tag, attributes, and text content.
 * 
 * @param {string} tag - The type of element to create (e.g., 'div', 'img').
 * @param {Object} attributes - An object containing attribute-value pairs to set on the element.
 * @param {string} [textContent] - Optional text content for the element.
 * @returns {HTMLElement} The newly created DOM element.
 */
export function createDOMElement(tag, attributes = {}, textContent) {
	// Tag
	const element = document.createElement(tag);
	// Attributes
	for (const [key, value] of Object.entries(attributes)) {
		element.setAttribute(key, value);
	}
	// Text
	if (textContent) {
		element.textContent = textContent;
	}

	return element;
}
