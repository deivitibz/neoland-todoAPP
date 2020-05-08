//mostrar
var ul = document.getElementById('mostrar');
ul.innerHTML = '';

//boton añadir tarea
var btnAdd = document.querySelector('#btn-add');
btnAdd.addEventListener('click', addTarea);

//inputs
var input = document.querySelector('#input-task'); // input texto 
var priority = document.getElementById('select-priority'); // input selector

//contador id tareas
var idTarea = 4;


// funcion para mostrar una tarea en el html
function mostrarTarea(tarea) {

    let clasePrioridad = '';
    switch (tarea.prioridad) {
        case 'urgente':
            clasePrioridad = 'bg-danger'
            break;
        case 'diaria':
            clasePrioridad = 'bg-warning'
            break;
        case 'mensual':
            clasePrioridad = 'bg-primary'
            break;
    }
    ul.innerHTML += `<li class="list-group-item my-2">
                <div class="${clasePrioridad} p-2 "></div>
                <h3>${tarea.titulo}</h3>
                <button id="delete" data-id="${tarea.idtarea}" class="btn btn-danger">Eliminar</button>
                <button id="edit" data-id="${tarea.idtarea}" class="btn btn-primary">Editar</button>
                
                </li>
                `

}

// funcion para mostrar todas las tareas

function mostrarTodasTareas(arrayTareas) {
    ul.innerHTML = '';
    for (tarea of arrayTareas) {
        mostrarTarea(tarea);
    }
    eventoBotones();
}

// funcion para añadir tarea recogida desde el formulario
function addTarea(event) {
    event.preventDefault();
    let titulo = input.value;
    let prioridad = priority.value;
    let alerta = document.getElementById('alerta')
    console.log(alerta);

    if (titulo != '' && prioridad != '') {
        alerta.style.display = 'none'
        let tarea = {
            idtarea: idTarea,
            titulo: titulo,
            prioridad: prioridad
        }
        idTarea++;
        
        //mostrarTarea(tarea)
        tasks.push(tarea);
        mostrarTodasTareas(tasks)
        eventoBotones();
    } else {
        alerta.style.display = 'block'
    }
    input.value = '';
        priority.selectedIndex = 0


}

function eventoBotones() {
    let btnDelete = document.querySelectorAll('#delete'); // captura botones borrar

    for (boton of btnDelete) {
        boton.addEventListener('click', removeTask); // añade evento click al boton de borrar y llama a la funcion deleteTask

    }

}

// funcion para borrar las tareas del html y del array 

function removeTask(event) {

    let id = event.target.dataset.id;
    let tareaEliminar = event.target.parentNode;
    console.log(tareaEliminar);

    tareaEliminar.parentNode.removeChild(tareaEliminar)

    //buscar en el array la posicion
    let posicionBorrar = tasks.findIndex(task => {
        return task.titulo == id
    })

    console.log(posicionBorrar);
    tasks.splice(posicionBorrar, 1)

    /* event.target.parentNode.parentNode.remove();
    if (event.target.id == 'btn-remove') {
        let id = event.target.parentNode.parentNode.dataset.id;
        //console.log(id);
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].idtarea == id) {
                tasks.splice(i, 1)
            }
        }
    } */
}

// funcion para filtrar las tareas desde el input de busqueda

let inputSearch = document.getElementById('input-search');
inputSearch.addEventListener('input',filtrarTareas)

function filtrarTareas(event) {
    let arrayBuscar = new Array();
    let inputBuscar = event.target.value
    
    for (task of tasks){

         if (task.titulo.toLowerCase().includes(inputBuscar)){
            arrayBuscar.push(task)
        }
            
    }
    mostrarTodasTareas(arrayBuscar)
}

// funcion para filtrar las tareas desde el selector de prioridad

let selectSearch = document.querySelector('#search-priority')
selectSearch.addEventListener('change', filtrarPrioridad)

function filtrarPrioridad(event){
    let arrayPrioridad = new Array();
    let selectPriority = event.target.value.toLowerCase();

    console.log(selectPriority);
    

    for ( task of tasks){
        if(task.prioridad == selectPriority)
        arrayPrioridad.push(task) 
    }
    mostrarTodasTareas(arrayPrioridad)
}


// inicio app


mostrarTodasTareas(tasks)
