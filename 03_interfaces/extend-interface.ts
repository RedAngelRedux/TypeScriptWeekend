import './console-extensions.js';

interface User {
    username: string;
    passwordHash: string;
}

interface User {
    role: Role;
}

type Role = 'admin' | 'user' | 'guest';

interface GuestUser extends User {
    role: 'guest',
    permissions: Permissions[]
}

type Permissions = 'create' | 'read' | 'update' | 'delete';

const user : GuestUser = {
    username: 'admin@example.com',
    passwordHash: 'hashed_password',
    role: 'guest',
    permissions: ['read']
}

function IsUserInRole(user: User, role: Role) {
    return user.role === role;
}

const isGuest = IsUserInRole(user,'guest');
console.logAsJson(user);
console.log(`User is guest? ${isGuest}`);
console.log(`User's permissions: ${user.permissions}`)

