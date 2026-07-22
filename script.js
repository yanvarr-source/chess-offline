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

}

function clickSquare(){

    const row=parseInt(this.dataset.row);

    const col=parseInt(this.dataset.col);

    if(selected==null){

        if(game[row][col]=="") return;

        selected={
            row:row,
            col:col
        };

        this.classList.add("selected");

        return;

    }
      const old = game[selected.row][selected.col];

    game[selected.row][selected.col] = "";
    game[row][col] = old;

    selected = null;

    drawBoard();

}

drawBoard();
  
