let menuData = JSON.parse(localStorage.getItem("menuData")) || [

{
id:1,
nombre:"Inicio",
icon:"🏠",
contenido:"Bienvenido a nuestro sitio web.",
submenu:[]
},

{
id:2,
nombre:"Servicios",
icon:"💼",
submenu:[

{
id:21,
nombre:"Diseño Web",
contenido:"Creamos páginas web modernas."
},

{
id:22,
nombre:"Marketing",
contenido:"Servicios de marketing digital."
}

]

},

{
id:3,
nombre:"Contacto",
icon:"📞",
contenido:"Puedes contactarnos vía email o teléfono.",
submenu:[]
}

]

function guardarMenu(){
localStorage.setItem("menuData",JSON.stringify(menuData))
}

function renderMenu(){

let nav=document.getElementById("menu")

if(!nav) return

nav.innerHTML=""

menuData.forEach(item=>{

let li=document.createElement("li")

li.innerHTML=`${item.icon || ""} ${item.nombre}`

if(item.submenu && item.submenu.length>0){

let ul=document.createElement("ul")

item.submenu.forEach(sub=>{

let subli=document.createElement("li")

subli.innerText=sub.nombre

subli.onclick=()=>mostrarContenido(sub.contenido)

ul.appendChild(subli)

})

li.appendChild(ul)

}

else{

li.onclick=()=>mostrarContenido(item.contenido)

}

nav.appendChild(li)

})

}

function mostrarContenido(texto){

let cont=document.getElementById("contenido")

if(!cont) return

cont.innerHTML=`

<h2>Información</h2>

<p>${texto}</p>

`

}

function agregarMenu(nombre,enlace){

menuData.push({

id:Date.now(),
nombre:nombre,
icon:"📁",
contenido:enlace,
submenu:[]

})

guardarMenu()

}

function eliminarMenu(id){

menuData=menuData.filter(item=>item.id!=id)

guardarMenu()

}

function editarMenu(id,nombre,enlace){

menuData.forEach(item=>{

if(item.id==id){

item.nombre=nombre
item.contenido=enlace

}

})

guardarMenu()

}

renderMenu()
