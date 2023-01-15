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
    static setVariable(name,value){
        let htmlStyle=document.documentElement.style;
        htmlStyle.setProperty('--'+name,value);
    }
    static getVariable(name){
        let html=document.documentElement;
        return getComputedStyle(html).getPropertyValue('--'+name);
    }
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
