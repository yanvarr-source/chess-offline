const stockfish = new Worker("stockfish/stockfish-18-lite.js");
let moveHistory = [];

stockfish.postMessage("uci");
stockfish.postMessage("isready");
stockfish.postMessage("ucinewgame");

stockfish.onmessage = function(event) {

    const msg = event.data;

    console.log(msg);

    if (msg.startsWith("bestmove")) {
    const move = msg.split(" ")[1];

applyMove(move);
    console.log("Stockfish:", move);
}

};
    function sendToStockfish(command) {
    console.log(">>>", command);
    stockfish.postMessage(command);
}

function getAllMoves(color) {
    const moves = [];

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = game[r][c];
            if (piece === "") continue;
            if (!piece.startsWith(color)) continue;

            // Пешки
            if (piece[1] === "p") {
                const dir = color === "w" ? -1 : 1;
                const nr = r + dir;

                if (nr >= 0 && nr < 8 && game[nr][c] === "") {
                    moves.push({
                        fromRow: r,
                        fromCol: c,
                        toRow: nr,
                        toCol: c
                    });
                }
            }

            // Ладьи
            if (piece[1] === "r") {
                const dirs = [
                    [-1,0],[1,0],[0,-1],[0,1]
                ];

                for (const [dr,dc] of dirs) {
                    let nr = r + dr;
                    let nc = c + dc;

                    while (
                        nr >= 0 && nr < 8 &&
                        nc >= 0 && nc < 8
                    ) {
                        if (game[nr][nc] === "") {
                            moves.push({
                                fromRow:r,
                                fromCol:c,
                                toRow:nr,
                                toCol:nc
                            });
                        } else {
                            if (!game[nr][nc].startsWith(color)) {
                                moves.push({
                                    fromRow:r,
                                    fromCol:c,
                                    toRow:nr,
                                    toCol:nc
                                });
                            }
                            break;
                        }

                        nr += dr;
                        nc += dc;
                    }
                }
            }
        }
    }

    return moves;
}

function computerMove() {

   sendToStockfish("position startpos moves " + moveHistory.join(" "));

    sendToStockfish("go depth 10");

}
 sendToStockfish("uci");
sendToStockfish("isready");
sendToStockfish("ucinewgame");
