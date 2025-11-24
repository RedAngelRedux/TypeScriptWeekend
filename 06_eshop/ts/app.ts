import {type Product, type OrderItem, type Order} from "./types.js";
import { fetchProducts, unwrapResult } from "./relics-api.js";
import { addOrderItemToLocalStorage, getOrderFromLocalStorage, getProductById, storeCatalog, orderTotal } from "./local-storage.js";

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

// Populate main section with store products using API, after the page is loaded
document.addEventListener("DOMContentLoaded",() => {
    renderProductList();
    renderCartItems();
});

function createProductCard(product: Product): DocumentFragment {

    const template = document.getElementById("product-card-template");
    if(template instanceof HTMLTemplateElement === false) {
        throw new Error("Could not find Product Card Template!");
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

// create a shopping cart stored in local storage
async function addToCart(productId: number): Promise<void> {

    console.log("addToCart Click Detected");
    
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

// create shopping cart elements for each item in the shopping cart
function createCartItemCards(lineItem: OrderItem): DocumentFragment {

    const template = document.getElementById("cart-item-template");
    if(template instanceof HTMLTemplateElement === false) {
        throw new Error("Cound not find a cart item template. ");
    }

    const cartItemCard = template.content.cloneNode(true);
    if(cartItemCard instanceof DocumentFragment === false) {
        throw new Error("Invalid Cart Item Card");
    }

    const name = cartItemCard.querySelector(".name");
    const qty = cartItemCard.querySelector(".qty");
    const cost = cartItemCard.querySelector(".cost");
    const removeBtn = cartItemCard.querySelector<HTMLButtonElement>(".remove-btn");

    if(!name || !qty || !cost || !removeBtn) {
        throw new Error("Shopping cart Template is missing the required elements");
    }

    name.textContent =  lineItem.product.name;
    qty.textContent = lineItem.quantity.toString();
    cost.textContent = currencyFormatter.format(lineItem.product.price);
    removeBtn.addEventListener("click",() => alert(`Delete ${lineItem.productId}?`));
    
    return cartItemCard;
}

// TODO:  Retrieve From a Database
function renderCartItems(): void {
    try {

        const cartContainer = document.getElementById("cart-items");
        if(!cartContainer) {
            throw new Error("Could not fine cart's container");
        }

        // Fetch the Order
        const order: Order = getOrderFromLocalStorage(1);  // TODO:  Get actual order, not default to "1"
        if(order.id === 0) {
            console.log("Unable to fetch order from local storage");
            return;
        }

        // Fetch the Line Items aka OrderItems
        const orderItems : Array<OrderItem> = order.orderItems;

        const cartItemCards = orderItems.map(li => createCartItemCards(li));

        cartContainer.innerHTML = "";
        cartContainer.append(...cartItemCards);

        updateShoppingCartTotal(1);

    } catch (err) {

        console.error(err);
        renderErrorMessage(err);

    }
}

// track the dollar total for each item in the cart
function updateShoppingCartTotal(orderId: number): void {
    const cartTotal = document.getElementById("cart-total");
    if(cartTotal instanceof HTMLElement === false) {
        throw new Error("Could not find cart-total element");
    }

    cartTotal.innerHTML = "";
    cartTotal.innerHTML = currencyFormatter.format(orderTotal(orderId));
}

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
