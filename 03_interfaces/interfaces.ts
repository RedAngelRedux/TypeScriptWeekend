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
    role: 'admin'
}

function CheckPassword(user: User, pwdHash: string) {
    return user.passwordHash == pwdHash;
}

const isValid = CheckPassword(admin,'hashed_password');
console.log(`User is authenticated? ${isValid}`)

if (typeof console.logAsJson !== 'function') {
    throw new Error('console.logAsJson is not defined');
}
else {
    console.logAsJson(admin);
}
