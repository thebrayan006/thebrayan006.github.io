let menuData=[];

async function cargarMenu(){

let savedMenu=localStorage.getItem("menuData");

if(savedMenu){

menuData=JSON.parse(savedMenu);
renderMenu(menuData);

}else{

let response=await fetch("./menu.json");
let data=await response.json();

menuData=data.menu;

renderMenu(menuData);

}

}

function renderMenu(menu){

const menuContainer=document.querySelector("#menu ul");

if(!menuContainer) return;

menuContainer.innerHTML="";

menu.forEach(item=>{

let li=document.createElement("li");

let a=document.createElement("a");

a.href=item.enlace;
a.textContent=item.nombre;

li.appendChild(a);

if(item.submenu){

let subUl=document.createElement("ul");

item.submenu.forEach(sub=>{

let subLi=document.createElement("li");

let subA=document.createElement("a");

subA.href=sub.enlace;
subA.textContent=sub.nombre;

subLi.appendChild(subA);

subUl.appendChild(subLi);

});

li.appendChild(subUl);

}

menuContainer.appendChild(li);

});

}

function guardarMenu(){

localStorage.setItem("menuData",JSON.stringify(menuData));

renderMenu(menuData);

}

function agregarMenu(nombre,enlace){

let id=Date.now();

menuData.push({
id,
nombre,
enlace
});

guardarMenu();

}

function eliminarMenu(id){

menuData=menuData.filter(item=>item.id!=id);

guardarMenu();

}

function editarMenu(id,nombre,enlace){

menuData=menuData.map(item=>{

if(item.id==id){

item.nombre=nombre;
item.enlace=enlace;

}

return item;

});

guardarMenu();

}

document.addEventListener("DOMContentLoaded",cargarMenu);
