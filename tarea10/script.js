const API_KEY = "AIzaSyAIuHp7jBpmBYfKnRa7d5rEY74cMIyUIak";


async function enviarPregunta(){

let input = document.getElementById("pregunta");

let texto = input.value.trim();

if(texto === "") return;


// MENSAJE USUARIO
agregarMensaje(texto,"user");

input.value = "";


// MENSAJE CARGANDO
let loading = agregarMensaje(
"Pensando...",
"bot"
);


try{

let prompt = `
Eres un chatbot especializado en el Estatuto Orgánico de la UASD.

Responde solamente preguntas relacionadas con:
- estudiantes
- docentes
- rector
- facultades
- misión
- visión
- estatuto
- consejos universitarios

Si la pregunta no tiene relación con la UASD responde:
"Solo puedo responder preguntas relacionadas con la UASD."

Pregunta:
${texto}
`;


// PETICION A GEMINI
let response = await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,

{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

contents:[

{
parts:[
{
text:prompt
}
]
}

]

})

}

);


// RESPUESTA JSON
let data = await response.json();

console.log(data);


// QUITAR LOADING
loading.remove();


// VALIDAR ERROR
if(data.error){

agregarMensaje(
"Error IA: " + data.error.message,
"bot"
);

return;

}


// VALIDAR RESPUESTA
if(

data.candidates &&
data.candidates.length > 0 &&
data.candidates[0].content &&
data.candidates[0].content.parts &&
data.candidates[0].content.parts.length > 0

){

let respuesta =
data.candidates[0].content.parts[0].text;

agregarMensaje(respuesta,"bot");

}else{

agregarMensaje(
"No pude generar respuesta.",
"bot"
);

}


}catch(error){

loading.remove();

agregarMensaje(
"Error conectando con Gemini.",
"bot"
);

console.error(error);

}

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

return mensaje;

}


// PREGUNTAS SUGERIDAS

function preguntaSugerida(boton){

document.getElementById("pregunta").value =
boton.innerText;

enviarPregunta();

}
