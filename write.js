import fs from "fs/promises";

// ##################################################################################
const DATA_FILE = "data.json";

// Función para leer datos
const readData = async () => {
    try {
        // con read file puedo traer el contenido de un documento y lo guardo en rawdata
        const rawData = await fs.readFile(DATA_FILE, "utf-8");
        // retorna rawData cómo objeto JavasCript para poder trabajar con el
        return JSON.parse(rawData);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return { expenses: [] }; // Retorna un objeto vacío en caso de error
    }
};

// Función para escribir datos
const writeData = async (data) => {
    try {
        // escribe en DATA_FILE el contenido de data parseado a JSON (el dos hace el archivo más legible)
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};
// ##################################################################################





// #################################################################################
// 🟢 Agregar un gasto
export const add = async (description, amount) => {
    try {
        // valida la entrada
        if (!description || typeof amount !== "number" || amount <= 0) {
            throw new Error("Invalid input data");
        }
        // trae los datos con readData
        const data = await readData();
        // crea el nuevo objeto para agregar a data
        const newExpense = {
            id: data.expenses.length + 1,
            description,
            amount,
            date: new Date().toISOString().split("T")[0], // Fecha actual
        };
        // agrega al array expenses el nuevo expense y lo escribe en el archivo
        data.expenses.push(newExpense);
        await writeData(data);
        console.log(`datos guardados en el id ${data.expenses[data.expenses.length - 1].id}`)
    } catch (error) {
        console.log("estoy en add")
        console.log(`Error: ${error.message}`);
    }
};

// 🟠 Actualizar un gasto
export const update = async (id, description, amount) => {
    try {
        // valida la entrada
        if (!id || (description === undefined && amount === undefined)) {
            throw new Error("Invalid input data");
        }
        // trae los datos con readData
        const data = await readData();
        // busca el expense específico por id
        const expense = data.expenses.find((e) => e.id === parseInt(id));

        if (!expense) {
            throw new Error("Expense not found");
        }

        // modifica según los datos que llegaron.
        // expense no es una copia de una parte de data, sino que es una referencia
        // por eso las modificaciones en expense se verán reflejadas en data
        expense.description = description || expense.description;
        expense.amount = amount !== undefined ? amount : expense.amount;
        await writeData(data);

        const uExpense = data.expenses.find((e) => e.id === parseInt(id));
        console.log(uExpense)
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

// 🔴 Eliminar un gasto
export const delet = async (id) => {
    try {
        // compruebo datos
        if (!id) {
            throw new Error("Invalid ID");
        }
        // sólo traemos lo que no se va a eliminar
        let data = await readData();
        const filteredExpenses = data.expenses.filter((e) => e.id !== parseInt(id));

        // comprueba si cambió el tamaño (si es el mismo, es porque no exite el ID)
        if (data.expenses.length === filteredExpenses.length) {
            throw new Error("Expense not found");
        }

        // vuelve a escribir el JSON pero ahora si la expensa quitada
        data.expenses = filteredExpenses;
        await writeData(data);
        console.log("eliminado")
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

// 📋 Obtener todos los gastos
export const get = async () => {
    try {
        const data = await readData();
        console.log(data.expenses);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

// 📊 Obtener resumen total de gastos
export const getResumen = async () => {
    try {
        const data = await readData();
        const total = data.expenses.reduce((sum, e) => sum + e.amount, 0);
        console.log({ totalExpenses: total, count: data.expenses.length });
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

// 📆 Obtener resumen por mes
export const getResumenMonth = async (month) => {
    try {
        // Verifica que el mes sea un número válido entre 1 y 12
        if (
            typeof month !== "number" ||
            isNaN(month) ||
            month < 1 ||
            month > 12
        ) {
            throw new Error("Invalid month. Please provide a number between 1 and 12.");
        }

        // Obtiene los datos de los gastos
        const data = await readData();

        // Obtiene el año actual
        const currentYear = new Date().getFullYear();

        // Convierte el número de mes a una cadena de dos dígitos (ej. 1 -> "01")
        const monthStr = month.toString().padStart(2, "0");

        // Filtra los gastos que corresponden al mes y año actual
        const monthlyExpenses = data.expenses.filter((e) =>
            e.date.startsWith(`${currentYear}-${monthStr}`)
        );

        // Calcula el total de los gastos del mes
        const total = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);

        // Muestra el total y la cantidad de gastos en la consola
        console.log({ totalExpenses: total, count: monthlyExpenses.length });
    } catch (error) {
        // Captura y muestra cualquier error que ocurra
        console.log(`Error: ${error.message}`);
    }
};
