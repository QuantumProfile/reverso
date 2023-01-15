function stringifyList(list){
    let response='';
    for(let i=0;i<list.length;i++){
        response+=list[i];
    }
    return response;
}
function Revert(string){
    let response=[];
    for(let i=string.length-1;i>-1;i--){
        response.push(string[i]);
    }
    return stringifyList(response);
}
function Flip(string){
    let verifier='abcdefghijklmnopqrstuvwxyz?!_})]<>[({‾¡¿zʎxʍʌnʇsɹbdouɯlʞɾıɥƃɟǝpɔqɐ';
    let searcher='ɐqɔpǝɟƃɥıɾʞlɯuodbɹsʇnʌʍxʎz¿¡‾{([><])}_!?zyxwvutsrqponmlkjihgfedcba';
    let response=[];
    for(let i=0;i<string.length;i++){
        let character=string[i].toLowerCase();
        for(let j=0;j<verifier.length;j++){
            if(string[i].toLowerCase()==verifier[j])character=searcher[j];
        }
        response.push(character);
    }
    return Revert(stringifyList(response));
}
function saltoDeLinea(){
    let salto=document.createElement('br');
    document.body.appendChild(salto);
}
function escribirParrafo(id,texto){
    let elemento=document.createElement('p');
    elemento.id=id;
    elemento.textContent=texto;
    document.body.appendChild(elemento);
    return elemento;
}
function crearBoton(id,texto,salto=false){
    let elemento=document.createElement('input');
    elemento.id=id;elemento.type='button';
    elemento.value=texto;
    document.body.appendChild(elemento);
    if(salto){
        saltoDeLinea();
        saltoDeLinea();
    }
    return elemento;
}
function copiar(texto){
    let copiador=document.createElement('input');
    document.body.appendChild(copiador);
    copiador.value=texto;
    copiador.select();
    document.execCommand('copy');
    document.body.removeChild(copiador);
}
function botonCopiar(idBoton,text,idText,success,elemento){
    let boton=crearBoton(idBoton,text);
    let mensaje=escribirParrafo(idText,'');
    boton.onclick=()=>{
        copiar(elemento.textContent);
        if(elemento.textContent!='')mensaje.textContent=success;
    };
    return {
        boton:boton,mensaje:mensaje,
        funcion:()=>{
            if(mensaje.textContent)mensaje.textContent='';
        }
    };
}
let texto;
let escribirTexto=crearBoton('input','Insertar texto');
let volerUsar=crearBoton('repeat','Volver a usar mismo texto');
let textosSimples=[];
textosSimples[0]=escribirParrafo('1','Texto original:');
let textoOriginal=escribirParrafo('original',texto);
textosSimples[1]=botonCopiar('c1','Copiar','t1','Se ha copiado correctamente',textoOriginal);
textosSimples[2]=escribirParrafo('2','Espejo horizontal?');
let botonReverse=crearBoton('reverse','No');
textosSimples[3]=escribirParrafo('3','Girar 180º?');
let botonFlip=crearBoton('flip','No');
textosSimples[4]=escribirParrafo('4','El texto transformado queda:');
let textoFinal=escribirParrafo('final','');
textosSimples[5]=botonCopiar('c2','Copiar','t2','Se ha copiado correctamente',textoFinal);



escribirTexto.onclick=()=>{
    texto=prompt('Escribe el texto');
    textoOriginal.textContent=texto;
    textoFinal.textContent=texto;
    textosSimples[1].mensaje.textContent='';
    textosSimples[5].mensaje.textContent='';
    botonReverse.value='No';
    botonFlip.value='No';
};
volerUsar.onclick=()=>{
    texto=textoOriginal.textContent;
    textoFinal.textContent=texto;
    textosSimples[1].mensaje.textContent='';
    textosSimples[5].mensaje.textContent='';
    botonReverse.value='No';
    botonFlip.value='No';
};
botonReverse.onclick=()=>{
    botonReverse.value=botonReverse.value=='No'?'Sí':'No';
    texto=Revert(texto);
    textoFinal.textContent=texto;
    textosSimples[1].mensaje.textContent='';
    textosSimples[5].mensaje.textContent='';
};
botonFlip.onclick=()=>{
    botonFlip.value=botonFlip.value=='No'?'Sí':'No';
    texto=Flip(texto);
    textoFinal.textContent=texto;
    textosSimples[1].mensaje.textContent='';
    textosSimples[5].mensaje.textContent='';
};
