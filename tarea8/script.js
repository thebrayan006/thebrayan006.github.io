function generarQR(){

let nombre = document.getElementById("nombre").value;
let telefono = document.getElementById("telefono").value;
let email = document.getElementById("email").value;
let direccion = document.getElementById("direccion").value;


// FORMATO VCARD (CLAVE DE LA TAREA)

let vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${nombre}
TEL:${telefono}
EMAIL:${email}
ADR:${direccion}
END:VCARD
`;


// LIMPIAR QR ANTERIOR
document.getElementById("qr").innerHTML = "";


// GENERAR QR
new QRCode(document.getElementById("qr"), {
text: vCard,
width: 200,
height: 200
});

}
