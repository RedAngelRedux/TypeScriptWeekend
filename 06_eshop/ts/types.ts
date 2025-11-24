export type PagedResponse<Tdata extends object> = {
    page: number;
    totalPages: number;
    totalItems: number;
    data: Array<Tdata>;
}

export type Product = {
    id: number;
    categoryId: number;
    name: string;
    description: string;
    price: number;
    cost: number;
    image: string;
    category: Category;
}

export type Category = {
    id: number;
    name: string;
    description: string;
}

export type FetchProductsParams = {
    page?: number;
    pageSize?: number;
    categoryId?: number;
};

export type OrderItem = {
    id: number,
    orderId: number,
    productId: number,
    quantity: number,
    product: Product,
}

export type Order = {
    id: number,
    customerId: number,
    orderDate: string,
    shipDate: string,
    userId: number,
    orderItems: Array<OrderItem> 
    // customer: Array<object>,
    // user: object,
}

// These is a 'type predicate'
export function isOrderItem(value: unknown): value is OrderItem {
    return (
        value != null
        && typeof value === 'object'
        && 'id' in value
        && typeof value.id === 'number'
        && 'orderId' in value
        && typeof value.orderId === 'number'
        && 'productId' in value
        && typeof value.productId === 'number'
        && 'quantity' in value
        && typeof value.quantity === 'number'
        && 'product' in value
        && isProduct(value.product)
    );
}

export function isOrder(value: unknown): value is Order {
    return(
        value != null
        && typeof value === 'object'
        && 'id' in value
        && typeof value.id === 'number'
        && 'customerId' in  value
        && typeof value.customerId === 'number'
        && 'orderDate' in value
        && typeof value.orderDate === 'string'
        && 'shipDate' in value
        && typeof value.shipDate === 'string'
        && 'userId' in value
        && typeof value.userId === 'number'
        && 'orderItems' in value
        && Array.isArray(value.orderItems) 
        && (value as any).orderItems.every(isOrderItem)
    );
}

export function isCategory(value: unknown): value is Category {
    return (
        value != null
        && typeof value === 'object'
        && 'id' in value
        && typeof value.id === 'number'
        && 'name' in value
        && typeof value.name === 'string'
        && 'description' in value
        && typeof value.description === 'string'
    );
}

export function isProduct(value: unknown): value is Product {

    return (
        value != null
        && typeof value === 'object'
        && 'id' in value
        && typeof value.id === 'number'
        && 'categoryId' in value
        && typeof value.categoryId === 'number'
        && 'name' in value
        && typeof value.name === 'string'
        && 'description' in value
        && typeof value.description === 'string'
        && 'price' in value
        && typeof value.price === 'number'
        && 'cost' in value
        && typeof value.cost === 'number'
        && 'image' in value
        && typeof value.image === 'string'
        && 'category' in value
        && isCategory(value.category)
    );
}


/* JSON for OrdersResponse
{ 
    "page": 0,
    "totalPages": 0,
    "totalItems": 0,
    "data": [
    {
        "id": 0,
        "customerId": 0,
        "orderDate": "2025-11-21T18:30:29.868Z",
        "shipDate": "2025-11-21T18:30:29.868Z",
        "userId": 0,
        "orderItems": [
        {
            "id": 0,
            "orderId": 0,
            "productId": 0,
            "quantity": 0,
            "product": {
            "id": 0,
            "categoryId": 0,
            "name": "string",
            "description": "string",
            "price": 0,
            "cost": 0,
            "image": "string",
            "category": {
                "id": 0,
                "name": "string",
                "description": "string"
            }
            }
        }
        ],
        "customer": {
        "id": 0,
        "firstName": "string",
        "lastName": "string",
        "address": "string",
        "address2": "string",
        "city": "string",
        "state": "string",
        "zipCode": "string",
        "emailAddress": "string"
        },
        "user": {
        "id": 0,
        "firstName": "string",
        "lastName": "string",
        "emailAddress": "string",
        "photo": "string",
        "employeeNumber": "string"
        }
    }
    ]
}
*/


/* 
    The following two types and the discriminating union will 
    make it easier to handle http responses.
    'success/ is the discriminant in the Discriminating Union, 
    Result<T>
*/
type SuccessResult<T> = {
    success: true,
    value: T,
    error?: null
}

type ErrorResult = {
    success: false,
    value?: null,
    error: string
}

export type Result<T> = SuccessResult<T> | ErrorResult;

// BEGIN SCRATCH SECTION
/*  JSON for Products returned by Galactic Relics API
{
    "page": 0,
    "totalPages": 0,
    "totalItems": 0,
    "data": [
    {
        "id": 0,
        "categoryId": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "cost": 0,
        "image": "string",
        "category": {
        "id": 0,
        "name": "string",
        "description": "string"
        }
    }
    ]
}*/
/*  JSON FOR an OrderItem
{
"id": 0,
"orderId": 0,
"productId": 0,
"quantity": 0,
"product": {
    "id": 0,
    "categoryId": 0,
    "name": "string",
    "description": "string",
    "price": 0,
    "cost": 0,
    "image": "string",
    "category": {
        "id": 0,
        "name": "string",
        "description": "string"
    }
}
*/
// END SCRATCH SEDIONS

