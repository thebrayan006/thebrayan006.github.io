let baseConocimiento = "";


// CARGAR TXT

fetch("uasd.txt")
.then(response => response.text())
.then(data => {

baseConocimiento = data.toLowerCase();

console.log("Base de conocimiento cargada");

});


// ENVIAR PREGUNTA

function enviarPregunta(){

let input = document.getElementById("pregunta");

let texto = input.value.trim();

if(texto === "") return;


// MENSAJE USUARIO
agregarMensaje(texto,"user");

input.value = "";


// RESPUESTA
setTimeout(()=>{

let respuesta =
buscarRespuesta(texto.toLowerCase());

agregarMensaje(respuesta,"bot");

},700);

}


// BUSCAR RESPUESTAS

function buscarRespuesta(pregunta){

if(
pregunta.includes("uasd")
){

return "La UASD es una institución pública y autónoma de educación superior de la República Dominicana.";

}


if(
pregunta.includes("misión")
){

return "La misión de la UASD es formar profesionales, investigadores y técnicos con valores éticos y capacidad crítica.";

}


if(
pregunta.includes("visión")
){

return "La visión de la UASD es ser una universidad moderna, innovadora y comprometida con el desarrollo nacional.";

}


if(
pregunta.includes("claustro mayor")
){

return "El Claustro Mayor es el máximo organismo de gobierno universitario.";

}


if(
pregunta.includes("claustro menor")
){

return "El Claustro Menor es un organismo académico y administrativo de la universidad.";

}


if(
pregunta.includes("consejo universitario")
){

return "El Consejo Universitario es el organismo ejecutivo de dirección de la UASD.";

}


if(
pregunta.includes("rector")
){

return "El Rector es la máxima autoridad ejecutiva de la universidad.";

}


if(
pregunta.includes("estudiantes")
){

return "Los estudiantes tienen derecho a educación de calidad y deben respetar las normas universitarias.";

}


if(
pregunta.includes("docentes")
){

return "Los docentes tienen derecho a libertad académica y deben cumplir funciones académicas y éticas.";

}


if(
pregunta.includes("investigación")
){

return "La investigación es una función fundamental de la UASD.";

}


if(
pregunta.includes("bienestar")
){

return "El bienestar estudiantil busca mejorar la calidad de vida de los estudiantes.";

}


if(
pregunta.includes("extensión")
){

return "La extensión universitaria conecta la universidad con la sociedad.";

}


// RESPUESTA DEFAULT

return "No encontré información suficiente en el Estatuto Orgánico de la UASD sobre esa pregunta.";

}


// AGREGAR MENSAJES

function agregarMensaje(texto,tipo){

let chatBox = document.getElementById("chatBox");

let mensaje = document.createElement("div");

mensaje.classList.add("mensaje");
mensaje.classList.add(tipo);

mensaje.innerText = texto;

chatBox.appendChild(mensaje);


// AUTO SCROLL

chatBox.scrollTop = chatBox.scrollHeight;

return mensaje;

}


// PREGUNTAS SUGERIDAS

function preguntaSugerida(boton){

document.getElementById("pregunta").value =
boton.innerText;

enviarPregunta();

}
