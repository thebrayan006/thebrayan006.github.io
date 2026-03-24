
let menuData = [];

async function cargarMenu(){

const response = await fetch("menu.json");

const data = await response.json();

menuData = data.menu;

renderMenu();

}

function renderMenu(){

const menuContainer = document.getElementById("menu");

menuContainer.innerHTML="";

const ul=document.createElement("ul");

menuData.forEach(item=>{

const li=document.createElement("li");

const a=document.createElement("a");

a.textContent=item.nombre;

a.href=item.enlace;

li.appendChild(a);

if(item.submenu && item.submenu.length>0){

const subUl=document.createElement("ul");

subUl.classList.add("submenu");

item.submenu.forEach(sub=>{

const subLi=document.createElement("li");

const subA=document.createElement("a");

subA.textContent=sub.nombre;

subA.href=sub.enlace;

subLi.appendChild(subA);

subUl.appendChild(subLi);

});

li.appendChild(subUl);

}

ul.appendChild(li);

});

menuContainer.appendChild(ul);

}

function mostrarLogin(){

document.getElementById("loginBox").classList.toggle("hidden");

}

function login(){

const user=document.getElementById("user").value;

const pass=document.getElementById("pass").value;

if(user==="admin" && pass==="1234"){

alert("Acceso concedido");

document.getElementById("adminControls").classList.remove("hidden");

}else{

alert("Credenciales incorrectas");

}

}

function agregarMenu(){

const nombre=document.getElementById("nuevoNombre").value;

const enlace=document.getElementById("nuevoEnlace").value;

if(!nombre || !enlace){

alert("Complete los campos");

return;

}

const nuevo={

id:Date.now(),

nombre:nombre,

enlace:enlace,

submenu:[]

};

menuData.push(nuevo);

renderMenu();

}

cargarMenu();
