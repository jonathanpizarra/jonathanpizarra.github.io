

// class SlidePuzzle{
//     constructor(){
//         this.pic = new Image();
//         this.pic.src = 'images/quote.jpg';
//         this.titles = ["The Sololearn Logo", "The Cat", "The Pokemon", "The Castle", "The Quote"];
//         this.level = 5;
//         this.limit, this.n, this.arrLast;
//         this.moves, this.arrSize, this.idX, this.arr, this.orig, this.current;
//         this.canv, this.W, this.H, this.c ;
//         this.arrSize = [3,4,5,5,6];
//         this.sS, this.sD, this.Xs, this.Ys;
//         this.tmoves = 0;
//         this.perLevel =[];
//         this.speed = 200;
//     }
     
//     matrix = ()=> {
//         this.b = $("#box");
//         this.b.html("");
//         this.b.append('<canvas id="canv"> </canvas>');
//         this.canv = $("#canv");
//         this.W = 300;
//         this.H = 300;
//         this.canv[0].width = this.W;
//         this.canv[0].height = this.H;
//         this.c = this.canv[0].getContext("2d");
//         this.orig = [];
//         this.current = [];
//         this.arr = [];
//         this.idX = 1;
//         this.moves = 0;
    
//         this.n = this.level - 1;
//         this.sD = this.W / this.arrSize[this.n];
//         this.sS = this.sD;
//         this.limit = this.sD;
//         this.arrLast = this.arrSize[this.n] * this.arrSize[this.n];
        
//         //creating the table
//         // this.table1 = $('<table border="0" class="table1"></table>');
//         // for(let i1=0; i1<this.arrSize[this.n]; i1++) {
//         //     let row = $('<tr> </tr>');
//         //     for(let j1=0; j1<this.arrSize[this.n]; j1++){
//         //         row.append('<td class="shit">' + this.idX + '</td>');
//         //         this.idX++;
//         //     }
//         //     this.table1.append(row);
//         // }
//         // this.b.append(this.table1);
        
//         this.c.fillStyle = "rgba(0,255,255,0.4)";
//         this.c.fillRect(0,0,this.W,this.H);
//         $("td").css({"width":(this.sD-6)+"px","height":(this.sD-6)+"px"});
        
//         // creating the matrix
//         let temp = [];
//         let temp2 = [];
//         this.idX = 1 ;
//         for(var i2=0; i2<this.arrSize[this.n] ; i2++) {
//             for(var j2=0; j2<this.arrSize[this.n]; j2++) {
//                 temp.push({
//                     idX : this.idX,
//                     sX : j2*this.sS,
//                     sY : i2*this.sS,
//                     dX : j2*this.sD,
//                     dY : i2*this.sD 
//                 });
//                 temp2.push(this.idX);
//                 this.idX++;
//             }
//             this.arr.push(temp);
//             temp = [];
//             this.orig.push(temp2);
//             this.current.push(temp2);
//             temp2 = [];
//         }
//         // join orig
//         this.orig = this.orig.join("");
        
//     }  // end of matrix function
 
//     //drawing
//     drawIt = (fixed,moving)=> {
//         this.c.lineWidth = "2";
//         this.c.drawImage(this.pic, fixed.sX, fixed.sY, this.sD, this.sD, fixed.dX, fixed.dY, this.sD, this.sD);
//         this.c.fillStyle = "rgba(0,0,0,0.5)";
//         this.c.fillRect(fixed.dX, fixed.dY, this.sD, this.sD);
       
//         for(var i3=0; i3<this.arrSize[this.n]; i3++) {
//             for(var j3=0; j3<this.arrSize[this.n]; j3++) {
//                 let r = this.arr[i3][j3];
//                 if(fixed.idX == r.idX || moving.idX == r.idX) {
//                     continue;
//                 }
//                 this.c.strokeStyle = "lime";
//                 this.c.strokeRect(r.dX, r.dY, this.sD, this.sD);
//                 this.c.drawImage(this.pic, r.sX, r.sY, this.sD, this.sD, r.dX, r.dY, this.sD, this.sD);
//             }
//         }  // end of loop
//         this.c.strokeStyle = "black";
//         this.c.strokeRect(moving.dX, moving.dY, this.sD, this.sD);
//         this.c.drawImage(this.pic, moving.sX, moving.sY, this.sD, this.sD, moving.dX, moving.dY, this.sD, this.sD);
//     }
     
   
     
//     find_fixed = (arrf)=> {
//         for(let i4=0; i4<this.arrSize[this.n]; i4++){
//             for(let j4=0; j4<this.arrSize[this.n]; j4++){
//                 if( arrf[i4][j4].idX == this.arrLast) {
//                     let findfix = arrf[i4][j4];           
//                     return {
//                         findF : findfix,
//                         iFix : i4,
//                         jFix : j4,
//                     };
//                 }
//             }
//         }
//         return {};

//     }
 
//     whichWay(val) {
//         var chosenI, chosenJ ;
//         for(var iW=0; iW<this.arrSize[this.n]; iW++){
//             for(var jW=0; jW<this.arrSize[this.n]; jW++){
//                 if(this.current[iW][jW] == $(val).text()) {
//                     chosenI = iW;
//                     chosenJ = jW; 
//                 }
//             }
//         }
//         if( chosenI + 1 < this.arrSize[this.n] && this.current[chosenI+1][chosenJ] == this.arrLast ) {
//             this.Ys = 1;
//             this.Xs = 0;
//         }
//         else if(chosenI-1 >= 0 && this.current[chosenI-1][chosenJ] == this.arrLast) {
//             this.Ys = -1;
//             this.Xs = 0;
//         }
//         else if(chosenJ+1 < this.arrSize[this.n] && this.current[chosenI][chosenJ+1] == this.arrLast) {
//             this.Ys = 0;
//             this.Xs = 1;
//         }
//         else if(chosenJ-1 >= 0 && this.current[chosenI][chosenJ-1] == this.arrLast) {
//             this.Ys = 0;
//             this.Xs = -1;
//         }
    
//     }
     
//     switcher = (tds)=> {
//         var fxd = this.find_fixed(this.arr) ;
//         var fixed = fxd.findF;
//         this.whichWay(tds);
//         for(var i5=0; i5<this.arrSize[this.n]; i5++){
//             for(var j5=0; j5<this.arrSize[this.n]; j5++){
//                 if( $(tds).text() == this.current[i5][j5] && this.current[i5+this.Ys][j5+this.Xs] == this.arrLast) {
//                     var pos = $(tds).text();
//                     this.animateIt(fixed, pos, this.Xs, this.Ys, i5, j5, 5);
//                     $("tr").eq(i5+this.Ys).children().eq(j5+this.Xs).text($(tds).text());
//                     $(tds).text(this.arrLast);
//                     this.current.swap(i5, j5, this.Xs, this.Ys,1);
//                     this.moves++;
//                     this.tmoves++;           
//                     $("#moves").html("Moves : "+ this.moves);
//                     $("#totalmoves").html("Total Moves : "+ this.tmoves);
//                 }
//             }
//         }
    
//     }
     
//     clear = ()=> {
//         this.c.fillStyle = "rgba(100,100,100,1)";
//         this.c.fillRect(0,0,this.W,this.H);
//     }
     
//     checkIfSolved() {
//         if(this.orig == this.current.join("")) {
//             return true;
//         }
//         else{
//             return false;
//         }
//     }
 
//     animateIt = (fixed,tda,Xa,Ya,ia,ja,fps)=> {
//         var rr = this.arr[ia][ja];
//         var incre = fps;
//         var start = 0;
        
//         this.setInt = setInterval(()=> {
//             rr.dX += (incre * Xa);
//             rr.dY += (incre * Ya);
//             this.clear();
//             this.drawIt(fixed,rr);
//             start += incre;

//             if(start == this.sD || start > this.sD) {
//                 clearInterval(this.setInt);
//                 this.arr.swap(ia,ja,Xa,Ya,1);     
                
//                 start = 0;
//             }
//         },1)
//     }
      
 
//     randomize = ()=> {
//         //   $("#loadingText").html("Loading Level " + level )
//         //   $("#loading").fadeIn(300);
//         this.matrix();
//         $("#level").html("Level "+ this.level);
//         $("#title").html("'" + this.titles[this.n] + "'");
//         if(this.level > this.arrSize.length-1) {
//             $("#pic" + (this.level+1)).css("display","block");     
//         }else {
//             $("#pic" + this.level).css("display","block");
//         }
//         var v=0;
//         var prev = this.current[0][0];
//         this.set2 = setInterval(()=> {
//             if(v == 100 * this.level) {
//                 clearInterval(this.set2);
//                 if(this.checkIfSolved()) {
//                     this.randomize();
//                 }
//             }
//             var rand1 = Math.random();
//             var rand2 = Math.round(Math.random());
//             var rand3 = Math.random();
//             var randX = rand2;
//             var randY = 1;
//             if(randX == 1) {
//                 randY = 0;
//             }
//             if(rand1 < 0.5) {
//                 randX = -randX;
//                 randY = -randY;
//             }

//             let rf = this.find_fixed(this.arr);
//             var rIfix = rf.iFix;
//             var rJfix = rf.jFix;
//             var rIY = rIfix - (randY);
//             var rJX = rJfix - (randX);

//             if( rIY <= this.arrSize[this.n]-1 && rJX - (randX) <= this.arrSize[this.n] && rIY >= 0 && rJX >= 0) {
                
//                 if( this.current[rIY][rJX] != prev ) {
//                     var curR = this.current[rIfix - (randY)][rJfix - (randX)];
//                     prev = curR;
//                     // var arrR = this.arr[rIfix - (randY)][rJfix - (randX)];
//                     // arrR.dX += (this.sD * randX);
//                     // arrR.dY += (this.sD * randY);
//                     this.clear();
//                     this.animateIt(this.arr[rIfix][rJfix], null, randX, randY, rIY, rJX, 5);
//                     //this.drawIt(this.arr[rIfix][rJfix], this.arr[rIY][rJX]);
                    
//                     this.arr.swap(rIfix,rJfix,randX,randY,-1);
//                     this.current.swap(rIfix,rJfix,randX,randY,-1);
                    
//                     // $("tr").eq(rIfix).children().eq(rJfix).text(this.current[rIfix][rJfix]);
//                     // $("tr").eq(rIY).children().eq(rJX).text(this.current[rIY][rJX]);

//                 }
//             }
//             v++;
//         },this.speed)

//     }
     
//     init_slide = ()=> {
        
//         setTimeout( this.randomize,800);
//     }
     
//  }

//  Array.prototype.swap = function (ip,jp,Xp,Yp,dir) {
//     var b = this[ip][jp];
//     this[ip][jp] = this[ip+(Yp*dir)][jp+(Xp*dir)];
//     this[ip+(Yp*dir)][jp+(Xp*dir)] = b;
//     return this;
// }