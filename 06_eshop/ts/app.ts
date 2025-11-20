import {type Page, type Product, type FetchProductsParams, type Result} from "./types.js"

// Basic Error Handling for the Page
function renderErrorMessage() {
    document.body.innerHTML = `
        <div class="error-message">
            <h1>Oops!  Something went wrong</h1>
            <p>We're having trouble loading the projects.  Please try again later</p>
        </div>
    `
}
window.onerror = renderErrorMessage; // for sync JS
window.onunhandledrejection = renderErrorMessage; // for async JS
//throw new Error("Oops!  I did it again.");

// get product data from galactic relics api
export async function fetchProducts(params: FetchProductsParams = {}): Promise<Result<Page<Product>>> {

    const { page = 1, pageSize, categoryId } = params;
    const baseUrl = 'https://galacticrelics.coderfoundry.com/api/Products';
    const query = new URLSearchParams({ page: page.toString() });

    if (pageSize !== undefined) {
        query.append('pageSize', pageSize.toString());
    }

    if (categoryId !== undefined) {
        query.append('categoryId', categoryId.toString());
    }

    const url = `${baseUrl}?${query.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return {
                success: false,
                error: `HTTP error! Status: ${response.status}`,
            };
        }

        const data: Page<Product> = await response.json();
        return {
            success: true,
            value: data,
        };
    } catch (error) {
    return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
    }
}

// create product cards for each product and add to the page

// create a shopping cart stored in local storage
// create shopping cart elements for each item in the shopping cart
// track the dollar total for each item in the cart