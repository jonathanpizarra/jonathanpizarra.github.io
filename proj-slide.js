
class SlidePuzzle{
    constructor(container){
               
        this.container = $(container);
        this.cell_count = 0;
        this.titles = ["The Quote"];
        this.images = ["images/quote.jpg"];
        this.arrSize = [6]; // board sizes for every level. should be divisible by n.
        this.level = 1;
        this.current_level_moves = 0;
        this.moves_per_level = [];
        this.total_moves = 0;
        this.n = 300; // base width and height for images.
        this.size = this.n / this.arrSize[this.level-1] // width and height of each piece. 
        this.speed = 500; // speed of random moves
        this.random_moves = 500000;

        this.create_table();
    }

    create_table = ()=>{
        // resetting previous values
        this.table = $('<table border="0" id="slide-puzzle-table" class="table1"></table>');
        this.cell_count = 0;

        // populating table with td. 
        // populating current_state and solved_state.
        for(let i=0; i<this.arrSize[this.level-1]; i++) {
            let row = $('<tr></tr>');
            for(let j=0; j<this.arrSize[this.level-1]; j++){
                this.cell_count++;
                let cell = $('<td class="cell" data-xy="' + j + "," + i + '" data-value="' + this.cell_count + '">' + '' + '</td>');
                cell.css({"top": (this.size*i) + "px", "left": (this.size*j) + "px", "width": this.size, "height": this.size});                
                row.append(cell);
                this.add_image(cell);
            }
            this.table.append(row);
        }

        this.container.html("").append(this.table); // appending to container
        this.last_cell = $(".cell").last(); // getting the last cell.
        this.last_cell.addClass("last_cell"); // making the last cell invisible
    }

    // adding appropriate background image parts for each piece.
    add_image = (c)=>{
        let xy = c.attr("data-xy").split(",");
        let x = xy[0];
        let y = xy[1];
        let top = y * this.size;
        let right = this.size * (this.arrSize[this.level-1] - x - 1);
        let bottom = this.size * (this.arrSize[this.level-1] - y - 1);
        let left = x * this.size;

        c.css("background-image", "url(" + this.images[this.level-1] + ")");
        //c.css("clip-path", "inset(" + top + "px " + right + "px " + bottom + "px " + left + "px )");
        c.css("background-position", " " + (this.n - left) + "px  " + (this.n - top) + "px");
    }

    swap_cell = (cell)=>{
        // swapping cells using data attributes instead of array data.
        let attr = cell.attr("data-xy");
        cell.attr("data-xy", this.last_cell.attr("data-xy"));
        this.last_cell.attr("data-xy", attr);
        
        // coercing the values into integer to avoid string concatenation.
        let x = +attr.split(",")[0];
        let y = +attr.split(",")[1];
        this.last_cell.css({"top":y * this.size, "left":x * this.size});
        
        attr = cell.attr("data-xy");
        x = +attr.split(",")[0];
        y = +attr.split(",")[1];
        cell.css({"top":y * this.size, "left":x * this.size});
    }

    check_if_swappable = (c)=>{
        // check using data attribute of clicked element
        // checking if clicked element is neighbor of last_cell
        let data = c.attr("data-xy").split(",");
        let data_x = data[0];
        let data_y = data[1];

        let last = this.last_cell.attr("data-xy").split(",");
        let last_x = last[0];
        let last_y = last[1];

        // if the clicked cell is not the last_cell
        if(this.last_cell.attr("data-value") != c.attr("data-value")){
            // if both x values are the same, they are in same column
            if(data_x == last_x){
                // to determine if they are neighbors, 
                // the absolute value of their y difference should be 1
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

    check_if_solved = ()=> this.solved_state.join("-") == this.current_state.flat(2).join("-");
    
    randomize = ()=>{
        this.animation = setInterval(()=>{
            
            let neighbors = [];
            let xy = this.last_cell.attr("data-xy").split(",");
            let x = xy[0], y = xy[1];
           
            // getting last_cell neighbors
            if(+y + 1 < this.arrSize[this.level-1] ) neighbors.push({x:+x, y:+y+1});
            if(+y - 1 >= 0) neighbors.push({x:+x, y:+y-1});
            if(+x - 1 >= 0) neighbors.push({x:+x-1, y:+y});
            if(+x + 1 < this.arrSize[this.level-1]) neighbors.push({x:+x+1, y:+y});
            // chose one neighbor
            this.chosen = neighbors[Math.floor(Math.random() * neighbors.length)];   
            this.chosen = $("td[data-xy='" + this.chosen.x + "," + this.chosen.y + "']");

            if(this.current_level_moves == 0){
                this.previous_move = this.chosen;
            }else{
                while(this.previous_move.attr("data-value") == this.chosen.attr("data-value")){
                    this.chosen = neighbors[Math.floor(Math.random() * neighbors.length)];   
                    this.chosen = $("td[data-xy='" + this.chosen.x + "," + this.chosen.y + "']");
                }
                this.previous_move = this.chosen;
            }
            
            this.swap_cell(this.chosen);
            this.current_level_moves++;
        }, this.speed);
    }

    stop = ()=>{
        clearInterval(this.animation);
    }

}


