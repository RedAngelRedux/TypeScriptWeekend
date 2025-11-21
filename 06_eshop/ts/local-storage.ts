import { Product } from "./types.js"; // adjust import path as needed
import {Order, OrderItem} from "./types.js"

const CATALOG_KEY = "GalacticRelicsCatalog";
const TIMESTAMP_KEY = "GalacticRelicsCatalogTimestamp";
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const ORDERS_KEY = "orders";

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

export function getProductById(productId: number): Product | {} {
    const catalogStr = localStorage.getItem(CATALOG_KEY);
    if (!catalogStr) {
        return {}; // Catalog not found
    }

    try {
        const products: Product[] = JSON.parse(catalogStr);
        const product = products.find(p => p.id === productId);
        return product ?? {};
    } catch (err) {
        console.error("Failed to parse catalog from localStorage:", err);
        return {};
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
        id: 1,   // TODO:  Replace with actual code
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

    if (order) {
        const existingItem = order.orderItems.find(item => item.productId === newItem.productId);
    if (existingItem) {
        existingItem.quantity += newItem.quantity;
    } else {
        order.orderItems.push(newItem);
    }
    } else {
        const newOrder = createNewOrder(newItem);
        orders.push(newOrder);
    }

    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrderFromLocalStorage(orderId: number | null): Order | undefined {
    const exiting = localStorage.getItem(ORDERS_KEY);
    let orders: Order[] = exiting ? JSON.parse(exiting) : [];

    let order: Order | undefined;
    if(orderId !== null) {
        order = orders.find(o => o.id === orderId);
    }
    else {
        order === undefined;
    }

    return order;
}