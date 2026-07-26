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

function isWhite(piece){
    return piece && piece.startsWith("w");
}

function isBlack(piece){
    return piece && piece.startsWith("b");
}

function inside(r,c){
    return r>=0 && r<8 && c>=0 && c<8;
}

function drawBoard(){

    board.innerHTML="";

    for(let r=0;r<8;r++){

        for(let c=0;c<8;c++){

            const sq=document.createElement("div");

            sq.className="square";
            sq.classList.add((r+c)%2===0 ? "light":"dark");

            sq.dataset.row=r;
            sq.dataset.col=c;

            if(game[r][c]!=""){
                sq.textContent=pieces[game[r][c]];
                sq.style.color=isWhite(game[r][c]) ? "white":"black";
            }

            sq.addEventListener("click",clickSquare);

            board.appendChild(sq);

        }

    }

}
function clearPath(fromRow,fromCol,toRow,toCol){

    const dr=Math.sign(toRow-fromRow);
    const dc=Math.sign(toCol-fromCol);

    let r=fromRow+dr;
    let c=fromCol+dc;

    while(r!=toRow || c!=toCol){

        if(game[r][c]!="")
            return false;

        r+=dr;
        c+=dc;

    }

    return true;

}

function canMove(fromRow,fromCol,toRow,toCol){

    if(!inside(toRow,toCol))
        return false;

    const piece=game[fromRow][fromCol];

    if(piece=="")
        return false;

    const target=game[toRow][toCol];

    if(target!=""){

        if(isWhite(piece)==isWhite(target))
            return false;

    }

    const type=piece[1];

    const dr=toRow-fromRow;
    const dc=toCol-fromCol;

    switch(type){

        case "p":{

            const dir=isWhite(piece)?-1:1;
            const start=isWhite(piece)?6:1;

            if(dc==0 && target==""){

                if(dr==dir)
                    return true;

                if(fromRow==start &&
                   dr==2*dir &&
                   game[fromRow+dir][fromCol]=="")
                    return true;

            }

            if(Math.abs(dc)==1 &&
               dr==dir &&
               target!="")
                return true;

            return false;
        }

        case "r":
            if(dr==0 || dc==0)
                return clearPath(fromRow,fromCol,toRow,toCol);
            return false;

        case "b":
            if(Math.abs(dr)==Math.abs(dc))
                return clearPath(fromRow,fromCol,toRow,toCol);
            return false;
                case "n":
            if(
                (Math.abs(dr)==2 && Math.abs(dc)==1) ||
                (Math.abs(dr)==1 && Math.abs(dc)==2)
            )
                return true;
            return false;

        case "q":
            if(
                dr==0 ||
                dc==0 ||
                Math.abs(dr)==Math.abs(dc)
            )
                return clearPath(fromRow,fromCol,toRow,toCol);
            return false;

        case "k":
            if(
                Math.abs(dr)<=1 &&
                Math.abs(dc)<=1
            )
                return true;
            return false;
    }

    return false;

}
function clickSquare(){

    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);

    if(selected==null){

        if(game[row][col]=="")
            return;

        if(!isWhite(game[row][col]))
            return;

        selected={
            row:row,
            col:col
        };

        drawBoard();

        board.children[row*8+col].classList.add("selected");

        return;

    }

    const fromRow=selected.row;
    const fromCol=selected.col;

    if(fromRow==row && fromCol==col){

        selected=null;
        drawBoard();
        return;

    }

    if(!canMove(fromRow,fromCol,row,col)){

        selected=null;
        drawBoard();
        return;

    }

    const piece=game[fromRow][fromCol];

    game[row][col]=piece;
    game[fromRow][fromCol]="";

    const letters="abcdefgh";

    moveHistory.push(
        letters[fromCol]+
        (8-fromRow)+
        letters[col]+
        (8-row)
    );

    selected=null;

    drawBoard();

    setTimeout(function(){
        computerMove();
    },300);

}
function applyMove(move){

    if(!move || move.length < 4)
        return;

    const fromCol = move.charCodeAt(0) - 97;
    const fromRow = 8 - parseInt(move[1]);

    const toCol = move.charCodeAt(2) - 97;
    const toRow = 8 - parseInt(move[3]);

    game[toRow][toCol] = game[fromRow][fromCol];
    game[fromRow][fromCol] = "";

    moveHistory.push(move);

    drawBoard();

}

function resetGame(){

    game = [
        ["br","bn","bb","bq","bk","bb","bn","br"],
        ["bp","bp","bp","bp","bp","bp","bp","bp"],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["","","","","","","",""],
        ["wp","wp","wp","wp","wp","wp","wp","wp"],
        ["wr","wn","wb","wq","wk","wb","wn","wr"]
    ];

    selected = null;
    moveHistory = [];

    sendToStockfish("ucinewgame");

    drawBoard();

}

drawBoard();

