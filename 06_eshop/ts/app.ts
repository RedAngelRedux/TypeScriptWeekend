import {type Product, type OrderItem, type Order} from "./types.js";
import { fetchProducts, unwrapResult } from "./relics-api.js";
import { addOrderItemToLocalStorage, getOrderFromLocalStorage, getProductById, storeCatalog } from "./local-storage.js";

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
    const button = productCard.querySelector<HTMLButtonElement>("button");

    if(!name || !description || !price  || !button
        || (image instanceof HTMLImageElement === false)) {
        throw new Error("Product Card Template is missing the required elements");
    }

    image.src = product.image;
    name.textContent = product.name;
    description.textContent = product.description;
    price.textContent = currencyFormatter.format(product.price);
    button.addEventListener("click", () => addToCart(product.id));

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

        // TODO:  Replace LocalStorage with Database persistence
        // Cache the Products in Local Storage for easy reference later
        storeCatalog(products);


        const productCards = products.map(p => createProductCard(p));        

        productsContainer.innerHTML = "";
        productsContainer.append(...productCards);

    } catch (err) {
        console.error(err);
        renderErrorMessage(err);
    }
}

async function renderCartItems(): Promise<void> {
    try {
        const order: Order | undefined = getOrderFromLocalStorage(1);
        if(order !== undefined) {
            //console.log(JSON.stringify(order.orderItems,null,2));
            //console.log(`The next line item should be ${order.orderItems.lastIndexOf});
        }        
    } catch (err) {
        console.error(err);
        renderErrorMessage(err);
    }
}

/*
<template id="cart-item-template">
<div class="cart-item">
    <p class="name">Product Name</p>
    <p class="price">
    <span class="qty">1</span> x <span class="cost">$0.00</span>
    <button class="remove-btn" title="Remove item from cart">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
    </button>
    </p>
</div>
</template>
*/


async function addToCart(productId: number): Promise<void> {
    
    const product = getProductById(productId); 
    
    let item: OrderItem = {
        id: 1,
        orderId: 1,
        productId: productId,
        quantity: 1,
        product: product 
    }

    addOrderItemToLocalStorage(1,item);

    renderCartItems();
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
