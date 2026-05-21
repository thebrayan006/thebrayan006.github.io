// API KEY GEMINI
const API_KEY = "AIzaSyB_t_S8RFqYzeIUfQyPNMzBIlrkdrespkY";


// ENVIAR PREGUNTA

async function enviarPregunta(){

let input = document.getElementById("pregunta");

let texto = input.value.trim();

if(texto === "") return;


// MENSAJE USUARIO
agregarMensaje(texto,"user");

input.value="";


// MENSAJE TEMPORAL
let loading = agregarMensaje(
"Pensando...",
"bot"
);


try{

// PROMPT DEL SISTEMA
let prompt = `
Eres un chatbot especializado EXCLUSIVAMENTE en el Estatuto Orgánico de la Universidad Autónoma de Santo Domingo (UASD).

Responde únicamente preguntas relacionadas con:
- misión
- visión
- facultades
- estudiantes
- docentes
- organismos de gobierno
- rector
- consejos universitarios
- derechos
- deberes
- investigación
- postgrado
- bienestar universitario

Si la pregunta NO está relacionada con la UASD o el Estatuto Orgánico, responde:
"Solo puedo responder preguntas relacionadas con el Estatuto Orgánico de la UASD."

Pregunta del usuario:
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


// EXTRAER RESPUESTA
let respuestaIA =
data.candidates[0].content.parts[0].text;


// ELIMINAR "Pensando..."
loading.remove();


// MOSTRAR RESPUESTA
agregarMensaje(respuestaIA,"bot");


}catch(error){

loading.remove();

agregarMensaje(
"Error al conectar con la IA.",
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


// AUTO SCROLL
chatBox.scrollTop = chatBox.scrollHeight;

return mensaje;

}


// PREGUNTAS SUGERIDAS

function preguntaSugerida(boton){

document.getElementById("pregunta").value = boton.innerText;

enviarPregunta();

}
