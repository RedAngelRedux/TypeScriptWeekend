import './console-extensions.js';

interface User {
    username: string;
    passwordHash: string;
}

interface User {
    role: Role;
}

type Role = 'admin' | 'user' | 'guest';

const admin : User = {
    username: 'admin@example.com',
    passwordHash: 'hashed_password',
    role: 'admin'
}

function IsUserInRole(user: User, role: Role) {
    return user.role === role;
}

const isGuest = IsUserInRole(admin,'guest');
console.log(`User is guest? ${isGuest}`);
console.logAsJson(admin);
