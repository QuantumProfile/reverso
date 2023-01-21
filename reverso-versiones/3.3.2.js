/**Una clase, que es como una especie de generador de cosas
 * a las que les llamo categorías, que funcionan como las clases de css,
 * pero para implementarlo en javascript xd
 */
class Category{
    constructor(element,name){
        this.name=name;
        this.style=element.style;
        this.childs=[];
        this.joinedElements=[];
    }
    appendChild(category){
        category.style=this.style;
        this.childs.push(category);
    }
    setStyle(element){
        let style=element.style;
        let childs=this.childs;
        let childsSize=this.childs.length;
        this.style=style;
        for(let i=0;i<childsSize;i++){
            childs[i].style=style;
        }
    }
    join(element){
        let repeated=false;
        let joinedElements=this.joinedElements;
        let joinedElementsSize=joinedElements.length;
        for(let i=0;i<joinedElementsSize;i++){
            if(element!=joinedElements[i].element)continue;
            repeated=true;break;
        }
        if(!repeated)this.joinedElements.push({element:element,originalStyle:element.style});
        element.style=this.style;
    }
    leave(element){
        let joinedElements=this.joinedElements
        let joinedElementsSize=joinedElements.length;
        for(let i=0;i<joinedElementsSize;i++){
            if(element!=joinedElements[i].element)continue;
            element.style=joinedElements[i].originalStyle;
            joinedElements.splice(i,1);break;
        }
    }
}
/**Esta clase va a tener los metodos necesarios para hacer todo lo que
 * podemos hacer en css, pero haciéndolo en javascript
 * Igual como tampoco voy a hacer mucho coso, solo va tener lo que necesito.
 */
class CSSInteracter{
    static mediaQuery(query,actionIf,actionUnless=function(){}){
        let mediaQueryObject=matchMedia(query);
        let trigger=mediaQueryList=>{
            if(mediaQueryList.matches){
                actionIf();
            }
            else{
                actionUnless();
            }
        }
        mediaQueryObject.addListener(trigger);
        trigger(mediaQueryObject);
    }
    /*Estos se llaman Data-attributes
    La notación que se usa es data-nombre
    Ejemplo <p data-nose="hola" style="background: red"></p>*/
    static setCustomAttribute(element,name,value){
        element.setAttribute('data-'+name,value);
    }
    static getCustomAttribute(element,name){
        return element.getAttribute('data-'+name);
    }
    static removeCustomAttribute(element,name){
        element.removeAttribute('data-'+name);
    }
    static hasCustomAttribute(element,name){
        return element.hasAttribute('data-'+name);
    }
    static getCustomAttributesObject(element){
        return element.dataset;
    }
    /*Estos en CSS se ponen con :: después del padre */
    static getPseudoElement(parent,name){
        return getComputedStyle(parent,':'+name);
    }
    /*Estas son variables css, se conocen como 
    Custom Properties, al declararlas en :root,
    se hace con -- al inicio, y el nombre con - 
    en vez de espacios, es la notación*/
    static setVariable(name,value){
        let htmlStyle=document.documentElement.style;
        htmlStyle.setProperty('--'+name,value);
    }
    static getVariable(name){
        let html=document.documentElement;
        return getComputedStyle(html).getPropertyValue('--'+name);
    }
    //Esto es completamente inutil :)
    /*En css para poner varias clases se separan con espacios*/
    static getClassList(element){
        return element.classList;
    }
}

class HTMLInteracter{
    constructor(){
        this.elementList=[];
    }
    addElement(type,parent=document.body){
        let element=document.createElement(type);
        parent.appendChild(element);
        this.elementList.push({element:element,childs:[]});
    }
    removeElement(index,parent=document.body){
        parent.removeChild(this.elementList[index].element);
        this.elementList.splice(index,1);
    }
    getStyle(index){
        return this.elementList[index].element.style;
    }
    getElement(index){
        return this.elementList[index].element;
    }
    addInside(index,type){
        let parent=this.elementList[index].element;
        let child=document.createElement(type);
        parent.appendChild(child);
        this.elementList[index].childs.push({element:child,childs:[]});
    }
    removeInside(indexOut,indexIn){
        let parent=this.elementList[indexOut].element;
        let childs=this.elementList[indexOut].childs;
        let child=childs[indexIn].element;
        parent.removeChild(child);
        childs.splice(indexIn,1);
    }
    goInside(index){
        let childs=this.elementList[index].childs;
        let element=this.elementList[index].element;
        let response=new HTMLInteracter();
        response.elementList=childs;
        return response;
    }
}

//Utilidades

class Positioner{
    constructor(){
        this.history=[];
    }
    alignInside(parent,child,mode){
        let positioner=document.createElement('div');
        let positionerStyle=positioner.style;
        positionerStyle.width='100%';
        positionerStyle.height='100%';
        positionerStyle.display='flex';
        positionerStyle.flexWrap='wrap';
        if(mode=='top-left'){
            positionerStyle.justifyContent='start';
            positionerStyle.alignContent='start';
        }
        else if(mode=='top-center'){
            positionerStyle.justifyContent='center';
            positionerStyle.alignContent='start';
        }
        else if(mode=='top-right'){
            positionerStyle.justifyContent='end';
            positionerStyle.alignContent='start';
        }
        else if(mode=='center-left'){
            positionerStyle.justifyContent='start';
            positionerStyle.alignContent='center';
        }
        else if(mode=='center'||mode=='center-center'){
            positionerStyle.justifyContent='center';
            positionerStyle.alignContent='center';
        }
        else if(mode=='center-right'){
            positionerStyle.justifyContent='end';
            positionerStyle.alignContent='center';
        }
        else if(mode=='bottom-left'){
            positionerStyle.justifyContent='start';
            positionerStyle.alignContent='end';
        }
        else if(mode=='bottom-center'){
            positionerStyle.justifyContent='center';
            positionerStyle.alignContent='end';
        }
        else if(mode=='bottom-right'){
            positionerStyle.justifyContent='end';
            positionerStyle.alignContent='end';
        }
        this.history.push({positioner:positioner,parent:parent,child:child});
        parent.removeChild(child);
        positioner.appendChild(child);
        parent.appendChild(positioner);
    }
    adjust(parent,child,orientation,min,max,crossSize='100%'){
        let positioner=document.createElement('div');
        let positionerStyle=positioner.style;
        positionerStyle.width='100%';
        positionerStyle.height='100%';
        positionerStyle.display='flex';
        positionerStyle.alignItems='center';
        positionerStyle.flexWrap='wrap';
        let childStyle=child.style;
        childStyle.flexGrow='1';
        if(orientation=='vertical'){
            positionerStyle.flexDirection='column';
            childStyle.width=crossSize;
            childStyle.minHeight=min;
            childStyle.maxHeight=max;
        }
        else if(orientation=='horizontal'){
            positionerStyle.flexDirection='row';
            childStyle.height=crossSize;
            childStyle.minWidth=min;
            childStyle.maxWidth=max;
        }
        this.history.push({positioner:positioner,parent:parent,child:child});
        parent.removeChild(child);
        positioner.appendChild(child);
        parent.appendChild(positioner);
    }
    removePositioner(index){
        let registry=this.history[index];
        registry.parent.removeChild(registry.positioner);
        return registry.child;
    }
    deleteHistory(){
        this.history=[];
    }
}
class Table{
    changeColumnsSize(string){
        let parameters=string.trim().split(' ');
        let columns=this.columns;
        let columnsNumber=columns.length;
        for(let i=0;i<columnsNumber;i++){
            let parameter=parameters[i];
            let columnStyle=columns[i].element.style;
            if(parameter.endsWith('fr')){
                columnStyle.width='0';
                columnStyle.flexGrow=parameter.slice(0,parameter.length-2);
            }
            else{
                columnStyle.width=parameter;
            }
        }
    }
    changeRowsSize(string){
        let parameters=string.trim().split(' ');
        let columns=this.columns;
        let columnsNumber=columns.length;
        for(let i=0;i<columnsNumber;i++){
            let cells=columns[i].cells;
            let cellsNumber=cells.length;
            for(let j=0;j<cellsNumber;j++){
                let parameter=parameters[j];
                let cellStyle=cells[j].style;
                if(parameter.endsWith('fr')){
                    cellStyle.height='0';
                    cellStyle.flexGrow=parameter.slice(0,parameter.length-2);
                }
                else{
                    cellStyle.height=parameter;
                }
            }
        }
    }
    constructor(columns,rows){
        this.columns=[];
        let background=document.createElement('div');
        let backgroundStyle=background.style;
        backgroundStyle.display='flex';
        backgroundStyle.height='100%';
        backgroundStyle.width='100%';
        let columnsNumber=columns.trim().split(' ').length;
        for(let i=0;i<columnsNumber;i++){
            let column=document.createElement('div');
            let columnStyle=column.style;
            columnStyle.height='100%';
            columnStyle.display='flex';
            columnStyle.flexDirection='column';


            let columnCells=[];
            let rowsNumber=rows.trim().split(' ').length;
            for(let j=0;j<rowsNumber;j++){
                let cell=document.createElement('div');
                let cellStyle=cell.style;
                cellStyle.width='100%';
                column.appendChild(cell);
                columnCells.push(cell);
            }
            background.appendChild(column);
            this.columns.push({element:column,cells:columnCells});
            //let asd=this.columns[this.columns.length-1].cells[0].style;
        }
        this.changeColumnsSize(columns);this.changeRowsSize(rows);
        this.element=background;
    }
    getCell(row,column){
        return this.columns[column-1].cells[row-1];
    }
    getStyle(row,column){
        return this.getCell(row,column).style;
    }
    color(color){
        let columns=this.columns;
        let columnsNumber=columns.length;
        for(let i=0;i<columnsNumber;i++){
            let cells=columns[i].cells;
            let cellsNumber=cells.length;
            for(let j=0;j<cellsNumber;j++){
                cells[j].style.backgroundColor=color;
            }
        }
    }
}









//automatico debe ser true


const estadoDefault={
    orientacion:'vertical',
    automatico:false,
    tema:'oscuro',
    animaciones:true,
    extra:true
};
let estado=estadoDefault;
let colores={
    fondo:'#595959',
    fondoPrincipal:'#a6a6a6',
    fondoSecundario:'#7f7f7f',
    bordePrincipal:'#00cc99',
    bordeSecundario:'#6b37ff',
    textos:'white'
};
function setModo(modo){
    if(modo=='oscuro'){
        colores.fondo='#595959';
        colores.fondoPrincipal='#a6a6a6';
        colores.fondoSecundario='#7f7f7f';
        colores.bordePrincipal='#00cc99';
        colores.bordeSecundario='#6b37ff';
        colores.textos='white';
    }
}
let wide=false;


let title=document.createElement('title');
document.head.appendChild(title);
title.textContent='textopro';
let meta2=document.createElement('meta');
document.head.appendChild(meta2);
meta2.name='viewport';
meta2.content='width=device-width, initial-scale=1.0';

CSSInteracter.mediaQuery('(min-width: 981px)',()=>{
    document.body.style.backgroundColor='darkslategray';
    if(estado.automatico||((!(estado.automatico))&&(estado.orientacion=='horizontal')))wide=true;
},()=>{
    document.body.style.backgroundColor='green';
    if(estado.automatico||(!(estado.automatico))&&(estado.orientacion=='vertical'))wide=false;
});
CSSInteracter.mediaQuery('(orientation: landscape',()=>{
    document.body.style.backgroundColor='darkslategray';
    if(estado.automatico||((!(estado.automatico))&&(estado.orientacion=='horizontal')))wide=true;
},()=>{
    document.body.style.backgroundColor='green';
    if(estado.automatico||((!(estado.automatico))&&(estado.orientacion=='vertical')))wide=false;
});
function normalize(){
    let all=document.querySelectorAll('*');
    let allSize=all.length;
    for(let i=0;i<allSize;i++){
        let current=all[i];
        current.style.boxSizing='border-box';
        current.style.padding='0';
        current.style.margin='0';
    }
}

let headStuff=new HTMLInteracter();
normalize();


headStuff.addElement('link',document.head);
headStuff.getElement(0).rel='stylesheet';
headStuff.getElement(0).type='text/css';
headStuff.getElement(0).href='reverso3.css';
headStuff.addElement('link',document.head);
headStuff.getElement(1).rel='stylesheet';
headStuff.getElement(1).href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';

let test=new HTMLInteracter();
test.addElement('div');
test.getElement(0).style.height='100vh';
test.getElement(0).style.width='100vw';

let tablaTest=new Table('1fr','1fr 3fr 2fr 3fr');
test.getElement(0).appendChild(tablaTest.element);
let pos = new Positioner();
pos.adjust(test.getElement(0),tablaTest.element,'vertical','600px','100%','90%');
tablaTest.element.style.backgroundColor=colores.fondo;
tablaTest.element.style.paddingTop='5%';
tablaTest.element.style.paddingBottom='5%';

function insertarTexto(elemento,texto,alineacion='center'){
    elemento.style.display='flex';
    elemento.textContent=texto;
    elemento.style.textAlign='center';
    if(alineacion=='top-left'){
        elemento.style.justifyContent='start';
        elemento.style.alignItems='start';
    }
    else if(alineacion=='top-center'){
        elemento.style.justifyContent='center';
        elemento.style.alignItems='start';
    }
    else if(alineacion=='top-right'){
        elemento.style.justifyContent='end';
        elemento.style.alignItems='start';
    }
    else if(alineacion=='center-left'){
        elemento.style.justifyContent='start';
        elemento.style.alignItems='center';
    }
    else if(alineacion=='center'||alineacion=='center-center'){
        elemento.style.justifyContent='center';
        elemento.style.alignItems='center';
    }
    else if(alineacion=='center-right'){
        elemento.style.justifyContent='end';
        elemento.style.alignItems='center';
    }
    else if(alineacion=='bottom-left'){
        elemento.style.justifyContent='start';
        elemento.style.alignItems='end';
    }
    else if(alineacion=='bottom-center'){
        elemento.style.justifyContent='center';
        elemento.style.alignItems='end';
    }
    else if(alineacion=='bottom-right'){
        elemento.style.justifyContent='end';
        elemento.style.alignItems='end';
    }
}



//-----------------------header
function header(where){
    let header= new Table('1fr 3fr 1fr','1fr');
    let boton=document.createElement('div');
    boton.style.backgroundColor=colores.fondoPrincipal;
    boton.style.minWidth='50px';
    boton.style.minHeight='50px';
    boton.style.padding='10px';
    boton.style.border='2px solid '+colores.bordeSecundario;
    boton.style.borderRadius='5px';
    boton.style.cursor='pointer';
    
    let barras=new Table('1fr','1fr 1fr 1fr 1fr 1fr');
    barras.getCell(1,1).style.backgroundColor='black';
    barras.getCell(3,1).style.backgroundColor='black';
    barras.getCell(5,1).style.backgroundColor='black';
    boton.appendChild(barras.element);
    header.getCell(1,3).appendChild(boton);
    pos.alignInside(header.getCell(1,3),boton,'center');

    insertarTexto(header.getCell(1,2),'Invierte tu texto','bottom-center')
    header.getCell(1,2).style.fontSize='25px';
    header.getCell(1,2).style.fontFamily='Verdana';
    header.getCell(1,2).style.lineHeight='1';
    header.getCell(1,2).style.paddingBottom='5px';
    header.getCell(1,2).style.color=colores.bordePrincipal;

    where.appendChild(header.element);
}

header(tablaTest.getCell(1,1));



function texto(tipo){
    let body=document.createElement('div');
    body.style.width='90%';
    body.style.height='100%';
    //body.style.backgroundColor='red';
    let tablabody=new Table('1fr','1fr 4fr');
    body.appendChild(tablabody.element);
    let type;let coso;let texto;
    if(tipo=='input'){
        type='textarea';
        coso='none';
        texto='Volver a usar mismo texto';


        let repetir=document.createElement('div');
        repetir.style.width='45%';
        repetir.style.height='70%';
        repetir.style.fontSize='11px';
        insertarTexto(repetir,'Volver a usar mismo texto');
        repetir.style.fontFamily='Verdana';
        repetir.style.color=colores.fondo;
        repetir.style.backgroundColor=colores.fondoPrincipal;
        repetir.style.cursor='pointer';
        repetir.style.border='2px solid '+colores.bordePrincipal;
        repetir.style.borderRadius='5px';
        tablabody.getCell(1,1).appendChild(repetir);
    }else if(tipo=='output'){
        type='div';
        coso='auto';
        texto='El texto transformado queda:';

        insertarTexto(tablabody.getCell(1,1),texto);
        tablabody.getCell(1,1).style.fontFamily='Verdana';
        tablabody.getCell(1,1).style.color=colores.textos;
    }
    let cuadro=document.createElement(type);
    let fondo=document.createElement('div');
    if(coso=='auto'){
        cuadro.style.overflow=coso;
    }
    else if(coso=='none'){
        cuadro.placeholder='Insertar texto';
        cuadro.style.resize=coso;
    }
    fondo.style.width='100%';
    fondo.style.height='100%';
    fondo.style.backgroundColor=colores.fondoSecundario;
    fondo.style.border='2px solid '+colores.bordeSecundario;
    fondo.style.borderRadius='5px';
    fondo.style.boxSizing='border-box';
    //fondo.style.display='flex';
    //fondo.style.padding='-50px';

    cuadro.style.width='calc(100% + 4px)';
    cuadro.style.height='80%';
    cuadro.style.backgroundColor=colores.fondoPrincipal;
    cuadro.style.border='2px solid '+colores.bordePrincipal;
    cuadro.style.marginTop='-2px';
    cuadro.style.marginLeft='-2px';
    cuadro.style.borderRadius='5px';
    cuadro.style.boxSizing='border-box';
    //cuadro.style.left='2px';
    
    let botonCopiar=document.createElement('div');
    botonCopiar.style.width='100%';
    //botonCopiar.style.marginLeft='-2px';
    //botonCopiar.style.backgroundColor='darkolivegreen';
    botonCopiar.style.opacity='1';
    //botonCopiar.style.marginTop='-2px';
    botonCopiar.style.height='20%';
    //botonCopiar.style.marginTop='-80%';

    fondo.appendChild(cuadro);
    fondo.appendChild(botonCopiar);
    insertarTexto(botonCopiar,'Copiar');
    botonCopiar.style.fontFamily='Verdana';
    botonCopiar.style.color=colores.textos;
    botonCopiar.style.cursor='pointer';


    botonCopiar.onclick=()=>{
        let mensaje=document.createElement('div');
        mensaje.style.background='#222';
        //mensaje.style.opacity='0.65';
        //mensaje.textContent='Se ha copiado correctamente';
        mensaje.style.position='fixed';
        mensaje.style.bottom='20px';
        mensaje.style.color='white';
        mensaje.style.width='100%';
        mensaje.style.height='10%';
        //mensaje.style.textAlign='center';
        //mensaje.style.alignItems='center';
        //mensaje.style.justifyContent='center';
        //mensaje.style.display='flex';
        //mensaje.className='test';
        mensaje.style.fontSize='20px';
        insertarTexto(mensaje,'Se ha copiado correctamente');
        document.body.appendChild(mensaje);

        //mensaje.style.transitionProperty='opacity';
        //mensaje.style.transitionDuration='20s';
        //mensaje.style.transitionDelay='20s';
        
        let it=0;let op=0.64;
        let disappear=()=>{
            if(it>103){
                clearInterval(time);
                document.body.removeChild(mensaje);
            }
            else if(it>70&&it<103){
                it++;op-=0.02;
                mensaje.style.opacity=op.toString();
            }else it++;
            /*if(it>=20){
                clearInterval(time);
                document.body.removeChild(mensaje);
            }else{
                it++;op-=0.05
                mensaje.style.opacity=op.toString();
            }*/
        }
        let time=setInterval(disappear,10);

        //document.querySelectorAll('.test:click')
    }

    body.appendChild(tablabody.element);
    tablabody.getCell(2,1).appendChild(fondo);
    return {arriba:tablabody.getCell(1,1),fondo:fondo,body:body,cuadro:cuadro,tabla:tablabody};
}


//----------------------body1
function body1(where){
    let body1=texto('input');
    where.appendChild(body1.body);
    pos.alignInside(where,body1.body,'center');
}

body1(tablaTest.getCell(2,1));

//----------------------body2
function body2(where){
    let body2=new Table('1fr 1fr 1fr 1fr','1fr');
    let botones1=new Table('1fr','1fr 1fr');
    let botones2=new Table('1fr','1fr 1fr');
    let botones3=new Table('1fr','1fr 1fr');
    let botones4=new Table('1fr','1fr 1fr');
    body2.getCell(1,1).appendChild(botones1.element);
    body2.getCell(1,2).appendChild(botones2.element);
    body2.getCell(1,3).appendChild(botones3.element);
    body2.getCell(1,4).appendChild(botones4.element);
    console.log(body2.element);

    function setearBotones(padre,boton,accion,tipo,texto,alineacion='center'){
        let colorBorde;let colorFondo;
        let colorBorde2;let colorFondo2;
        let width1;let width2;
        let height1;let height2;
        let tamañoLetra1;let tamañoLetra2;
        let active;
        if(tipo=='tipo 1'){
            colorBorde=colores.bordeSecundario;
            colorFondo=colores.fondoSecundario;
            width1='80%';
            height1='80%';
            width2='100%';
            height2='100%';
            tamañoLetra1='10px';
            tamañoLetra2='12px';
            active='#666';
        }
        else if(tipo=='tipo 2'){
            colorBorde=colores.bordePrincipal;
            colorFondo=colores.fondoPrincipal;
            width1='60%';
            height1='60%';
            width2='70%';
            height2='70%';
            tamañoLetra1='120%';
            tamañoLetra2='150%';
            active='#888';
        }
        let setearstilo=()=>{
            boton.style.border='2px solid '+colorBorde;
            boton.style.borderRadius='5px';
            boton.style.backgroundColor=colorFondo;
            boton.style.width=width1;
            boton.style.height=height1;
            insertarTexto(boton,texto);
            boton.style.cursor='pointer';
            boton.style.color=colores.textos;
            boton.style.fontSize=tamañoLetra1;
        }
        setearstilo();

        colorBorde2=colorBorde;
        colorFondo2=colorFondo;
        let iteracion=0;
        boton.onmousedown=()=>{
            boton.style.backgroundColor=active;
            let asd=setInterval(()=>{
                if(iteracion>25){
                    clearInterval(asd);
                    boton.style.backgroundColor=colorFondo;
                    iteracion=0;
                }else iteracion++;
            },10)
        }
        boton.onmouseover=()=>{
            boton.style.width=width2;
            boton.style.height=height2;
            boton.style.border='3px solid '+colorBorde2;
            boton.style.backgroundColor=colorFondo2;
            boton.style.fontSize=tamañoLetra2;
        }
        boton.onmouseout=setearstilo;
        //boton.onmouseup=setearstilo;
        boton.onclick=()=>{
            accion();
            //boton.style.backgroundColor=active;
        };
        padre.appendChild(boton);
        let posi=new Positioner();
        posi.alignInside(padre,boton,alineacion);
    }

    let IMm=document.createElement('div');
    let Mma=document.createElement('div');
    let espejo=document.createElement('div');
    let girar=document.createElement('div');
    let sinEspacios=document.createElement('div');
    let desPal=document.createElement('div');

    insertarTexto(botones2.getCell(1,1),'Espejo horizontal?');
    botones2.getCell(1,1).style.fontFamily='Verdana';
    botones2.getCell(1,1).style.color=colores.textos;
    insertarTexto(botones3.getCell(1,1),'Girar 180°?');
    botones3.getCell(1,1).style.fontFamily='Verdana';
    botones3.getCell(1,1).style.color=colores.textos;

    setearBotones(botones1.getCell(1,1),IMm,()=>{},'tipo 1','Invertir mayúsculas y minúsculas');
    setearBotones(botones1.getCell(2,1),Mma,()=>{},'tipo 1','Mayúsculas y minúsculas aleatorias');
    setearBotones(botones4.getCell(1,1),sinEspacios,()=>{},'tipo 1','Sin espacios');
    setearBotones(botones4.getCell(2,1),desPal,()=>{},'tipo 1','Desbanear palabras');
    setearBotones(botones2.getCell(2,1),espejo,()=>{},'tipo 2','No','top-center');
    setearBotones(botones3.getCell(2,1),girar,()=>{},'tipo 2','No','top-center');

    


    where.appendChild(body2.element);
}

body2(tablaTest.getCell(3,1));

//----------------------body3
function body3(where){
    let body3=texto('output');
    where.appendChild(body3.body);
    pos.alignInside(where,body3.body,'center');
}

body3(tablaTest.getCell(4,1));

