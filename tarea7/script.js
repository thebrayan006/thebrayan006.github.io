let persona = JSON.parse(localStorage.getItem("persona")) || {
nombre:"",
cedula:"",
edad:"",
familiares:[],
condiciones:[],
internamientos:[]
};

function guardarPersona(){

persona.nombre=document.getElementById("nombre").value;
persona.cedula=document.getElementById("cedula").value;
persona.edad=document.getElementById("edad").value;

localStorage.setItem("persona",JSON.stringify(persona));

alert("Datos guardados");
}

function agregarFamiliar(){

let nombre=document.getElementById("familiar").value;
let parentesco=document.getElementById("parentesco").value;
let edad=document.getElementById("edadFamiliar").value;

persona.familiares.push({nombre,parentesco,edad});

localStorage.setItem("persona",JSON.stringify(persona));

mostrarFamiliares();
}

function mostrarFamiliares(){

let tabla=document.getElementById("tablaFamiliares");

persona.familiares.forEach(f=>{

let fila=tabla.insertRow();

fila.insertCell(0).innerText=f.nombre;
fila.insertCell(1).innerText=f.parentesco;
fila.insertCell(2).innerText=f.edad;

});
}

function agregarCondicion(){

let enfermedad=document.getElementById("enfermedad").value;
let tiempo=document.getElementById("tiempo").value;

persona.condiciones.push({enfermedad,tiempo});

localStorage.setItem("persona",JSON.stringify(persona));
}

function agregarInternamiento(){

let fecha=document.getElementById("fecha").value;
let centro=document.getElementById("centro").value;
let diagnostico=document.getElementById("diagnostico").value;

persona.internamientos.push({fecha,centro,diagnostico});

localStorage.setItem("persona",JSON.stringify(persona));
}

function mostrarDatos(){

let data=JSON.parse(localStorage.getItem("persona"));

let div=document.getElementById("resultado");

div.innerHTML=`

<h3>Datos Personales</h3>
Nombre: ${data.nombre}<br>
Cédula: ${data.cedula}<br>
Edad: ${data.edad}<br>

<h3>Familiares</h3>
${data.familiares.map(f=>`${f.nombre} - ${f.parentesco} - ${f.edad}`).join("<br>")}

<h3>Condiciones</h3>
${data.condiciones.map(c=>`${c.enfermedad} - ${c.tiempo}`).join("<br>")}

<h3>Internamientos</h3>
${data.internamientos.map(i=>`${i.fecha} - ${i.centro} - ${i.diagnostico}`).join("<br>")}

`;
}
