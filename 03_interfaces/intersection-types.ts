import './console-extensions.js';

interface User {
    username: string;
    passwordHash: string;
}

type Role = 'admin' | 'user' | 'guest';

interface User {
    role: Role;
}

type Permissions = 'create' | 'read' | 'update' | 'delete';

interface AdminUser extends User {
    role: 'admin',
    permissions: Permissions[]
}

const user : AdminUser = {
    username: 'admin@example.com',
    passwordHash: 'hashed_password',
    role: 'admin',
    permissions: ['create','read','update','delete']
}

// Valid Intersection Type
type GuestUser = User & {
    role: 'guest',
    expiresAt: Date
}

// 'never' Type
type StrangeX = Permissions & Role; // TS does not compplain, but StrangeX is of type "never"

// // Invalid because GuestUser is not an interface, it is a type (intersection)
// interface IllegalInterface extends GuestUser {
//     role: "user";
// }

const guest: GuestUser = {
    username: 'guest@example.com',
    passwordHash: "",
    role: "guest",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24)
}

function IsUserInRole(user: User, role: Role) {
    return user.role === role;
}

const isAdmin = IsUserInRole(user,'admin');
console.logAsJson(user);
console.log(`User is admin? ${isAdmin}`);
console.log(`User's permissions: ${user.permissions}`)

console.logAsJson(guest);
const isGuest = IsUserInRole(guest,'guest');
console.log(`User is guest? ${isGuest}`);
//console.log(`User's permissions: ${guest.permissions}`)
