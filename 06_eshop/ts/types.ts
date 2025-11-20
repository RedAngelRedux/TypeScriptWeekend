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

export type Page<Tdata extends object> = {
    page: number,
    totalPages: number,
    totalItems: number,
    data: Array<Tdata>,
}

export type Category = {
    id: number,
    name: string,
    description: string,
}

export type Product = {
    id: number,
    categoryId: number,
    name: string,
    description: string,
    price: number,
    cost: number,
    image: string,
    category: Category,
}

export type FetchProductsParams = {
    page?: number;
    pageSize?: number;
    categoryId?: number;
};


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

