import {type PagedResponse, type Product, type FetchProductsParams, type Result} from "./types.js"

const BASE_URL = 'https://galacticrelics.coderfoundry.com';
const API_URL = `${BASE_URL}/api`;
const PRODUCTS_URL = `${API_URL}/Products`;
const PRODUCT_IMAGE_URL = `${BASE_URL}/images/Products`;



export function unwrapResult<T>(result: Result<T>): T {
    if (!result.success) {
        throw new Error(result.error);
    }
    return result.value;
}

// get product data from galactic relics api
export async function fetchProducts(params: FetchProductsParams = {}): Promise<Result<PagedResponse<Product>>> {

    const { page = 1, pageSize, categoryId } = params;
    const baseUrl = PRODUCTS_URL;
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

        const productPage = await response.json() as PagedResponse<Product>;
        // TODO:  Write a type predicate function to validate the response

        // Add required prefix to impage path so consumers don't need to worry about it
        productPage.data.map(p => p.image = `${PRODUCT_IMAGE_URL}/${p.image}`);

        return {
            success: true,
            value: productPage,
        };

    } catch (error) {

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
}

