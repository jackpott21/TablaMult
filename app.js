
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
 const {inquirerMenu,pausa, leerInput, listadoTareasBorrar,confirmar,mostrarListadoCheckList} = require('./helpers/inquirer');
// const { pausa } = require('./helpers/mensajes');
const Tareas = require('./models/tareas');


const main = async() => {

    let opt = '' ;

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB);
    }

    do {
        opt = await inquirerMenu();

    

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;

            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletas(true);
            break;
            case '5':
               await mostrarListadoCheckList(tareas.listadoArr);
               console.log(ids);
            break;
            case '6': // Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        // guardarDB(tareas.listadoArr);

        guardarDB(tareas.listadoArr);

        await pausa();

        
    } while (opt !== '0' );


    

}


main();

