type UserRole = "admin" | "alumno" | "profesor" | "coordinador";
type UserStatus = "active" | "inactive" | "pending";

interface User {
  id: number;
  nombre: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

const users: User[] = [
  {
    id: 1,
    nombre: "Juan Perez",
    email: "juan.perez@iteso.mx",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    nombre: "Ana Lopez",
    email: "ana.lopez@iteso.mx",
    role: "alumno",
    status: "active",
  },
  {
    id: 3,
    nombre: "Carlos Ramirez",
    email: "carlos.ramirez@iteso.mx",
    role: "profesor",
    status: "inactive",
  },
  {
    id: 4,
    nombre: "Mariana Torres",
    email: "mariana.torres@iteso.mx",
    role: "alumno",
    status: "pending",
  },
  {
    id: 5,
    nombre: "Luis Hernandez",
    email: "luis.hernandez@iteso.mx",
    role: "coordinador",
    status: "active",
  },
  {
    id: 6,
    nombre: "Fernanda Garcia",
    email: "fernanda.garcia@iteso.mx",
    role: "alumno",
    status: "inactive",
  },
  {
    id: 7,
    nombre: "Roberto Sanchez",
    email: "roberto.sanchez@iteso.mx",
    role: "profesor",
    status: "active",
  },
  {
    id: 8,
    nombre: "Sofia Martinez",
    email: "sofia.martinez@iteso.mx",
    role: "alumno",
    status: "active",
  },
  {
    id: 9,
    nombre: "Diego Castro",
    email: "diego.castro@iteso.mx",
    role: "admin",
    status: "inactive",
  },
  {
    id: 10,
    nombre: "Valeria Navarro",
    email: "valeria.navarro@iteso.mx",
    role: "alumno",
    status: "pending",
  },
];

function normalizeText(value: string): string {
  return value.toLowerCase().trim();
}

function findUserById(id: number): User | undefined {
  return users.find((user: User): boolean => user.id === id);
}

function findUsersByName(name: string): User[] {
  const searchName: string = normalizeText(name);

  return users.filter((user: User): boolean =>
    normalizeText(user.nombre).includes(searchName)
  );
}

function findUsersByEmail(email: string): User[] {
  const searchEmail: string = normalizeText(email);

  return users.filter((user: User): boolean =>
    normalizeText(user.email).includes(searchEmail)
  );
}

function findUsersByRole(role: UserRole): User[] {
  return users.filter((user: User): boolean => user.role === role);
}

function findUsersByStatus(status: UserStatus): User[] {
  return users.filter((user: User): boolean => user.status === status);
}

console.log("Buscar usuario por ID 1:");
console.log(findUserById(1));

console.log('\nBuscar usuarios por nombre "ana":');
console.log(findUsersByName("ana"));

console.log('\nBuscar usuarios por email "iteso.mx":');
console.log(findUsersByEmail("iteso.mx"));

console.log('\nBuscar usuarios por role "alumno":');
console.log(findUsersByRole("alumno"));

console.log('\nBuscar usuarios por status "active":');
console.log(findUsersByStatus("active"));
