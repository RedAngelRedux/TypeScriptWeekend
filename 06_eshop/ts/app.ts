import {type Page, type Product, type FetchProductsParams, type Result} from "./types.js"

// Basic Error Handling for the Page
function renderErrorMessage(message:any) {
    document.body.innerHTML = `
        <div class="error-message">
            <h1>Oops!  Something went wrong</h1>
            <p>We're having trouble loading the projects.  Please try again later</p>
            <pre style="color: red;">${message}</pre>
        </div>
    `
}
window.onerror = function (message, source, lineno, colno, error) {
    const errorMsg = error?.message || message;
    renderErrorMessage(errorMsg);
};

window.onunhandledrejection = function (event) {
    const errorMsg = event.reason?.message || event.reason || 'Unknown rejection';
    renderErrorMessage(errorMsg);
};

export function unwrapResult<T>(result: Result<T>): T {
    if (!result.success) {
        throw new Error(result.error);
    }
    return result.value;
}

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