// 2. Counter Closure

// El objetivo de este es manejar un estado mediante Closures.

// Se debe crear una funcion para crear un contador. E.g. "crearContador()"

// Esta funcion debera incluir los metodos "incrementar", "disminuir", y "reset".

// Al crear el contador, la cuenta se debera settear en cero automaticamente.

// La funcion debera llevar la cuenta "total" del contador. Esta propiedad no debe ser accesible publicamente. 

// Incluir una cuarta funcion llamada "obtenerCuenta" que devuelva el valor del estado. 

// Ejemplo: tras crear el contador, si se llama 3 veces la funcion "incrementar" y una vez la funcion "disminuir", 

// al llamar "obtenerCuenta" debera devolver el valor 2 (+3 -1)

function crearContador() {
    let total = 0;
    return {
        incrementar() {
            total++;
        },
        disminuir() {
            total--;
        },
        reset() {
            total = 0;
        },
        obtenerCuenta() {
            return total;
        }
    };
}

const contador = crearContador();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.disminuir();
console.log(contador.obtenerCuenta());