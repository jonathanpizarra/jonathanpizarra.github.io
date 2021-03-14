//////// variables  ///////////
let cout = (t)=>console.log(t);
/////////////////////////////////////

class Piece{
   constructor(){
       this.rand = Math.floor( Math.random()*7 );
       this.piece = Piece.pieces[this.rand];
       this.color = Piece.colors[this.rand];
   };
   
   static getColor (ind){
       return Piece.colors[ind];
   }
}

Piece.T = [[0,0,0],
           [1,1,1],
           [0,1,0]
          ],
          
Piece.L = [[2,0,0],
           [2,0,0],
           [2,2,0]],

Piece.J = [[0,0,3],
           [0,0,3],
           [0,3,3]],

Piece.S = [[0,0,0],
           [0,4,4],
           [4,4,0]],

Piece.Z = [[0,0,0],
           [5,5,0],
           [0,5,5]],
     
Piece.O = [[6,6],
           [6,6]],

Piece.I = [[0,7,0,0],
           [0,7,0,0],
           [0,7,0,0],
           [0,7,0,0]];
     
Piece.pieces = [Piece.T, Piece.L, Piece.J, Piece.S, Piece.Z, Piece.O, Piece.I],
Piece.colors = ["violet", "orange", "blue", "lime", "red", "yellow", "cyan"];

class Tetris{
    constructor(canv){
        this.canv = canv;
        this.c = canv.getContext("2d");
        this.dpr = window.devicePixelRatio;
        this.dpr = 2; // setting a default value
        this.height = 350;
        this.width = 300;
        this.h = this.height * this.dpr;
        this.w = this.width * this.dpr;
        this.canv.height = this.h;
        this.canv.width = this.w;
        this.c.scale(this.dpr, this.dpr);
        this.board = [];
        this.coords = [[0,0],[0,0],[0,0],[0,0]];
        this.tempCoords = null;

    }


    //////boolean functions//////////////
    isOccupied = (m,x,y)=>{
    // checks if a coordinate is in the current piece
        for(let z=0; z<m.length; z++){
            if(m[z][0] == x && m[z][1] == y){
                return true;
            }
        }
        return false;
    };

    isStillAbove = (c)=>{
        // checks if any part of the piece is still hidden above
        for(let x=0; x<c.length; x++){
            if(c[x][1] < 0){
                return true;
            }
        }
        return false;
    };

    isOutOfBounds = (a,b,c)=>{
        // checks if the next move(left, right, down) is valid
        for(let y=0; y<c.length; y++){
            if(c[y][0]+a < 0 || c[y][0]+a > 9 || c[y][1]+b > 19){
                return true;
            }
        }
        return false;
    };

    isFilled =(row)=>{
        for(let x=0; x<row.length; x++){
            if(row[x] === 0){
                return false;
            }
        }
        return true;
    };


///////// end of boolean functions //////////


//////// draw functions ////////////////

    roundRect =(x,y,w,h,r,col,fill)=>{
        this.c.beginPath();
        this.c.moveTo(x+r, y);
        this.c.lineTo(x+w-r, y);
        this.c.arc(x+w-r,y+r,r,Math.PI*1.5,0);
        this.c.lineTo(x+w, y+h-r);
        this.c.arc(x+w-r, y+h-r, r, 0,Math.PI*0.5);
        this.c.lineTo(x+r,y+h);
        this.c.arc(x+r,y+h-r,r, Math.PI*0.5, Math.PI);
        this.c.lineTo(x,y+r);
        this.c.arc(x+r,y+r,r,Math.PI, Math.PI*1.5);
        
        if(fill){
            this.c.fillStyle = col;
            this.c.fill();
        }else{
            this.c.strokeStyle = "#454545";
            this.c.stroke();
        }
        this.c.closePath();
    }

    drawBoard = ()=>{
        // draw the board in canvas
        for(let y=0; y<this.board.length; y++){
            for(let x=0; x<this.board[y].length; x++){
                if(this.board[y][x] !== 0){
                    let z = this.board[y][x];
                    
                    this.roundRect(x*15+25,y*15+25, 15, 15, 3,Piece.colors[z-1],true);
                    
                }else{
                    this.roundRect(x*15+25,y*15+25, 15, 15, 3,"#232323",true);
                }
                
                this.roundRect(x*15+25,y*15+25, 15, 15, 3,"#676767",false);
            }
        }
        
    }
     
    clearBoard = ()=>{
        // erase the previous frame
        this.c.beginPath();
        this.c.clearRect(0,0,this.w,this.h);
        this.c.closePath();
        
        this.c.beginPath();
        this.c.rect(25,25,150,300);
        this.c.fillStyle = "white";
        this.c.fill();
        this.c.closePath();
    }

    drawScore =()=>{
        let color = "#0d1f2d";
        this.roundRect(190, 25, 110, 300, 5, "#777", true);
        
        this.c.beginPath();
        this.c.font = "15px Arial";
        this.c.fillStyle = color;
        this.c.fillText("Score: ", 200,90);
        this.c.closePath();
        
        this.c.beginPath();
        this.c.font = "bold 15px Arial";
        this.c.fillStyle = color;
        this.c.fillText(this.score, 200,110);
        this.c.closePath();
        
        this.c.beginPath();
        this.c.font = "15px Arial";
        this.c.fillStyle = color;
        this.c.fillText("Level: ", 200,140);
        this.c.closePath();
        
        this.c.beginPath();
        this.c.font = "bold 15px Arial";
        this.c.fillStyle = color;
        this.c.fillText(this.level, 200,160);
        this.c.closePath();

    }

    drawNext = ()=>{
        
        this.c.beginPath();
        this.c.font = "15px Arial";
        this.c.fillStyle = "#333";
        this.c.fillText("Next: ", 200,190);
        this.c.closePath();

        this.roundRect(200, 200, 75, 75, 5, "#ccc", true);
        
        for(let y=0; y<this.next.piece.length; y++){
            for(let x=0; x<this.next.piece[y].length; x++){
            let z;
            this.next.piece.length === 4? z=207.5:this.next.piece.length === 3? z=215: z=222.5;
                if(this.next.piece[y][x] !=0){
                    
                    this.roundRect(z+(15*x),z+(15*y),15,15,3,this.next.color,true);
                    this.roundRect(z+(15*x),z+(15*y),15,15,3,this.next.color,false);
                }
            }
        }
    }


///////// end of draw functions ///////////


////////// update functions ///////////
    collision = (m,a,b)=>{
        // checks if the next move will collide with other blocks before updating the board or if it already reached the bottom
        let mCopy ;
        if(this.is_rotating){
            mCopy = JSON.parse(JSON.stringify(this.coords));
        }else{
            mCopy = m;
        }
        for(let y=0; y<m.length; y++){
            let c = m[y];
            
            if(c[1]+b >= 0 && c[1]+b <20 && this.board[c[1]+b][c[0]+a] != 0 && !this.isOccupied(mCopy,c[0]+a, c[1]+b) ){
                return true;
            }
        }
        return false;
    };

    updateBoard = (a,b)=>{
        // main function that updates the moving piece on the board based on params a & b.
        if(this.bot_reached ){
            this.bot_reached = false;
            return;
        }
        // erase prev piece data
        for(let y=0; y<this.coords.length; y++){
            let c = this.coords[y];
            if(c[1] >= 0 && c[1] < 20)
                this.board[c[1]][c[0]] = 0;
        }

        if(this.is_rotating){// if the function is used in rotation event
            this.coords = JSON.parse( JSON.stringify(this.tempCoords) );
        }
        // update the coordinates
        this.coords.map((elem)=> {
            elem[0] += a;
            elem[1] += b;
        });
        // update the board
        for(let y=0; y<this.coords.length; y++){
            let c = this.coords[y];
            if(c[1] >= 0 && c[1] <20)
            this.board[c[1]][c[0]] = this.current.rand+1;
        }
    };

    down = ()=>{
        // function that makes the piece go down in every interval.
        if( this.isOutOfBounds(0,1,this.coords) || this.collision(this.coords, 0,1) ){
        
            this.current = this.next;
            this.next = new Piece();
            //  next.piece = Piece.pieces[6]; //test
            // randomize the initial rotated position of next piece
            this.rand = Math.floor(Math.random() * 4);
            for(let a=0; a<this.rand; a++){
                this.next.piece = this.rotateMatrix(this.next.piece);
            }
            // reset values
            this.Y = 0 - this.current.piece.length;
            this.X = Math.floor(Math.random()*8);
            this.coords = this.fillCoords(this.current.piece);
            //in case where the new piece is an horizontal I at the right edge
            if(this.coords[3][0] > 9){
                this.coords.map((el)=>el[0]--);
            }
            //adjusting the initial Y position of the new piece so that the first block that will show up starts at 0
            while(this.coords[3][1]+1 <0){
                this.coords.map((el)=>el[1]++);
            }
            this.updateScore();
            this.bot_reached = true;
            if(this.collision(this.coords,0,1) && this.isStillAbove(this.coords)){
            //  game over. :(
                window.cancelAnimationFrame(this.rAF);
                this.resetStats();
                this.animate();
            }
        }else{
            this.Y++;// go down
        }
    };

    createBoard = ()=>{
        //resets and fills the board
        this.board = [];
        for(let x=0; x<20; x++){
            this.board.push([0,0,0,0,0,0,0,0,0,0]);
        }
    };

    fillCoords = (c)=>{
        // reset and fill coordinates array
        let coords = [];
        for(let y=0; y<c.length; y++){
            for(let x=0; x<c[y].length; x++){
                if(c[y][x] != 0){
                    coords.push([x+this.X,y+this.Y]);
                }
            }
        }
        return coords;
    }

    rotateMatrix = (m)=>{
        // rotates a tetromino
        let n = JSON.parse(JSON.stringify(m));
        
        for(let y=0; y<n.length; y++){
            for(let x=0; x<n[y].length; x++){
                n[y][x] = m[x][y];
            }
        }
        
        for(let x=0; x<m[0].length/2; x++){
            for(let y=0; y<m.length; y++){
                let temp = n[y][x];
                n[y][x] = n[y][n[0].length-x-1];
                n[y][n[0].length-x-1] = temp;
            }
        }
        return n;
    }

    updateScore =()=>{
        let filledRows = [];
        for(let y=0; y<this.board.length; y++){
            if(this.isFilled(this.board[y])){
                filledRows.push(y);
            }
        }
        
        if ( filledRows.length === 1 ) this.score+=100;
        else if(filledRows.length === 2) this.score+=300;
        else if(filledRows.length === 3) this.score+=500;
        else if(filledRows.length === 4) this.score+=800;
        
        if(filledRows.length>0){
            // stop the animation for a while so that the board won't change state while removing rows
            window.cancelAnimationFrame(this.rAF);
            //
            for(let z=filledRows.length-1; z>=0; z--){
                this.board.splice(filledRows[z],1);
                this.lines++;
                if(this.lines % 10 === 0){
                    this.level++;
                }
            }
            filledRows.forEach((el)=>{
                this.board.unshift( [0,0,0,0,0,0,0,0,0,0] );
            });
            this.animate();//resume animation
        }
    }

    resetStats =()=>{
        this.then = Date.now();
        this.first = this.then;
        this.fps = 30;
        this.counter = 0;
        this.interval = 1000/this.fps;
        this.score = 0;
        this.level = 12;
        this.lines = 0;
        this.bot_reached = false;
        this.is_rotating = false;
        
        this.current = new Piece();
        this.next = new Piece();
        
        this.rand = Math.floor(Math.random() * 4);
        for(let a=0; a<this.rand; a++){
            this.next.piece = this.rotateMatrix(this.next.piece);
        }
        
        this.X = Math.floor(Math.random()*8);
        this.Y = 0 - this.current.piece.length;
        this.coords = this.fillCoords(this.current.piece);
        while(this.coords[3][1]+1 <0){
            this.coords.map((el)=>el[1]++);
        }
        
        this.createBoard();
    }

    animate = ()=>{

        this.rAF = window.requestAnimationFrame(this.animate);
        this.now = Date.now();
        this.change = this.now - this.then;
        
        if(this.change > this.interval){
            
            this.then = this.now - (this.change % this.interval);
            this.counter++;

            if(this.counter >= this.fps/this.level){
                this.counter = 0;
                
                this.down();
                this.updateBoard(0,1);
                this.clearBoard();
                
                this.score++;
                this.drawBoard();
                this.drawScore();
                this.drawNext();
            }
        }
    }

    init = ()=>{
        this.resetStats();
        this.drawBoard();
       
    }
////// end of update functions /////////

    stopAnimation = ()=>{
        window.cancelAnimationFrame(this.rAF);
    }

}


