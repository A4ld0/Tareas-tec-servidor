// 1. Normalizacion de Datos

// El objetivo de este ejercicio es transformar datos en una estructura limpia y estandar

// Dado un arreglo como el siguiente:

// [
//   { id: 1, name: "Ana", roles: ["admin", "editor"] },
//   { id: 2, name: "Luis", roles: ["editor"] },
//   { id: 1, name: "Ana", roles: ["viewer"] }
// ]

// Deberas crear una funcion que:

// reciba el arreglo de datos
// hacer merge de usuarios mediante el ID 
// combinar y de-duplicar los roles
// generar y devolver un objeto con llaves unicas por id del usuario 

let data = [
  { id: 1, name: "Ana", roles: ["admin", "editor"] },
  { id: 2, name: "Luis", roles: ["editor"] },
  { id: 1, name: "Ana", roles: ["viewer"] }
];

function normalizeData(data) {
    const normalized = {};
    data.forEach(user => {
        if (!normalized[user.id]) {
            normalized[user.id] = { id: user.id, name: user.name, roles: new Set() };
        }
        user.roles.forEach(role => {
            normalized[user.id].roles.add(role);
        });
    });
    return Object.values(normalized);
}

const result = normalizeData(data);
console.log(result);