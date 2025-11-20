import './console-extensions.js';

interface User {
    username: string;
    passwordHash: string;
}

interface User {
    role: string;
}

const admin : User = {
    username: 'admin@example.com',
    passwordHash: 'hashed_password',
    role: 'administrator'
}

if (typeof console.logAsJson !== 'function') {
    throw new Error('console.logAsJson is not defined');
}
else {
    console.logAsJson(admin);
}

