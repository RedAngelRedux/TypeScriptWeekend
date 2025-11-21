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
    product: Product | {},
}

export type Order = {
    id: number,
    customerId: number,
    orderDate: string,
    shipDate: string,
    userId: number,
    orderItems: Array<OrderItem> 
    // ,
    // customer: Array<object>,
    // user: object,
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

