// 4. Benchmark de Metodos de Arreglos

// Realizar mediciones para comparar el desempeño de los métodos:

// filter y map
// reduce
// ciclos for para recorrer y filtrar (alternativa sobre filter y map)
// Utiliza la consola (console.log) para registrar los tiempos 

// Imprimir la diferencia en desempeño en diferentes volumenes de datos

function benchmark() {
    const data = Array.from({ length: 100000 }, (_, i) => i);
    console.time('filterMap');
    const filterMapResult = data.filter(x => x % 2 === 0).map(x => x * 2);
    console.timeEnd('filterMap');
    console.time('reduce');
    const reduceResult = data.reduce((acc, x) => {
        if (x % 2 === 0) {
            acc.push(x * 2);
        }
        return acc;
    }, []);
    console.timeEnd('reduce');
    console.time('forLoop');
    const forLoopResult = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i] % 2 === 0) {
            forLoopResult.push(data[i] * 2);
        }
    }
    console.timeEnd('forLoop');
}
benchmark();