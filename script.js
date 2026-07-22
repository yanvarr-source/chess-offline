const board = document.getElementById("board");

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");

        square.style.width = "60px";
        square.style.height = "60px";

        square.style.background =
            (row + col) % 2 === 0 ? "#f0d9b5" : "#b58863";

        board.appendChild(square);
    }
}
