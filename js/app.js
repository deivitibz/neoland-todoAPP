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