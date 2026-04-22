// =============================
// ESTRUCTURA GLOBAL DEL REGISTRO
// =============================

let registro = {
    datosPersonales: {},
    familiares: [],
    salud: [],
    internamientos: []
};


// =============================
// GUARDAR DATOS PERSONALES
// =============================

function guardarDatosPersonales(){

    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;
    let edad = document.getElementById("edad").value;

    registro.datosPersonales = {
        nombre:nombre,
        cedula:cedula,
        edad:edad
    };

    localStorage.setItem("registroTemporal", JSON.stringify(registro));

    window.location.href = "familiares.html";

}


// =============================
// FAMILIARES
// =============================

function cargarFamiliares(){

    let temp = localStorage.getItem("registroTemporal");

    if(temp){
        registro = JSON.parse(temp);
    }

}

function agregarFamiliar(){

    let nombre = document.getElementById("nombreFamiliar").value;
    let parentesco = document.getElementById("parentesco").value;
    let edad = document.getElementById("edadFamiliar").value;

    let familiar = {
        nombre:nombre,
        parentesco:parentesco,
        edad:edad
    };

    registro.familiares.push(familiar);

    localStorage.setItem("registroTemporal", JSON.stringify(registro));

    alert("Familiar agregado");

    document.getElementById("nombreFamiliar").value="";
    document.getElementById("parentesco").value="";
    document.getElementById("edadFamiliar").value="";

}

function continuarSalud(){

    localStorage.setItem("registroTemporal", JSON.stringify(registro));

    window.location.href="salud.html";

}


// =============================
// SALUD
// =============================

function cargarSalud(){

    let temp = localStorage.getItem("registroTemporal");

    if(temp){
        registro = JSON.parse(temp);
    }

}

function agregarCondicion(){

    let enfermedad = document.getElementById("enfermedad").value;
    let tiempo = document.getElementById("tiempo").value;

    let condicion = {
        enfermedad:enfermedad,
        tiempo:tiempo
    };

    registro.salud.push(condicion);

    localStorage.setItem("registroTemporal", JSON.stringify(registro));

    alert("Condición agregada");

    document.getElementById("enfermedad").value="";
    document.getElementById("tiempo").value="";

}

function continuarInternamientos(){

    localStorage.setItem("registroTemporal", JSON.stringify(registro));

    window.location.href="internamientos.html";

}


// =============================
// INTERNAMIENTOS
// =============================

function cargarInternamientos(){

    let temp = localStorage.getItem("registroTemporal");

    if(temp){
        registro = JSON.parse(temp);
    }

}

function agregarInternamiento(){

    let fecha = document.getElementById("fecha").value;
    let centro = document.getElementById("centro").value;
    let diagnostico = document.getElementById("diagnostico").value;

    let internamiento = {
        fecha:fecha,
        centro:centro,
        diagnostico:diagnostico
    };

    registro.internamientos.push(internamiento);

    localStorage.setItem("registroTemporal", JSON.stringify(registro));

    alert("Internamiento agregado");

    document.getElementById("fecha").value="";
    document.getElementById("centro").value="";
    document.getElementById("diagnostico").value="";

}

function finalizarRegistro(){

    let registros = localStorage.getItem("registros");

    if(registros==null){
        registros = [];
    }else{
        registros = JSON.parse(registros);
    }

    registros.push(registro);

    localStorage.setItem("registros", JSON.stringify(registros));

    localStorage.removeItem("registroTemporal");

    window.location.href="resumen.html";

}


// =============================
// RESUMEN
// =============================

function obtenerRegistros(){

    let registros = localStorage.getItem("registros");

    if(registros == null){
        return [];
    }else{
        return JSON.parse(registros);
    }

}


function mostrarRegistros(){

    let registros = obtenerRegistros();

    let tabla = document.querySelector("#tabla tbody");

    if(!tabla) return;

    tabla.innerHTML="";

    registros.forEach((registro,index)=>{

        let fila = `
        <tr>

        <td>${registro.datosPersonales.nombre}</td>
        <td>${registro.datosPersonales.cedula}</td>
        <td>${registro.datosPersonales.edad}</td>

        <td>
        <button onclick="editarRegistro(${index})">Editar</button>
        <button onclick="eliminarRegistro(${index})">Eliminar</button>
        </td>

        </tr>
        `;

        tabla.innerHTML += fila;

    });

}


// =============================
// ELIMINAR REGISTRO
// =============================

function eliminarRegistro(index){

    let registros = obtenerRegistros();

    if(confirm("¿Desea eliminar este registro?")){

        registros.splice(index,1);

        localStorage.setItem("registros", JSON.stringify(registros));

        mostrarRegistros();

    }

}


// =============================
// EDITAR REGISTRO
// =============================

function editarRegistro(index){

    let registros = obtenerRegistros();

    let registroEditar = registros[index];

    let nombre = prompt("Editar nombre",registroEditar.datosPersonales.nombre);
    let cedula = prompt("Editar cedula",registroEditar.datosPersonales.cedula);
    let edad = prompt("Editar edad",registroEditar.datosPersonales.edad);

    registros[index].datosPersonales = {
        nombre:nombre,
        cedula:cedula,
        edad:edad
    };

    localStorage.setItem("registros", JSON.stringify(registros));

    mostrarRegistros();

}


// =============================
// CARGA AUTOMÁTICA
// =============================

document.addEventListener("DOMContentLoaded",mostrarRegistros);
