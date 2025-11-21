import {type Product} from "./types.js";
import { fetchProducts, unwrapResult } from "./relics-api.js";

const currencyFormatter = new Intl.NumberFormat("en-us",{
    style: "currency",
    currency: "USD",
});

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

document.addEventListener("DOMContentLoaded",() => {
    renderProductList();
});

function createProductCard(product: Product): DocumentFragment {

    const template = document.getElementById("product-card-template");
    if(template instanceof HTMLTemplateElement === false) {
        throw new Error("Could not fine Product Card Template!");
    }

    const productCard = template.content.cloneNode(true);
    if(productCard instanceof DocumentFragment === false) {
        throw new Error("Invalid Product Card Template found!");
    }

    const image = productCard.querySelector(".image");
    const name = productCard.querySelector(".name");
    const description = productCard.querySelector(".description");
    const price = productCard.querySelector(".price");

    if(!name || !description || !price || (image instanceof HTMLImageElement === false)) {
        throw new Error("Product Card Template is missing the required elements");
    }

    image.src = product.image;
    name.textContent = product.name;
    description.textContent = product.description;
    price.textContent = currencyFormatter.format(product.price);

    return productCard;
}

async function renderProductList(): Promise<void> {
    try {
        // Find the elemnet that will hold the product cards
        const productsContainer = document.getElementById("shop-items");
        if(!productsContainer) {
            throw new Error("Could not find product's container!");
        }

        // Fetch the products
        const products: Array<Product> = 
            unwrapResult(await fetchProducts({pageSize: 50})).data;

        const productCards = products.map(p => createProductCard(p));        

        productsContainer.innerHTML = "";
        productsContainer.append(...productCards);

    } catch (error) {
        console.error(error);
        renderErrorMessage(error);
    }
}

// create a shopping cart stored in local storage
// create shopping cart elements for each item in the shopping cart
// track the dollar total for each item in the cart

// // BEGIN TESST CODE BLOCK
// // create product cards for each product and add to the page
// async function loadProducts() {

//     try {
    
//     //throw new Error("Oops!  I did it again."); // For testing global error handling

//     const productPage = unwrapResult(await fetchProducts({pageSize: 50}));

//     const container = document.getElementById('shop-items');
//     if (!container) {
//         throw new Error("Element with ID 'shop-items' not found.");
//     }

//     container.innerHTML = ''; // Clear previous content

//     productPage.data.forEach(product => {
//         const div = document.createElement('div');
//         div.className = 'product';
//         div.innerHTML = `
//         <img src="${product.image}" alt="${product.name}" />
//         <strong>${product.name}</strong> - $${product.price.toFixed(2)}<br/>
//         <em>${product.category.name}</em><br/>
//         ${product.description}
//         `;
//         container.appendChild(div);
//     }); 
//     } catch(err) {
//         const message = err instanceof Error ? err.message : String(err);
//         throw new Error(message);
//     }
// }
// The following are different ways to call top-level asynchronous methods
// // Method One
// loadProducts().then(p => console.log(p));
// // Method Two
// (async () => {

//     // // My Test Using loadProducts()
//     // const result = await loadProducts();

//     const productPage = unwrapResult(await fetchProducts({pageSize: 50}));
//     console.log(productPage!.data);
// })();

// // fetch product data
// let products: Array<Product>;
// (async () => {
//     const productPage = unwrapResult(await fetchProducts({pageSize: 50}));
//     products = productPage.data;
// })().then(() => console.log(products)).catch();

// // END TEST CODE BLOCK
