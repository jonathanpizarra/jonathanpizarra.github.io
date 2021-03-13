
class SlidePuzzle{
    constructor(container){
        this.container = $(container);
        this.cell_count = 0;
        this.arrSize = [3, 4, 5, 5, 6];
        this.level = 1;
        this.moves = 0;
        this.total_moves = 0;
        this.size = 40; // should be the same as .cell width and height in css

        this.create_table();
        this.bind_events();
    }

    create_table = ()=>{
        this.table = $('<table border="0" class="table1"></table>');
        for(let i=0; i<this.arrSize[this.level-1]; i++) {
            let row = $('<tr></tr>');
            for(let j=0; j<this.arrSize[this.level-1]; j++){
                this.cell_count++;
                let cell = $('<td class="cell" data-xy="' + j + "," + i + '" data-value="' + this.cell_count + '">' + this.cell_count + '</td>');
                cell.css({"top": (this.size*i) + "px", "left": (this.size*j) + "px"});
                row.append(cell);
            }
            this.table.append(row);
        }
        this.container.append(this.table);
        this.last_cell = $(".cell").last();
    }

    bind_events = ()=>{
        this.cells = $(".cell");
        this.cells.on("click", (e)=>{
            //console.log($(e.currentTarget).attr("data-xy"), "::", $(e.currentTarget).attr("data-value"))
            //console.log("last cell:", this.last_cell.attr("data-xy"), "::", this.last_cell.attr("data-value"))
            let swappable = this.check_if_swappable($(e.currentTarget));
            if(swappable){
                let attr = $(e.currentTarget).attr("data-xy");
                $(e.currentTarget).attr("data-xy", this.last_cell.attr("data-xy"));
                this.last_cell.attr("data-xy", attr);

                let x = attr.split(",")[0];
                let y = attr.split(",")[1];
                this.last_cell.css({"top":y * this.size, "left":x * this.size});

                attr = $(e.currentTarget).attr("data-xy");
                x = attr.split(",")[0];
                y = attr.split(",")[1];
                $(e.currentTarget).css({"top":y * this.size, "left":x * this.size}); 
            }
        }); 
        
    }

    check_if_swappable = (c)=>{
        let data = c.attr("data-xy").split(",");
        let data_x = data[0];
        let data_y = data[1];

        let last = this.last_cell.attr("data-xy").split(",");
        let last_x = last[0];
        let last_y = last[1];

        if(this.last_cell.attr("data-value") != c.attr("data-value")){
            if(data_x == last_x){
                if(Math.abs(data_y - last_y) == 1){
                    return true;
                }
                return false;
            }else if(data_y == last_y){
                if(Math.abs(data_x - last_x) == 1){
                    return true;
                }
                return false;
            }
        }
        return false;
    }



}
