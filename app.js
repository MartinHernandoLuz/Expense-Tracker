import { Command } from 'commander';
import { add, delet, get, getResumen, getResumenMonth, update } from './write.js';

const program = new Command();



// add, update, delet, get, getResumen y getResumenMonth
// id, description, amount, month
program
    .name('my-cli')
    .version('1.0.0')
    .description('An example CLI using commander')
    .option('--get', 'conseguir todo') // Se describe la opción
    .option('--getResumen', 'resumen')
    .option('--getResumenMonth', 'resumen por mes')
    .option('--add', 'sumar un elemento')
    .option('--update', 'actualizar un elemento')
    .option('--delete', 'eliminar un elemento')
    .option('-i, --id <id_value>', 'para buscar por id')
    .option('-d, --description <des_value>', 'agregar descripción')
    .option('-a, --amount <amount_value>', 'agregar monto', parseFloat)
    .option('-m, --month <month_value>', 'agregar mes', parseInt)

program.parse(); // Analiza los argumentos

const options = program.opts(); // Obtiene las opciones pasadas





// ################# FUNCIONES ################# //
if (options.get) { // Verifica si --get está presente
    console.log('Executing get function...');

    (async () => {
        console.log(await get());
    })();
}
if (options.getResumen) {
    console.log('Executing get function...');

    (async () => {
        console.log(await getResumen());
    })();
}
if (options.getResumenMonth) {
    if (options.month) {
        (async () => {
            console.log(await getResumenMonth(options.month));
        })();
    } else {
        console.log("getResumenMonth need argument '--month <month>'")
    }
}




if (options.add) {
    if (options.description && options.amount) {
        (async () => {
            console.log(await add(options.description, options.amount));
        })();
    } else {
        console.log("add need argument '--description <des_value> --amount <amount_value>'")
    }
}
if (options.update) {
    if (options.description && options.amount && options.id) {
        (async () => {
            console.log(await update(options.id, options.description, options.amount));
        })();
    } else {
        console.log("update need argument '--description <des_value> --amount <amount_value> --id <id_value>'")
    }
}
if (options.delete) {
    if (options.id) {
        (async () => {
            console.log(await delet(options.id));
        })();
    } else {
        console.log("delete need argument '--id <id_value>'")
    }
}

















/*
import { Command } from 'commander';
const program = new Command();

// add, update, delet, get, getResumen y getResumenMonth
// id, description, amount, month

//     .option('-a, --age <age>', 'Your age', parseInt) // Convierte a número

program
    .name('my-cli')
    .version('1.0.0')
    .description('An example CLI using commander')
    .option('--get')
    .action((options) => {

    });

program.parse();



// ##############################

*/