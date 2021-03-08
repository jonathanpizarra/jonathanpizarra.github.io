/*THE RULES:
    For a space that is 'populated':
    Each cell with one or no neighbors dies, as if by solitude.
    Each cell with four or more neighbors dies, as if by overpopulation.
    Each cell with two or three neighbors survives.

    For a space that is 'empty' or 'unpopulated'
    Each cell with three neighbors becomes populated.

*/


class Conway{
    constructor(canv, stats){
        this.canv = canv;
        this.stats = stats;
        this.c = this.canv.getContext("2d");
        this.dpr = 2;//window.devicePixelRatio = 2;
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.w *= this.dpr;
        this.h *= this.dpr;
        this.canv.width = this.w;
        this.canv.height = this.h;
        this.s = 10;
        this.int = 75;
        this.state = false;
        this.w -= (this.w % this.s);
        this.h -= (this.h % this.s);
        this.cells = [];
        this.copy = [];
        this.cell;
        this.pop = 0;
        this.gens = 0;
        this.setInt;
        // simple
        this.p1 = [ [96,49], [97,49], [95,50], [96,50], [96,51] ];
        // spaceship
        this.p2 = [ [53,50], [56,50], [52,51], [52,52], [56,52], [44,53], [45,53], [52,53], [53,53], [54,53], [55,53], [43,54], [44,54], [45,54], [46,54], [42,55], [43,55], [45,55], [46,55], [43,56], [44,56], [50,56], [51,56], [53,56], [54,56], [55,56], [49,57], [55,57], [56,57], [48,58], [49,58], [57,58], [49,59], [55,59], [56,59], [43,60], [44,60], [50,60], [51,60], [53,60], [54,60], [55,60], [42,61], [43,61], [45,61], [46,61], [43,62], [44,62], [45,62], [46,62], [44,63], [45,63], [52,63], [53,63], [54,63], [55,63], [52,64], [56,64], [52,65], [53,66], [56,66] ];
        // spaceship 2
        this.p3 =  [ [44,37], [43,38], [45,38], [42,39], [43,39], [45,40], [41,41], [45,41], [38,42], [41,42], [37,43], [39,43], [42,43], [43,43], [44,43], [45,43], [36,44], [39,44], [37,45], [39,45], [42,45], [43,45], [44,45], [45,45], [38,46], [41,46], [41,47], [45,47], [45,48], [42,49], [43,49], [43,50], [45,50], [44,51] ];

        this.p4 =  [ [54,50], [52,51], [52,52], [44,53], [45,53], [52,53], [53,53], [54,53], [55,53], [43,54], [44,54], [45,54], [46,54], [42,55], [43,55], [45,55], [46,55], [43,56], [44,56], [50,56], [51,56], [53,56], [54,56], [55,56], [49,57], [55,57], [56,57], [48,58], [49,58], [57,58], [49,59], [55,59], [56,59], [43,60], [44,60], [50,60], [51,60], [53,60], [54,60], [55,60], [42,61], [43,61], [45,61], [46,61], [43,62], [44,62], [45,62], [46,62], [44,63], [45,63], [52,63], [53,63], [54,63], [55,63], [52,64], [52,65], [54,66] ];

        this.p5 =  [ [27,28], [30,28], [33,28], [36,28], [39,28], [42,28], [45,28], [48,28], [51,28], [54,28], [57,28], [60,28], [63,28], [66,28], [69,28], [72,28], [75,28], [78,28], [81,28], [84,28], [27,29], [28,29], [29,29], [30,29], [31,29], [32,29], [33,29], [34,29], [35,29], [36,29], [37,29], [38,29], [39,29], [40,29], [41,29], [42,29], [43,29], [44,29], [45,29], [46,29], [47,29], [48,29], [49,29], [50,29], [51,29], [52,29], [53,29], [54,29], [55,29], [56,29], [57,29], [58,29], [59,29], [60,29], [61,29], [62,29], [63,29], [64,29], [65,29], [66,29], [67,29], [68,29], [69,29], [70,29], [71,29], [72,29], [73,29], [74,29], [75,29], [76,29], [77,29], [78,29], [79,29], [80,29], [81,29], [82,29], [83,29], [84,29], [25,31], [26,31], [27,31], [28,31], [29,31], [30,31], [31,31], [32,31], [33,31], [34,31], [35,31], [36,31], [37,31], [38,31], [39,31], [40,31], [41,31], [42,31], [43,31], [44,31], [45,31], [46,31], [47,31], [48,31], [49,31], [50,31], [51,31], [52,31], [53,31], [54,31], [55,31], [56,31], [57,31], [58,31], [59,31], [60,31], [61,31], [62,31], [63,31], [64,31], [65,31], [66,31], [67,31], [68,31], [69,31], [70,31], [71,31], [72,31], [73,31], [74,31], [75,31], [76,31], [77,31], [78,31], [79,31], [80,31], [81,31], [82,31], [83,31], [84,31], [85,31], [86,31], [24,32], [58,32], [66,32], [77,32], [87,32], [24,33], [25,33], [26,33], [27,33], [29,33], [30,33], [32,33], [35,33], [36,33], [37,33], [38,33], [39,33], [42,33], [43,33], [44,33], [45,33], [46,33], [47,33], [48,33], [49,33], [50,33], [51,33], [52,33], [53,33], [54,33], [55,33], [56,33], [61,33], [62,33], [63,33], [64,33], [65,33], [70,33], [71,33], [72,33], [73,33], [74,33], [75,33], [76,33], [80,33], [81,33], [82,33], [83,33], [84,33], [85,33], [86,33], [87,33], [28,34], [32,34], [33,34], [39,34], [40,34], [48,34], [56,34], [65,34], [78,34], [24,35], [25,35], [26,35], [27,35], [28,35], [29,35], [32,35], [35,35], [36,35], [37,35], [38,35], [39,35], [42,35], [43,35], [44,35], [45,35], [46,35], [51,35], [52,35], [53,35], [54,35], [55,35], [56,35], [61,35], [62,35], [63,35], [64,35], [65,35], [70,35], [71,35], [72,35], [73,35], [74,35], [75,35], [76,35], [80,35], [81,35], [82,35], [83,35], [84,35], [85,35], [86,35], [87,35], [24,36], [47,36], [57,36], [66,36], [77,36], [87,36], [25,37], [26,37], [27,37], [28,37], [29,37], [30,37], [31,37], [32,37], [33,37], [34,37], [35,37], [36,37], [37,37], [38,37], [39,37], [40,37], [41,37], [42,37], [43,37], [44,37], [45,37], [46,37], [47,37], [48,37], [49,37], [50,37], [51,37], [52,37], [53,37], [54,37], [55,37], [56,37], [57,37], [58,37], [59,37], [60,37], [61,37], [62,37], [63,37], [64,37], [65,37], [66,37], [67,37], [68,37], [69,37], [70,37], [71,37], [72,37], [73,37], [74,37], [75,37], [76,37], [77,37], [78,37], [79,37], [80,37], [81,37], [82,37], [83,37], [84,37], [85,37], [86,37], [27,39], [28,39], [29,39], [30,39], [31,39], [32,39], [33,39], [34,39], [35,39], [36,39], [37,39], [38,39], [39,39], [40,39], [41,39], [42,39], [43,39], [44,39], [45,39], [46,39], [47,39], [48,39], [49,39], [50,39], [51,39], [52,39], [53,39], [54,39], [55,39], [56,39], [57,39], [58,39], [59,39], [60,39], [61,39], [62,39], [63,39], [64,39], [65,39], [66,39], [67,39], [68,39], [69,39], [70,39], [71,39], [72,39], [73,39], [74,39], [75,39], [76,39], [77,39], [78,39], [79,39], [80,39], [81,39], [82,39], [83,39], [84,39], [27,40], [30,40], [33,40], [36,40], [39,40], [42,40], [45,40], [48,40], [51,40], [54,40], [57,40], [60,40], [63,40], [66,40], [69,40], [72,40], [75,40], [78,40], [81,40], [84,40] ];

        this.p6 = ()=>{
            let p = [];
            let l = w > h? h/s: w/s;

            for(let y=0; y<h/s; y++){
                for(let x=0; x<w/s; x++){
                    if(x == y || (x+y == l-1) || (x-l == y) || (x+y == 2 * l -2) ){
                        p.push([x,y]);
                    }
                }
            }
            return p;
        }
        this.p6 = this.p6();

        this.p7 = [ [210,109], [211,110], [210,111], [211,111], [209,112], [211,112], [208,113], [213,114], [214,114], [208,115], [213,115], [221,115], [222,115], [223,115], [225,115], [208,116], [214,116], [226,116], [208,117], [215,117], [227,117], [229,117], [214,118], [216,118], [226,118], [227,118], [228,118], [214,119], [216,119], [215,120], [223,120], [224,120], [216,121], [219,121], [220,121], [222,121], [224,121], [211,122], [212,122], [214,122], [215,122], [216,122], [218,122], [221,122], [210,123], [213,123], [215,123], [216,123], [217,123], [219,123], [220,123], [207,124], [209,124], [211,124], [212,124], [215,124], [207,125], [208,125], [216,125], [215,126], [217,126], [203,127], [204,127], [205,127], [215,127], [217,127], [202,128], [204,128], [216,128], [223,128], [205,129], [217,129], [223,129], [206,130], [208,130], [209,130], [210,130], [218,130], [223,130], [217,131], [218,131], [223,132], [220,133], [222,133], [220,134], [221,134], [220,135], [221,136] ];

        this.patterns = [[], this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7];
        
    }


    drawGrid = ()=>{
        for(let x = 0; x < this.w/this.s; x++){
            this.c.beginPath();
            this.c.moveTo(x*this.s, 0);
            this.c.lineTo(x*this.s, this.h);
            this.c.closePath();
            this.c.strokeStyle = "#F9F87177";
            this.c.lineWidth = 0.5;
            this.c.stroke();
        }

        for(let y = 0; y < this.h/this.s; y++){
            this.c.beginPath();
            this.c.moveTo(0, y*this.s);
            this.c.lineTo(this.w, y*this.s);
            this.c.closePath();
            this.c.strokeStyle = "#F9F87177";
            this.c.lineWidth = 0.5;
            this.c.stroke();
        }
    }

    clearRect = ()=>{
        this.c.beginPath();
        this.c.rect(0,0,this.w,this.h);
        this.c.fillStyle = "#111";
        this.c.fill();
        this.c.closePath();
    }
    drawRect = (x, y, color)=>{
        this.c.beginPath();
        this.c.rect(x*this.s, y*this.s, this.s, this.s);
        this.c.fillStyle = color;
        this.c.fill();
        this.c.closePath();
    }

    drawCells = () =>{
        for(let y=0; y<this.h/this.s; y++){
            for(let x=0; x<this.w/this.s; x++){
                if(this.cells[y][x] == 1){
                    this.drawRect(x, y, "#77FFC3");
                }
            }
        }
    }

    resetGrid = ()=>{
        for(let y=0; y<this.h/this.s; y++){
            for(let x=0; x<this.w/this.s; x++){
            //if(cells[y][x] == 1){
                cells[y][x] = 0;
            //}
            }
        }
        this.pop = 0;
        this.gens = 0;
    }

    getCoords = ()=>{
        console.log("Warning : getCoords is altered to adjust pattern positions")
        let c = "[";
        let comma = false;
        for(let y=0; y<this.h/this.s; y++){
            for(let x=0; x<this.w/this.s; x++){
                if(this.cells[y][x] == 1){
                    if(comma)c += ","
                    c += ` [${x},${y-100}]`;
                    if(!comma){
                    comma = true;
                    }
                }
            }
        }
        c += " ]";
        console.log("Living cells : ",c);
    }

    plotPattern = (p)=>{
        let padX = Math.floor(this.w/this.s/2 - p[0][0]) -6;
        let padY = Math.floor(this.h/this.s/2 - p[0][1]) -14;
        console.log(padX, ",", padY)
        for(let x=0; x<p.length; x++){
            this.cells[p[x][1] + padY][p[x][0] + padX] = 1;
            this.pop++;
        }
    }

    neighborCount = (x,y)=>{
        //console.log("nC x=" + x + ", y=" + y);
        let c = 0;
        let pos = [[-1,-1], [0,-1], [1,-1], [-1,0], [1,0], [-1,1], [0,1], [1,1]];
        let cx, cy;
        for(let z=0; z<pos.length; z++){
            cx = x+pos[z][0];
            cy = y+pos[z][1];
        //  console.log("bcy=" + cy + ", cx=" + cx + ", w=" + w + ", h=" + h);
            if(cx < 0) cx = this.w/this.s-1;
            else if(cx == this.w/this.s) cx = 0;
            if(cy < 0) cy = this.h/this.s-1;
            else if(cy == this.h/this.s) cy = 0;
        //console.log("cy=" + cy + ", cx=" + cx);
            let cell = this.cells[cy][cx];
            if(cell == 1){
                c++;
            }
        }

        return c;
        // -1 -1, 0 -1, 1 -1,
        // -1 0,        1  0,
        // -1 1, 0 1,   1 1.
    }

    animate = ()=>{
        
        this.setInt = setInterval(()=>{
            this.gens++;
            this.pop = 0;
            for(let y=0; y<this.h/this.s; y++){
                for(let x=0; x<this.w/this.s; x++){
                    this.cell = this.cells[y][x];
                    if( this.cell == 0){
                    if(this.neighborCount(x,y) == 3){
                        this.copy[y][x] = 1;
                        this.pop++;
                    }else{
                        this.copy[y][x] = this.cell;
                    }
                    }else if( this.cell == 1){
                    if(this.neighborCount(x,y) < 2 || this.neighborCount(x,y) > 3){
                        this.copy[y][x] = 0;
                    }else{
                        this.copy[y][x] = this.cell;
                        this.pop++;
                    }
                    }
                }
            } // end of forloop

            this.cells = JSON.parse(JSON.stringify(this.copy));
            this.clearRect();
            this.drawGrid();
            this.drawCells();
            this.stats.innerHTML = "Population : " + this.pop + "<br>Generations : " + this.gens;
            //console.log("animating...");
            // clearInterval(setInt);
        }, this.int);
        //this.raf = requestAnimationFrame(this.animate);
    }

    init = ()=>{
        for(let y=0; y < this.h/this.s; y++){
            this.cells[y] = [];
            this.copy[y] = [];
            for(let x=0; x < this.w/this.s; x++){
                this.cells[y][x] = 0;
                this.copy[y][x] = 0;
            }
        }
        this.plotPattern(this.p7);

        this.clearRect();
        //this.drawGrid();
        this.drawCells();
        this.animate();
        this.stats.innerHTML = "Population : " + this.pop + "<br>Generations : " + this.gens;
    }

    stop = ()=>{
        clearInterval(this.setInt);
    }


}