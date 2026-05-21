// BASE DE CONOCIMIENTO

const conocimiento = [

{
keywords:["uasd","universidad"],
respuesta:"La UASD es una institución pública y autónoma de educación superior de la República Dominicana."
},

{
keywords:["misión","mision"],
respuesta:"La misión de la UASD es formar profesionales, investigadores y técnicos con valores éticos y capacidad crítica."
},

{
keywords:["visión","vision"],
respuesta:"La visión de la UASD es ser una universidad moderna, innovadora y comprometida con el desarrollo nacional."
},

{
keywords:["claustro mayor"],
respuesta:"El Claustro Mayor es el máximo organismo de gobierno universitario."
},

{
keywords:["claustro menor"],
respuesta:"El Claustro Menor es un organismo académico y administrativo de la universidad."
},

{
keywords:["consejo universitario"],
respuesta:"El Consejo Universitario es el organismo ejecutivo de dirección de la UASD."
},

{
keywords:["rector","rectoría","maxima autoridad"],
respuesta:"El Rector es la máxima autoridad ejecutiva de la universidad."
},

{
keywords:["estudiantes","alumnos"],
respuesta:"Los estudiantes tienen derecho a educación de calidad y participación universitaria."
},

{
keywords:["docentes","profesores"],
respuesta:"Los docentes tienen derecho a libertad académica y deben cumplir funciones éticas y académicas."
},

{
keywords:["investigación","investigacion"],
respuesta:"La investigación es una función fundamental de la UASD."
},

{
keywords:["bienestar"],
respuesta:"El bienestar estudiantil busca mejorar la calidad de vida de los estudiantes."
},

{
keywords:["extensión","extension"],
respuesta:"La extensión universitaria conecta la universidad con la sociedad."
},

{
keywords:["facultades","facultad"],
respuesta:"Las facultades son unidades académicas encargadas de coordinar carreras y programas."
}

];


// CARGAR HISTORIAL

window.onload = function(){

let historial =
JSON.parse(localStorage.getItem("chatHistorial")) || [];

historial.forEach(msg=>{

agregarMensaje(msg.texto,msg.tipo,false);

});

};




// ENVIAR PREGUNTA

function enviarPregunta(){

let input =
document.getElementById("pregunta");

let texto =
input.value.trim();

if(texto==="") return;


// MENSAJE USER
agregarMensaje(texto,"user",true);

input.value="";


// EFECTO ESCRIBIENDO
let escribiendo =
agregarMensaje(
"Escribiendo respuesta...",
"bot",
false
);


setTimeout(()=>{

escribiendo.remove();

let respuesta =
buscarRespuestaAvanzada(texto);

agregarMensaje(respuesta,"bot",true);

},1200);

}




// BUSQUEDA AVANZADA

function buscarRespuestaAvanzada(pregunta){

pregunta = pregunta.toLowerCase();

let mejorCoincidencia = 0;

let mejorRespuesta =
"No encontré información suficiente en el Estatuto Orgánico de la UASD sobre esa pregunta.";


// ANALISIS INTELIGENTE

conocimiento.forEach(item=>{

let coincidencias = 0;

item.keywords.forEach(keyword=>{

if(
pregunta.includes(keyword)
){

coincidencias++;

}

});


// MEJOR RESULTADO

if(coincidencias > mejorCoincidencia){

mejorCoincidencia =
coincidencias;

mejorRespuesta =
item.respuesta;

}

});


return mejorRespuesta;

}




// AGREGAR MENSAJES

function agregarMensaje(texto,tipo,guardar=true){

let chatBox =
document.getElementById("chatBox");

let mensaje =
document.createElement("div");

mensaje.classList.add("mensaje");
mensaje.classList.add(tipo);

mensaje.innerText = texto;

chatBox.appendChild(mensaje);


// AUTO SCROLL

chatBox.scrollTop =
chatBox.scrollHeight;


// GUARDAR HISTORIAL

if(guardar){

let historial =
JSON.parse(localStorage.getItem("chatHistorial")) || [];

historial.push({

texto:texto,
tipo:tipo

});

localStorage.setItem(
"chatHistorial",
JSON.stringify(historial)
);

}


return mensaje;

}




// PREGUNTAS SUGERIDAS

function preguntaSugerida(boton){

document.getElementById("pregunta").value =
boton.innerText;

enviarPregunta();

}




// ENTER PARA ENVIAR

document.addEventListener("DOMContentLoaded",()=>{

document.getElementById("pregunta")
.addEventListener("keypress",function(e){

if(e.key==="Enter"){

enviarPregunta();

}

});

});




// LIMPIAR CHAT

function limpiarChat(){

localStorage.removeItem("chatHistorial");

location.reload();

}
