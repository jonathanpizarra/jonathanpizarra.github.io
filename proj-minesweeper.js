/**
 * Check on SoloLearn for the full code
 * https://code.sololearn.com/WY7D7egT4qM1/#
 * 
 * Created by Jonathan Pizarra 
 * 
 * 
 * 
 */

class Minesweeper{
    constructor(){
        this.tab = $("#mine-tab");
        
        //this.stats = $("#mine-stats");
        this.x, this.y, this.z;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        //console.log("w = " + width + " h = " +height);
    
        this.mines = [];
        this.adj = [[0,-1], [1,-1], [1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1]];    
        this.visited = [];
        this.flagged = [];
        this.firstClick = [];
        this.count = 0;
        this.flag = 0;
        // false for counting , true for flagging
        this.flagORcount = false;
        this.timerStart = true;
        this.setInt;
        this.min, this.sec;

        // grid dimensions
        // edit these values if you want a bigger table. have fun.
        this.h = 20;
        this.w = 25;
        //mine count
        //these should always be equal
        this.b = this.flag = 20;
        this.tab.css({"width":(24*this.w)+"px", "height":(24*this.h)+"px"});

        this.clicks = [Math.floor(this.w*this.h/2+this.w/2), 0, this.w, this.w*(this.h-1), this.w*this.h-1];
        this.index = 0;
        this.n = this.clicks[this.index];
        this.to_remove = [];

    }
    
    createTable = (x1,y1)=>{
        //appending tr and td elements to the existing container.
        let content = "";
        for(let y=0; y<y1; y++){
            for(let x=0; x<x1; x++){
                content = $("<pre class='pre'>  </pre>");
                this.tab.append(content);
                this.tab.children().eq((y*x1)+x).css({"top":(y*24)+"px", "left":(x*24)+"px"});
            }
        }

    }

    checkCoordinates = (x,y)=>{
        //takes x and y coordinates and check it. If those are bomb coordinates, return true. False otherwise.
        let tx,ty;
        for(let z=0; z<this.mines.length; z++){
            tx = this.mines[z][0];
            ty = this.mines[z][1];
            if(x == tx && y == ty){
                return true;
            }    
        }
        return false;
    }

    createMines = (w,h,n)=>{
        //create random N number of coordinates for bomb mines.
        let x,y;
        for(let z = 0; z <n; z++){
            do{
                x = Math.floor(Math.random()*w);
                y = Math.floor(Math.random()*h);
            }
            while(this.checkCoordinates(x,y));
            this.mines.push([x,y]);
        }
    }

    checkAdjForMines = (x,y)=>{
        // takes x and y coordinates and check adjacent cells for bomb count
        // this count variable is different from the global count variable.
        let count = 0;
        for(let z=0; z<this.adj.length; z++){
            let tx = x + this.adj[z][0] ;
            let ty = y + this.adj[z][1] ;
            if(tx>=this.w || tx<0 || ty<0 || ty>=this.h){
                continue;
            }
            for(let a=0; a<this.mines.length; a++){
                if(this.mines[a][0] == tx && this.mines[a][1] == ty){
                    // console.log("tx="+tx+" ty="+ty);
                    count++;
                } 
            }      
        }
        return count;
    }

    uponClickingCell = (n)=>{
        //main executing function after clicking a table cell.
        var x = n%this.w;
        var y = Math.floor(n/this.h);
        var adjMineCount = this.checkAdjForMines(x,y);
        //if you clicked a bomb cell
        if(this.checkCoordinates(x,y)){
            this.tab.children().eq(n).html("💥").addClass("red");        
        }
        // if you clicked a cell with no adjacent mines, recurse through out the neighboring cell to uncover other zero-adjacent-mine cells
        else if(adjMineCount === 0){
            this.visited.push([x,y]);
            this.count++;
            this.zeroMines(x,y);
        }
        //if you are good at guessing, continue on playing. prints the number of adjacent mines of the cell you clicked.
        else{
            this.count++;
            this.visited.push([x,y]);
            this.tab.children().eq(n).text(adjMineCount).addClass("d d"+adjMineCount);
            this.index++;
            console.log('indexx:', this.index);
            if(this.index<5){
                this.n = this.clicks[this.index];
                this.simulate_click();
            }
        }
    }

    zeroMines = (x,y)=>{
        //the recursive function for showing other zero-adjacent neighbor cells.
        //count++;
        var flg = this.tab.children().eq( (y*this.w)+x ).text();
        if(flg != "🚩"){
            this.to_remove.push({x: x, y: y, n: 0});
            this.visited.push([x,y]);
        }else if(flg == "🚩"){
            this.count--;
        }
        var zx,zy,cfm,civ,cif;
        for(var z = 0; z<this.adj.length; z++){
            zx = x + this.adj[z][0];
            zy = y + this.adj[z][1];
            cfm = this.checkAdjForMines(zx,zy);
            civ = this.checkIfVisited(zx,zy);
            cif = this.checkIfFlagged(zx,zy);
            // 
            if(zx>=this.w || zx<0 || zy<0 || zy>=this.h){
                continue;
            }
            if(cfm === 0 && !civ && !cif){
                this.count++;
                //console.log("c : " + count)
                this.zeroMines(zx,zy);
            }
            else if(cfm > 0 && !civ){
                this.count++;
                this.visited.push([zx,zy]);
                this.to_remove.push({x: zx, y: zy, n:cfm});

            }
        }

        for(let z=0; z<this.to_remove.length; z++){
            let x = this.to_remove[z].x;
            let y = this.to_remove[z].y;
        
            if(this.to_remove[z].n == 0){
                ((x, y)=>{
                    setTimeout(()=>{
                        this.tab.children().eq( (y*this.w)+x ).text( "0" ).addClass("zero");
                    },z*100);
                })(x, y)
            }else{
                let cfm = this.to_remove[z].n;
                ((zx, zy, cfm)=>{
                    setTimeout(()=>{
                        this.tab.children().eq( (zy*this.w)+zx ).html(cfm).addClass("d d"+cfm);
                    },z*100);
                })(x, y, cfm)
            }
        }
        
        this.to_remove = [];

        // console.log("count : " + count);

            return;
    }

    checkIfVisited = (x,y)=>{
        // safety function that checks if the zero-adjacent cell has already been recursed. 
        for(var z=0; z<this.visited.length; z++){
            if(this.visited[z][0] == x && this.visited[z][1] == y){
                return true;
            }
        }
        return false;
    }

    checkIfFlagged = (x,y)=>{
        for(var q=0; q<this.flagged.length; q++){
            if(x == this.flagged[q][0] && y == this.flagged[q][1]){
                return true;
            }
        }
        return false;
    }

    plantMines(){
        //plants or shows where are the mines.//
        for(x=0; x<mines.length; x++){
        //retain properly flagged mines
        var bomb = tab.children().eq(mines[x][1]*w+ mines[x][0] );
        if(bomb.html() == "🚩" ){
            continue;
        }
        //  console.log(bomb.html())
        bomb.html("💣").removeClass().addClass("mine");//.css("font-size","15px") ;
        }
    }

    checkFirstClick = (x,y)=>{
        //checks if the first clicked cell is a bomb. If so, transfer the mine to another coordinate
        if(this.checkCoordinates(x,y)){
            var newx, newy;
            do{
                newx = Math.floor(Math.random()*this.w);
                newy = Math.floor(Math.random()*this.h);
            }
            while(this.checkCoordinates(newx,newy) && !this.isFirstClick(newx,newy));
            for(let z=0; z<this.mines.length; z++){
                if(this.mines[z][0] == x && this.mines[z][1] == y){
                    this.mines.splice(z,1,[newx,newy]);
                    break;
                }
            }
            return;
        }
    }

    isFirstClick = (x,y)=>{
        if(this.firstClick[0] == x && this.firstClick[1] == y)
            return true;
        return false;    
    }

    //init function
    init = ()=>{
        this.createTable(this.w, this.h);
        this.createMines(this.w, this.h, this.b);
    }

    simulate_click = ()=>{

        if(this.timerStart){
            this.firstClick = [ this.n%this.w,Math.floor(this.n/this.h) ];
            this.checkFirstClick(this.n%this.w,Math.floor(this.n/this.h));
            this.timerStart = false;
        }
        if(!this.flagORcount){
            // console.log("n : " + n)
            // if the cell you clicked is not flagged and not yet recursed.
            if($(this).text() != "🚩" && !this.checkIfVisited(this.n%this.w, Math.floor(this.n/this.h))){
                this.uponClickingCell(this.n);
            }
        }

    }
     
}