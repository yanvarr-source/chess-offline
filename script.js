// ===============================
// CHESS OFFLINE
// Version 0.1
// Part 1
// ===============================

const board = document.getElementById("board");

const pieces = {
  wp: "♙",
  wr: "♖",
  wn: "♘",
  wb: "♗",
  wq: "♕",
  wk: "♔",

  bp: "♟",
  br: "♜",
  bn: "♞",
  bb: "♝",
  bq: "♛",
  bk: "♚"
};

let game = [
["br","bn","bb","bq","bk","bb","bn","br"],
["bp","bp","bp","bp","bp","bp","bp","bp"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["wp","wp","wp","wp","wp","wp","wp","wp"],
["wr","wn","wb","wq","wk","wb","wn","wr"]
];

let selected = null;

function drawBoard(){

    board.innerHTML="";

    for(let row=0; row<8; row++){

        for(let col=0; col<8; col++){

            const square=document.createElement("div");

            square.className="square";

            if((row+col)%2===0){
                square.classList.add("light");
            }else{
                square.classList.add("dark");
            }

            square.dataset.row=row;
            square.dataset.col=col;

            if(game[row][col]!=""){

                square.textContent=pieces[game[row][col]];
              if(game[row][col].startsWith("w")){
    square.style.color = "white";
}else{
    square.style.color = "black";
}

            }

            square.addEventListener("click",clickSquare);

            board.appendChild(square);

        }

    }

}

function clearSelection(){

    document
      .querySelectorAll(".selected")
      .forEach(s=>s.classList.remove("selected"));

}function isWhite(piece){
    return piece.startsWith("w");
}

function isBlack(piece){
    return piece.startsWith("b");
}

function canMovePawn(fromRow,fromCol,toRow,toCol,piece){

    const dir = piece=="wp" ? -1 : 1;

    if(fromCol==toCol){

        if(game[toRow][toCol]==""){

            if(toRow==fromRow+dir)
                return true;

            if(piece=="wp" && fromRow==6 && toRow==4 && game[5][fromCol]=="")
                return true;

            if(piece=="bp" && fromRow==1 && toRow==3 && game[2][fromCol]=="")
                return true;

        }

    }

    if(Math.abs(toCol-fromCol)==1 && toRow==fromRow+dir){

        if(game[toRow][toCol]!=""){

            if(isWhite(piece) && isBlack(game[toRow][toCol]))
                return true;

            if(isBlack(piece) && isWhite(game[toRow][toCol]))
                return true;

        }

    }

    return false;

}

function canMoveRook(fromRow, fromCol, toRow, toCol){

    if(fromRow !== toRow && fromCol !== toCol)
        return false;

    let stepRow = 0;
    let stepCol = 0;

    if(toRow > fromRow) stepRow = 1;
    if(toRow < fromRow) stepRow = -1;

    if(toCol > fromCol) stepCol = 1;
    if(toCol < fromCol) stepCol = -1;

    let r = fromRow + stepRow;
    let c = fromCol + stepCol;

    while(r !== toRow || c !== toCol){

        if(game[r][c] !== "")
            return false;

        r += stepRow;
        c += stepCol;
    }

    return true;

}

function clickSquare(){

    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);

    // дальше идёт остальной код clickSquare()
}
function clickSquare(){

    const row=parseInt(this.dataset.row);

    const col=parseInt(this.dataset.col);
function isWhite(piece){
    return piece.startsWith("w");
}

function isBlack(piece){
    return piece.startsWith("b");
}

function canMovePawn(fromRow,fromCol,toRow,toCol,piece){


    const dir = piece=="wp" ? -1 : 1;

    if(fromCol==toCol){

        if(game[toRow][toCol]==""){

            if(toRow==fromRow+dir)
                return true;

            if(piece=="wp" && fromRow==6 && toRow==4 && game[5][fromCol]=="")
                return true;

            if(piece=="bp" && fromRow==1 && toRow==3 && game[2][fromCol]=="")
                return true;

        }

    }

    if(Math.abs(toCol-fromCol)==1 && toRow==fromRow+dir){

        if(game[toRow][toCol]!=""){

            if(isWhite(piece) && isBlack(game[toRow][toCol]))
                return true;

            if(isBlack(piece) && isWhite(game[toRow][toCol]))
                return true;

        }

    }

    return false;

}
    if(selected==null){

        if(game[row][col]=="") return;

        selected={
            row:row,
            col:col
        };

        this.classList.add("selected");

        return;

    }
      const piece = game[selected.row][selected.col];

let allowed = true;

if(piece === "wp" || piece === "bp"){

    allowed = canMovePawn(
        selected.row,
        selected.col,
        row,
        col,
        piece
    );

}else if(piece === "wr" || piece === "br"){

    allowed = canMoveRook(
        selected.row,
        selected.col,
        row,
        col
    );

}

if(allowed){

    game[selected.row][selected.col] = "";
    game[row][col] = piece;

}

    selected = null;

    drawBoard();

}

drawBoard();
  
