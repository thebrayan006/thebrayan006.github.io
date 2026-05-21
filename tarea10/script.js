const API_KEY = "AIzaSyAIuHp7jBpmBYfKnRa7d5rEY74cMIyUIak";


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

Responde de forma clara y breve.

Si la pregunta no está relacionada con la UASD responde:
"Solo puedo responder preguntas sobre el Estatuto Orgánico de la UASD."

Pregunta:
${texto}
`;


// PETICION
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


// ELIMINAR LOADING
loading.remove();


// VALIDAR RESPUESTA
if(data.candidates){

let respuesta =
data.candidates[0].content.parts[0].text;

agregarMensaje(respuesta,"bot");

}else{

agregarMensaje(
"No pude generar una respuesta.",
"bot"
);

console.log(data);

}


}catch(error){

loading.remove();

agregarMensaje(
"Error conectando con la IA.",
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

chatBox.scrollTop = chatBox.scrollHeight;

return mensaje;

}


// PREGUNTAS SUGERIDAS

function preguntaSugerida(boton){

document.getElementById("pregunta").value =
boton.innerText;

enviarPregunta();

}
