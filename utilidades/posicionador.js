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
