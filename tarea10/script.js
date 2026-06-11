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
agregarMensaje(msg.tipo, msg.texto, false);
});


// ===============================
// BASE DE CONOCIMIENTO UASD
// ===============================

const respuestasLocales = {

"que es la uasd":
"La Universidad Autónoma de Santo Domingo (UASD) es la universidad pública de la República Dominicana y la primera universidad del Nuevo Mundo. Fue fundada el 28 de octubre de 1538 y tiene como misión la formación profesional, la investigación y la extensión universitaria.",

"uasd":
"La Universidad Autónoma de Santo Domingo (UASD) es la institución de educación superior pública más importante de la República Dominicana y la primera universidad de América.",

"mision":
"La misión de la UASD es formar profesionales, investigadores y técnicos con valores éticos, pensamiento crítico y compromiso con el desarrollo social, económico y cultural del país.",

"vision":
"La visión de la UASD es consolidarse como una universidad líder, innovadora y de excelencia académica al servicio de la sociedad dominicana.",

"autonomia":
"La autonomía universitaria garantiza la independencia académica, administrativa y financiera de la Universidad Autónoma de Santo Domingo.",

"claustro mayor":
"El Claustro Mayor es el máximo organismo de gobierno universitario. Está integrado por autoridades académicas, docentes y representantes estudiantiles según lo establecido en el Estatuto Orgánico.",

"claustro menor":
"El Claustro Menor es un organismo universitario con funciones académicas y administrativas específicas establecidas por el Estatuto Orgánico.",

"consejo universitario":
"El Consejo Universitario es el principal organismo ejecutivo y administrativo de la UASD. Tiene la responsabilidad de dirigir y coordinar la gestión universitaria.",

"funciones del rector":
"El Rector es la máxima autoridad ejecutiva de la Universidad. Dirige las actividades institucionales, representa oficialmente a la UASD y ejecuta las decisiones de los organismos de gobierno universitario.",

"rector":
"El Rector es la máxima autoridad ejecutiva de la Universidad Autónoma de Santo Domingo.",

"vicerrectores":
"Los Vicerrectores colaboran con el Rector en la dirección académica, administrativa, de investigación y extensión universitaria.",

"facultades":
"Las facultades son unidades académicas encargadas de coordinar carreras, programas y actividades relacionadas con áreas específicas del conocimiento.",

"escuelas":
"Las escuelas son dependencias académicas adscritas a las facultades y tienen a su cargo la administración de carreras y programas de estudio.",

"decanos":
"Los Decanos son las máximas autoridades de las facultades y tienen la responsabilidad de dirigir y coordinar sus actividades académicas y administrativas.",

"estudiantes":
"Los estudiantes de la UASD tienen derechos y deberes establecidos en el Estatuto Orgánico, incluyendo participar en la vida universitaria y cumplir las normas institucionales.",

"derechos de los estudiantes":
"Los estudiantes tienen derecho a recibir educación de calidad, participar en los organismos universitarios y acceder a los servicios académicos ofrecidos por la institución.",

"deberes de los estudiantes":
"Los estudiantes deben cumplir las normas universitarias, respetar la comunidad académica y contribuir al prestigio institucional.",

"docentes":
"El personal docente tiene derechos y responsabilidades relacionados con la enseñanza, la investigación y la extensión universitaria.",

"derechos del personal docente":
"Los docentes tienen derecho a la libertad académica, capacitación profesional y participación en los organismos universitarios establecidos.",

"deberes del personal docente":
"Los docentes deben cumplir sus funciones académicas con ética, responsabilidad y compromiso institucional.",

"investigacion":
"La investigación constituye una de las funciones fundamentales de la UASD y contribuye al desarrollo científico, tecnológico y social.",

"extension":
"La extensión universitaria fortalece la relación entre la Universidad y la sociedad mediante programas de servicio y desarrollo comunitario.",

"postgrado":
"La UASD desarrolla programas de postgrado destinados a la especialización y formación avanzada de profesionales.",

"bienestar universitario":
"El bienestar universitario busca mejorar la calidad de vida de estudiantes, docentes y personal administrativo mediante diversos servicios institucionales.",

"recintos":
"Los recintos universitarios son dependencias académicas y administrativas creadas para ampliar la cobertura de la educación superior en distintas regiones del país.",

"centros universitarios":
"Los centros universitarios permiten extender los servicios académicos de la UASD a diferentes provincias de la República Dominicana.",

"representacion estudiantil":
"La representación estudiantil garantiza la participación de los estudiantes en los organismos de gobierno universitario.",

"patrimonio universitario":
"El patrimonio universitario está constituido por los bienes, recursos financieros y derechos que pertenecen a la institución.",

"regimen disciplinario":
"El régimen disciplinario establece las normas y procedimientos aplicables a faltas cometidas por miembros de la comunidad universitaria."

};


// ===============================
// AGREGAR MENSAJE
// ===============================

function agregarMensaje(tipo, texto, guardar = true){

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

if(guardar){

historial.push({
tipo,
texto
});

localStorage.setItem(
"historialUASD",
JSON.stringify(historial)
);

}

}


// ===============================
// NORMALIZAR TEXTO
// ===============================

function normalizar(texto){

return texto
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"")
.replace(/[¿?.,]/g,"");

}


// ===============================
// BUSQUEDA
// ===============================

function respuestaLocal(texto){

texto = normalizar(texto);

for(let clave in respuestasLocales){

let claveNormalizada =
normalizar(clave);

if(texto.includes(claveNormalizada)){

return respuestasLocales[clave];

}

}

return "Lo siento, no encontré información específica sobre esa consulta dentro de la base de conocimiento actual del Estatuto Orgánico de la UASD.";

}


// ===============================
// ENVIAR PREGUNTA
// ===============================

function enviarPregunta(textoManual = null){

const pregunta =
textoManual || userInput.value.trim();

if(pregunta === "") return;

agregarMensaje("usuario", pregunta);

userInput.value = "";

const typing =
document.createElement("div");

typing.classList.add(
"mensaje",
"bot"
);

typing.id = "typing";

typing.innerHTML =
"Escribiendo...";

chatBox.appendChild(typing);

chatBox.scrollTop =
chatBox.scrollHeight;

setTimeout(() => {

document
.getElementById("typing")
?.remove();

const respuesta =
respuestaLocal(pregunta);

agregarMensaje(
"bot",
respuesta
);

},800);

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
// LIMPIAR CHAT
// ===============================

function limpiarChat(){

localStorage.removeItem(
"historialUASD"
);

location.reload();

}
