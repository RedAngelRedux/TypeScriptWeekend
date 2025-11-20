function greet(name: string) {
    console.log(`Hello, ${name}`);
}

const fullName = 'John Doe';

const fullNameObj = {
    first: 'Jame',
    last: 'Doe'
}

greet(fullName);
greet(fullNameObj.first) + ' ' + fullNameObj.last;