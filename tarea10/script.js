const API_KEY = "TU_NUEVA_API_KEY";


async function enviarPregunta(){

let input = document.getElementById("pregunta");

let texto = input.value.trim();

if(texto === "") return;


// MENSAJE USUARIO
agregarMensaje(texto,"user");

input.value="";


// LOADING
let loading = agregarMensaje(
"Pensando...",
"bot"
);


try{

let prompt = `
Eres un chatbot especializado en el Estatuto Orgánico de la UASD.

Responde solo preguntas relacionadas con:
- estudiantes
- docentes
- rector
- facultades
- estatuto
- misión
- visión
- consejos universitarios

Si la pregunta no pertenece al tema responde:
"Solo puedo responder preguntas relacionadas con la UASD."

Pregunta:
${texto}
`;


// FETCH GEMINI
let response = await fetch(

`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,

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


// JSON
let data = await response.json();

console.log(data);


// ELIMINAR LOADING
loading.remove();


// VALIDAR ERROR API
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


// SCROLL AUTO
chatBox.scrollTop = chatBox.scrollHeight;

return mensaje;

}


// PREGUNTAS SUGERIDAS

function preguntaSugerida(boton){

document.getElementById("pregunta").value =
boton.innerText;

enviarPregunta();

}
