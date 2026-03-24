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

/* CREAR ENLACE REAL */

let link=document.createElement("a")

link.href=sub.link
link.textContent=sub.nombre
link.style.color="white"
link.style.textDecoration="none"
link.style.display="block"
link.style.padding="8px 15px"

subli.appendChild(link)

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

renderMenu()
