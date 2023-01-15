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

let botonReverse=document.getElementById('reverse');
let botonFlip=document.getElementById('flip');
let botonSend=document.getElementById('send');
let textoSend=document.getElementById('textoSend');
let textoCopy=document.getElementById('copy');

botonReverse.onclick=()=>{
    botonReverse.value=botonReverse.value=='No'?'Sí':'No';
}
botonFlip.onclick=()=>{
    botonFlip.value=botonFlip.value=='No'?'Sí':'No';
}
let texto;
botonSend.onclick=()=>{
    texto=prompt('Escribe el texto');
    if(botonReverse.value=='Sí'){
        texto=Revert(texto);
    }
    if(botonFlip.value=='Sí'){
        texto=Flip(texto);
    }
    textoSend.textContent=texto;
}
textoCopy.onclick=()=>{
    let selected=document.getSelection().rangeCount >0?document.getSelection().getRangeAt(0):false;
    let jejeje=document.createElement('input');
    jejeje.setAttribute("value",textoSend.textContent);
    document.body.appendChild(jejeje);

    jejeje.select();
    document.execCommand('copy');
    if(selected){
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
    document.body.removeChild(jejeje);
    console.log(textoSend.textContent=='');
}
