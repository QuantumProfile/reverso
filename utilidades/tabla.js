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
