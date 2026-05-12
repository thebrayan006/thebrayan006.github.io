let grafico = null;

function generarGrafico(){

let enero = document.getElementById("enero").value;
let febrero = document.getElementById("febrero").value;
let marzo = document.getElementById("marzo").value;
let abril = document.getElementById("abril").value;
let mayo = document.getElementById("mayo").value;
let junio = document.getElementById("junio").value;


let datos = [

enero,
febrero,
marzo,
abril,
mayo,
junio

];


let ctx = document.getElementById("miGrafico").getContext("2d");


// ELIMINAR GRAFICO ANTERIOR
if(grafico != null){

grafico.destroy();

}


// CREAR NUEVO GRAFICO
grafico = new Chart(ctx, {

type:'bar',

data:{

labels:[

'Enero',
'Febrero',
'Marzo',
'Abril',
'Mayo',
'Junio'

],

datasets:[{

label:'Ventas Mensuales',

data:datos,

borderWidth:1

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:true
}

},

scales:{

y:{
beginAtZero:true
}

}

}

});

}
