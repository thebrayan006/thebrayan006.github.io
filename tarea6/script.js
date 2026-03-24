let menuData = [
{
id:1,
nombre:"Inicio",
enlace:"inicio",
submenu:[]
},

{
id:2,
nombre:"Productos",
enlace:"#",
submenu:[
{
id:21,
nombre:"Laptops",
contenido:"Tenemos laptops HP, Dell, Lenovo con excelente rendimiento."
},
{
id:22,
nombre:"Celulares",
contenido:"Disponemos de celulares Samsung, iPhone y Xiaomi."
}
]
},

{
id:3,
nombre:"Servicios",
enlace:"#",
submenu:[
{
id:31,
nombre:"Reparación",
contenido:"Servicio técnico especializado para computadoras y celulares."
},
{
id:32,
nombre:"Soporte",
contenido:"Ofrecemos soporte técnico remoto y presencial."
}
]
},

{
id:4,
nombre:"Contacto",
enlace:"contacto",
submenu:[]
}

]

function renderMenu(){

let nav=document.getElementById("menu")

nav.innerHTML=""

menuData.forEach(item=>{

let li=document.createElement("li")

if(item.submenu.length>0){

li.innerHTML=`${item.nombre}`

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

li.innerHTML=`<a href="#">${item.nombre}</a>`

li.onclick=()=>mostrarContenido("Bienvenido a la sección "+item.nombre)

}

nav.appendChild(li)

})

}

function mostrarContenido(texto){

let cont=document.getElementById("contenido")

cont.innerHTML=`

<h2>Información</h2>

<p>${texto}</p>

`

}

renderMenu()
