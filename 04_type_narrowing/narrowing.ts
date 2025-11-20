import './console-extensions.js';

const jsonString = `
{
    "page": 1,
    "totalPages": 10,
    "data": [
        { "id": 1, "name": "Chocolate Chip Cookies", "url": "https://example.com/chocolate-chip-cookies" },
        { "id": 2, "name": "Banana Bread", "url": "https://example.com/banana-bread" },
        { "id": 3, "name": "Apple Pie", "url": "https://example.com/apple-pie" },
        { "id": 4, "name": "Brownies", "url": "https://example.com/brownies" },
        { "id": 5, "name": "Cheesecake", "url": "https://example.com/cheesecake" },
        { "id": 6, "name": "Pancakes", "url": "https://example.com/pancakes" },
        { "id": 7, "name": "Waffles", "url": "https://example.com/waffles" },
        { "id": 8, "name": "Muffins", "url": "https://example.com/muffins" },
        { "id": 9, "name": "Cupcakes", "url": "https://example.com/cupcakes" },
        { "id": 10, "name": "Tiramisu", "url": "https://example.com/tiramisu" }
    ]
}`;

type Recipe = {
    id: number,
    name: string,
    url: string
};

type Recipes = {
    page: number,
    totalPages: number,
    data: Recipe[]
};

function getRecipeById(id: number): Recipe | undefined  {
    
    const recipieList = JSON.parse(jsonString) as Recipes;

    const recipe = recipieList.data.find(r => r.id === id);

    return recipe;    
}

function getRecipeByIdBetter(id: number): Recipe | undefined  {
    
    const recipieList = JSON.parse(jsonString) as unknown;

    if(!recipieList || typeof recipieList !== 'object') {
        return undefined;
    }

    if('data' in recipieList === false){
        return undefined;
    }

    if(recipieList.data instanceof Array === false){
        return undefined;
    }

    const recipe = recipieList.data.find(r => r.id === id);

    return recipe;    
}

// This is a 'type predicate'
function IsRecipeList(value: unknown): value is Recipes {

    if(!value || typeof value !== 'object') return false;

    if('data' in value === false) return false;
    if(value.data instanceof Array === false) return false;

    if('page' in value === false) return false;
    if(typeof value.page !== 'number') return false;

    if('totalPages' in value === false) return false;
    if(typeof value.totalPages !== 'number') return false;

    if(value.data.length <= 0 && !isRecipe(value.data)) return false;

    return true;
}

// This is a 'type predicate'
function isRecipe(value: unknown): value is Recipe {

    return (
        value != null
        && typeof value === 'object'
        && 'id' in value
        && typeof value.id === 'number'
        && 'name' in value
        && typeof value.name === 'string'
        && 'url' in value
        && typeof value.url === 'string'
    );
}

function getRecipeByIdBest(id: number): Recipe | undefined  {
    
    const recipieList = JSON.parse(jsonString) as unknown;

    if(IsRecipeList(recipieList) === false) return undefined;

    const recipe = recipieList.data.find(r => r.id === id);

    return recipe;    
}

console.logAsJson(getRecipeById(1) as object); // would not work if 'data' is renamed, i.e. 'recipes'
console.logAsJson(getRecipeByIdBetter(2) as object); // would return 'undefined' if prop name changed
console.logAsJson(getRecipeByIdBest(3) as object);
