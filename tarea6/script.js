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
link:"diseno-web.html"
},
{
id:22,
nombre:"Marketing",
link:"marketing.html"
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

/* ========================= */
/* GUARDAR MENU */
/* ========================= */

function guardarMenu(){

localStorage.setItem("menuData",JSON.stringify(menuData))

}

/* ========================= */
/* NORMALIZAR DATOS */
/* EVITA QUE EL MENU SE ROMPA */
/* ========================= */

function normalizarMenu(){

menuData.forEach(item=>{

if(!Array.isArray(item.submenu)){
item.submenu=[]
}

})

}

/* ========================= */
/* RENDER DEL MENU */
/* ========================= */

function renderMenu(){

normalizarMenu()

let nav=document.getElementById("menu")

if(!nav) return

nav.innerHTML=""

menuData.forEach(item=>{

let li=document.createElement("li")

li.innerHTML=`${item.icon || ""} ${item.nombre || ""}`

/* SI TIENE SUBMENU */

if(Array.isArray(item.submenu) && item.submenu.length>0){

let ul=document.createElement("ul")

item.submenu.forEach(sub=>{

let subli=document.createElement("li")

let link=document.createElement("a")

link.href=sub.link || "#"
link.textContent=sub.nombre || "Submenu"

link.style.color="white"
link.style.textDecoration="none"
link.style.display="block"
link.style.padding="8px 15px"

subli.appendChild(link)

ul.appendChild(subli)

})

li.appendChild(ul)

}

/* SI NO TIENE SUBMENU */

else{

li.onclick=()=>mostrarContenido(item.contenido || "")

}

nav.appendChild(li)

})

}

/* ========================= */
/* MOSTRAR CONTENIDO */
/* ========================= */

function mostrarContenido(texto){

let cont=document.getElementById("contenido")

if(!cont) return

cont.innerHTML=`

<h2>Información</h2>

<p>${texto}</p>

`

}

/* ========================= */
/* FUNCIONES ADMIN */
/* ========================= */

function agregarMenu(nombre,contenido){

if(!nombre) return

menuData.push({

id:Date.now(),
nombre:nombre,
icon:"📌",
contenido:contenido || "",
submenu:[]

})

guardarMenu()
renderMenu()

}

function agregarSubmenu(idPadre,nombre,link){

let padre = menuData.find(i=>i.id==idPadre)

if(!padre) return

if(!Array.isArray(padre.submenu)){
padre.submenu=[]
}

padre.submenu.push({

id:Date.now(),
nombre:nombre || "Submenu",
link:link || "#"

})

guardarMenu()
renderMenu()

}

function eliminarMenu(id){

menuData = menuData.filter(item=>item.id!=id)

guardarMenu()
renderMenu()

}

function editarMenu(id,nombre,contenido){

let item = menuData.find(i=>i.id==id)

if(!item) return

item.nombre = nombre || item.nombre
item.contenido = contenido || item.contenido

guardarMenu()
renderMenu()

}

/* ========================= */
/* INICIAR MENU */
/* ========================= */

normalizarMenu()
renderMenu()
