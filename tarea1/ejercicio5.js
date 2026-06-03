// 5. Busqueda de datos dentro de Arreglos de Objetos

// Realizar código que permita buscar un dato dentro de un arreglo de objetos. Ejemplo: buscar por correo

// Para ello deberás considerar diferentes posibles soluciones incluyendo:

// Ciclos
// metodo find 
// precomputo/preprocesamiento de los datos para poder indexar los resultados
// Al final, deberas agregar como mensaje en tu entrega cuales son las diferencias entre estos "approaches", 
// cual es tu recomendacion y por que. 

const users = [
    { id: 1, name: "Ana", email: "ana@example.com" },
    { id: 2, name: "Luis", email: "luis@example.com" },
    { id: 3, name: "María", email: "maria@example.com" }
];

// Precomputo/preprocesamiento de los datos para indexar los resultados
const emailIndex = {};
users.forEach(user => {
    emailIndex[user.email] = user;
});

function findUserByEmail(email) {
    return emailIndex[email] || null;
}

console.log(findUserByEmail("ana@example.com"));

//Las diferencias entre los approaches son el tiempo de busqueda y consumo de memoria. El ciclo y el metodo find tienen un tiempo de busqueda O(n) mientras que el precomputo/preprocesamiento tiene un tiempo de busqueda O(1) pero consume mas memoria. 
// Mi recomendacion es usar el precomputo/preprocesamiento si se va a realizar muchas busquedas, ya que el tiempo de busqueda es mucho menor, pero si solo se va a realizar una o pocas busquedas, el ciclo o el metodo find pueden ser suficientes.