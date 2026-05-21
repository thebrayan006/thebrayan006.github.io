const API_KEY = "AIzaSyBDHjpa_Nb9lVHPFuSf7ycMfLM2uxlnE-U";

const chatBox =
document.getElementById("chat-box");

const userInput =
document.getElementById("user-input");


// ===============================
// HISTORIAL
// ===============================

let historial =
JSON.parse(localStorage.getItem("historialUASD")) || [];

historial.forEach(msg => {
agregarMensaje(msg.tipo, msg.texto);
});


// ===============================
// BASE LOCAL UASD
// ===============================

const respuestasLocales = {

"que es la uasd":
"La Universidad Autónoma de Santo Domingo (UASD) es la universidad pública estatal de República Dominicana y la primera universidad del Nuevo Mundo.",

"mision":
"La misión de la UASD es formar profesionales críticos, éticos y comprometidos con el desarrollo de la sociedad.",

"vision":
"La UASD busca ser una institución académica líder, innovadora y de excelencia.",

"autonomia":
"La autonomía universitaria garantiza independencia académica, administrativa y financiera.",

"claustro mayor":
"El Claustro Mayor es el máximo organismo académico de la UASD.",

"consejo universitario":
"El Consejo Universitario es el principal organismo ejecutivo y administrativo.",

"rector":
"El Rector es la máxima autoridad ejecutiva de la Universidad.",

"facultades":
"Las facultades son estructuras académicas encargadas de coordinar áreas del conocimiento.",

"estudiantes":
"Los estudiantes tienen derechos y deberes establecidos en el Estatuto Orgánico."

};


// ===============================
// AGREGAR MENSAJES
// ===============================

function agregarMensaje(tipo, texto){

const mensaje =
document.createElement("div");

mensaje.classList.add("mensaje");

if(tipo === "usuario"){

mensaje.classList.add("usuario");

}else{

mensaje.classList.add("bot");

}

mensaje.innerHTML = texto;

chatBox.appendChild(mensaje);

chatBox.scrollTop =
chatBox.scrollHeight;


// guardar historial

historial.push({tipo,texto});

localStorage.setItem(
"historialUASD",
JSON.stringify(historial)
);

}


// ===============================
// RESPUESTA LOCAL
// ===============================

function respuestaLocal(texto){

texto = texto.toLowerCase();

for(let clave in respuestasLocales){

if(texto.includes(clave)){

return respuestasLocales[clave];

}

}

return "No encontré información exacta en el Estatuto Orgánico de la UASD.";

}


// ===============================
// ENVIAR PREGUNTA
// ===============================

async function enviarPregunta(textoManual = null){

const pregunta =
textoManual || userInput.value.trim();

if(pregunta === "") return;

agregarMensaje("usuario", pregunta);

userInput.value = "";


// indicador escribiendo

const typing =
document.createElement("div");

typing.classList.add("mensaje","bot");

typing.id = "typing";

typing.innerHTML = "Escribiendo...";

chatBox.appendChild(typing);

chatBox.scrollTop =
chatBox.scrollHeight;


try{

const response = await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,

{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

contents:[

{
parts:[

{
text:

`
Eres un chatbot oficial de la UASD.

Responde SOLO temas relacionados
con el Estatuto Orgánico de la UASD.

Si la pregunta no está relacionada,
indica que solo puedes responder
temas institucionales de la UASD.

Pregunta:
${pregunta}
`

}

]

}

]

})

}

);


const data =
await response.json();

console.log(data);


// eliminar escribiendo

document.getElementById("typing")?.remove();


// validar respuesta

if(
data.candidates &&
data.candidates.length > 0
){

const respuestaIA =
data.candidates[0]
.content.parts[0].text;

agregarMensaje("bot", respuestaIA);

}else{

throw new Error("Sin respuesta IA");

}


}catch(error){

console.error(error);

document.getElementById("typing")?.remove();


// fallback local

const local =
respuestaLocal(pregunta);

agregarMensaje("bot", local);

}

}


// ===============================
// ENTER
// ===============================

userInput.addEventListener(
"keypress",
function(e){

if(e.key === "Enter"){

enviarPregunta();

}

}
);


// ===============================
// LIMPIAR HISTORIAL
// ===============================

function limpiarChat(){

localStorage.removeItem(
"historialUASD"
);

location.reload();

}
