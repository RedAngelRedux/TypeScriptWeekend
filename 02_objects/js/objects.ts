const people: Employee[] = [
    {
        id: 1,
        name: 'John Doe',
        position: 'Software Engineer',
        department: 'Engineering',
        salary: 250_000,
    },
    {
        id: 2,
        name: 'Jane Smith',
        position: 'Human Resources Manager',
        department: 'HR',
        salary: 85_000,
    },
    {
        id: 3,
        name: 'Alice Johnson',
        position: 'UX Designer',
        department: 'Design',
        salary: 80_000,
    },
    {
        id: 4,
        name: 'Bob Brown',
        position: 'Data Scientist',
        department: 'Engineering',
        salary: 90_000,
    },
];

const fullnamePeople: FullNameEmployee[] = [
    {
        id: 1,
        name: 'John Doe',
        position: 'Software Engineer',
        department: 'Engineering',
        salary: 250_000,
    },
    {
        id: 2,
        name: 'Jane Smith',
        position: 'Human Resources Manager',
        department: 'HR',
        salary: 85_000,
    },
    {
        id: 3,
        name: 'Alice Johnson',
        position: 'UX Designer',
        department: 'Design',
        salary: 80_000,
    },
    {
        id: 4,
        name: 'Bob Brown',
        position: 'Data Scientist',
        department: 'Engineering',
        salary: 90_000,
    },
];

const departmentPeople: DepartmentEmployee[] = [
    {
        id: 1,
        name: 'John Doe',
        position: 'Software Engineer',
        department: 'Engineering',
        salary: 250_000,
    },
    {
        id: 2,
        name: 'Jane Smith',
        position: 'Human Resources Manager',
        department: 'HR',
        salary: 85_000,
    },
    {
        id: 3,
        name: 'Alice Johnson',
        position: 'UX Designer',
        department: 'Design',
        salary: 80_000,
    },
    {
        id: 4,
        name: 'Bob Brown',
        position: 'Data Scientist',
        department: 'Engineering',
        salary: 90_000,
    },
];

type Employee = {
    id: number,
    name: string,
    position: string,
    department: string,
    salary: number
}

type FullNameEmployee = {
    id: number,
    name: `${string} ${string}`,
    position: string,
    department: string,
    salary: number
}

// Other Ways to Use Literal Types
type Url = `https://${string}`

// Union Types
type DepartmentEmployee = {
    id: number,
    name: `${string} ${string}`,
    position: string,
    //department: 'Engineering' | "Design" | "HR",
    department: Department,
    salary: number
}

type Department = 'Engineering' | "Design" | "HR";


function GetHighestPaidEmployee(employees: Employee[]) {
    let highestPaid = employees[0];
    for(const employee of employees){
        if(employee.salary > highestPaid.salary) {
            highestPaid = employee
        }
    }
    return highestPaid;
}

const highestPaid = GetHighestPaidEmployee(people);

function FindEngineers(employees : DepartmentEmployee[]) {    
    const hrEmployees = employees.filter(e => e.department === "Engineering");
    return hrEmployees;
}

function AssignDepartment1(employee: DepartmentEmployee, newDepartment: 'Engineering' | "Design" | "HR" ){
    employee.department = newDepartment;
}

function AssignDepartment2(employee: DepartmentEmployee, newDepartment: Department){
    employee.department = newDepartment;
}

function AssignDepartment3(employee: DepartmentEmployee, newDepartment: Department ){
    employee.department = newDepartment;
}


// console.log(people);
// console.log(highestPaid);
// console.log(`The highest paid employee is ${highestPaid.name}.`);

const engineers = FindEngineers(departmentPeople);
console.log(engineers);

console.log("...");
AssignDepartment1(engineers[0],'Design');
AssignDepartment2(engineers[0],'Design');
AssignDepartment2(engineers[0], 'Design');
console.log("...");

console.log(engineers);
