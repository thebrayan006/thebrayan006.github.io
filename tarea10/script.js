// ENVIAR PREGUNTA

function enviarPregunta(){

let input = document.getElementById("pregunta");

let texto = input.value.trim();

if(texto === "") return;


agregarMensaje(texto,"user");


// RESPUESTA TEMPORAL
setTimeout(()=>{

agregarMensaje(
"Estoy procesando tu pregunta sobre el Estatuto Orgánico de la UASD...",
"bot"
);

},800);


input.value="";

}


// AGREGAR MENSAJES

function agregarMensaje(texto,tipo){

let chatBox = document.getElementById("chatBox");

let mensaje = document.createElement("div");

mensaje.classList.add("mensaje");
mensaje.classList.add(tipo);

mensaje.innerText = texto;

chatBox.appendChild(mensaje);


// SCROLL AUTOMATICO

chatBox.scrollTop = chatBox.scrollHeight;

}


// PREGUNTAS SUGERIDAS

function preguntaSugerida(boton){

document.getElementById("pregunta").value = boton.innerText;

enviarPregunta();

}
