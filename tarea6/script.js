let menuData=[]

async function cargarMenu(){

const local=localStorage.getItem("menuData")

if(local){

menuData=JSON.parse(local)

renderMenu()

renderAdmin()

return

}

const response=await fetch("menu.json")

const data=await response.json()

menuData=data.menu

guardarDatos()

renderMenu()

renderAdmin()

}

function guardarDatos(){

localStorage.setItem("menuData",JSON.stringify(menuData))

}

function renderMenu(){

const menu=document.getElementById("menu")

menu.innerHTML=""

const ul=document.createElement("ul")

menuData.forEach(item=>{

const li=document.createElement("li")

const a=document.createElement("a")

a.textContent=item.nombre

a.href=item.enlace

li.appendChild(a)

if(item.submenu && item.submenu.length>0){

const sub=document.createElement("ul")

item.submenu.forEach(s=>{

const subLi=document.createElement("li")

const subA=document.createElement("a")

subA.textContent=s.nombre

subA.href=s.enlace

subLi.appendChild(subA)

sub.appendChild(subLi)

})

li.appendChild(sub)

}

ul.appendChild(li)

})

menu.appendChild(ul)

}

function agregarMenu(){

const nombre=document.getElementById("nombreMenu").value
const enlace=document.getElementById("enlaceMenu").value

if(!nombre || !enlace){

alert("Complete los campos")

return

}

const nuevo={
id:Date.now(),
nombre:nombre,
enlace:enlace,
submenu:[]
}

menuData.push(nuevo)

guardarDatos()

renderMenu()

renderAdmin()

}

function renderAdmin(){

const lista=document.getElementById("listaAdmin")

lista.innerHTML=""

menuData.forEach(item=>{

const li=document.createElement("li")

li.innerHTML=`
${item.nombre}
<button onclick="editarMenu(${item.id})">Editar</button>
<button onclick="eliminarMenu(${item.id})">Eliminar</button>
`

lista.appendChild(li)

})

}

function eliminarMenu(id){

menuData=menuData.filter(m=>m.id!==id)

guardarDatos()

renderMenu()

renderAdmin()

}

function editarMenu(id){

const nuevoNombre=prompt("Nuevo nombre")

const nuevoLink=prompt("Nuevo enlace")

menuData.forEach(m=>{

if(m.id===id){

m.nombre=nuevoNombre
m.enlace=nuevoLink

}

})

guardarDatos()

renderMenu()

renderAdmin()

}

function mostrarLogin(){

document.getElementById("loginBox").classList.toggle("hidden")

}

function login(){

const user=document.getElementById("user").value
const pass=document.getElementById("pass").value

if(user==="admin" && pass==="1234"){

alert("Acceso concedido")

document.getElementById("adminPanel").classList.remove("hidden")

}else{

alert("Credenciales incorrectas")

}

}

function toggleMenu(){

const menu=document.querySelector("#menu ul")

menu.classList.toggle("active")

}

cargarMenu()
