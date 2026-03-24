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
contenido:"Creamos páginas web modernas.",
submenu:[
{
id:211,
nombre:"Landing Pages",
contenido:"Creamos landing pages profesionales."
},
{
id:212,
nombre:"Tiendas Online",
contenido:"Desarrollamos ecommerce completos."
}
]
},

{
id:22,
nombre:"Marketing",
contenido:"Servicios de marketing digital.",
submenu:[
{
id:221,
nombre:"SEO",
contenido:"Optimización para motores de búsqueda."
},
{
id:222,
nombre:"Publicidad",
contenido:"Campañas publicitarias profesionales."
}
]
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

li.innerHTML=`${item.icon || "📁"} ${item.nombre}`

if(item.submenu && item.submenu.length>0){

let ul=document.createElement("ul")

item.submenu.forEach(sub=>{

let subli=document.createElement("li")

subli.innerText=sub.nombre

if(sub.submenu && sub.submenu.length>0){

let ul3=document.createElement("ul")

sub.submenu.forEach(n3=>{

let li3=document.createElement("li")

li3.innerText=n3.nombre

li3.onclick=()=>mostrarContenido(n3.contenido)

ul3.appendChild(li3)

})

subli.appendChild(ul3)

}

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

function agregarSubmenu(id,nombre){

menuData.forEach(item=>{

if(item.id==id){

item.submenu.push({

id:Date.now(),
nombre:nombre,
contenido:"Contenido generado desde el panel administrador",
submenu:[]

})

}

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
