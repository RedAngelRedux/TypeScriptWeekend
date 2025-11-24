import { Category, isOrder, Product } from "./types.js"; // adjust import path as needed
import {Order, OrderItem} from "./types.js"

const CATALOG_KEY = "GalacticRelicsCatalog";
const TIMESTAMP_KEY = "GalacticRelicsCatalogTimestamp";
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const ORDERS_KEY = "orders";
const NULL_CATEGORY: Category = {
    id: 0,
    name: "",
    description: ""
};
const NULL_PRODUCT: Product = {
    id: 0,
    categoryId: 0,
    name: "",
    description: "",
    price: 0,
    cost: 0,
    image: "",
    category: NULL_CATEGORY
};
const NULL_ORDER: Order = {
    id: 0,
    customerId: 0,
    orderDate: "",
    shipDate: "",
    userId: 0,
    orderItems: []
}

const calculateCartTotal = (items: OrderItem[]): number =>
    items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

export function orderTotal(orderId: number): number {
    const order: Order = getOrderFromLocalStorage(orderId);
    if(order === undefined) {
        return 0;
    }

    return calculateCartTotal(order.orderItems);
}

export function storeCatalog(products: Product[]): void {
    const now = Date.now();

    // Get last timestamp
    const lastTimestampStr = localStorage.getItem(TIMESTAMP_KEY);
    const lastTimestamp = lastTimestampStr ? parseInt(lastTimestampStr, 10) : 0;

    const isExpired = !lastTimestamp || now - lastTimestamp > CACHE_DURATION_MS;

    if (isExpired) {
        // Clear old data
        localStorage.removeItem(CATALOG_KEY);
        localStorage.removeItem(TIMESTAMP_KEY);

        // Store new data
        localStorage.setItem(CATALOG_KEY, JSON.stringify(products));
        localStorage.setItem(TIMESTAMP_KEY, now.toString());
    }
}

export function getProductById(productId: number): Product {

    const catalogStr = localStorage.getItem(CATALOG_KEY);
    if (!catalogStr) {
        throw new Error("Catalog not found");
    }

    try {
        const products: Product[] = JSON.parse(catalogStr);
        const product = products.find(p => p.id === productId);
        return (product === undefined) ? NULL_PRODUCT : product;        
    } catch (err) {
        console.error("Failed to parse catalog from localStorage:", err);
        return NULL_PRODUCT;
    }
}

function getNextOrderId(): number {
    const key = "orderCounter";
    const current = localStorage.getItem(key);

    let nextId = current ? parseInt(current, 10) + 1 : 1;

    localStorage.setItem(key, nextId.toString());
    return nextId;
}

function createNewOrder(newItem: OrderItem): Order {
    const newOrder: Order = {
        //id: getNextOrderId(),   // auto-increment ID
        id: 1,   // TODO:  Replace with working Order Id auto-increment
        customerId: 0,          // fill in as needed
        orderDate: new Date().toISOString(),
        shipDate: "",
        userId: 0,
        orderItems: [newItem],
    };

    return newOrder;
}

export function addOrderItemToLocalStorage(orderId: number | null, newItem: OrderItem): void {
    const existing = localStorage.getItem(ORDERS_KEY);
    let orders: Order[] = existing ? JSON.parse(existing) : [];

    let order: Order | undefined;

    if (orderId !== null) {
        order = orders.find(o => o.id === orderId);
    }

    if (order !== undefined && isOrder(order)) {
        const existingItem = order.orderItems.find(item => item.productId === newItem.productId);        
        if (existingItem) {
            existingItem.quantity += newItem.quantity;
        } else {
            newItem.id = order.orderItems.length + 1;
            order.orderItems.push(newItem);
        }
    } else {
        newItem.orderId = 1;  // Since this is a new order, this item will be the first line-item
        const newOrder = createNewOrder(newItem);
        orders.push(newOrder);
    }

    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrderFromLocalStorage(orderId: number | null): Order {
    const exiting = localStorage.getItem(ORDERS_KEY);
    let orders: Order[] = exiting ? JSON.parse(exiting) : [];

    let order: Order | undefined;
    if(orderId !== null) {
        order = orders.find(o => o.id === orderId);
        order = (order === undefined || !isOrder(order)) ? NULL_ORDER : order;    
    }
    else {
        order = NULL_ORDER;
    }

    return order;
}