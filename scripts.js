function darken() {
    this.style.backgroundColor = "rgba(0,0,0,0.1)";
}

function lighten() {
    this.style.backgroundColor = "rgba(0,0,0,0)";
}

let grid_size = 25;
const cell_size = "1fr";

function setBoard() {
    let rowcolSpecs = "";
    for (let i = 0; i < grid_size; i++) {
        rowcolSpecs += cell_size;
        if (i < grid_size-1) {
            rowcolSpecs += " ";
        }
    }

    document.getElementById("board").style.gridTemplateColumns = rowcolSpecs;
    document.getElementById("board").style.gridTemplateRows = rowcolSpecs;

    let board = document.getElementById("board");

    for(let i = 0; i < grid_size**2; i++) {
        let cell = document.createElement("div");
        cell.onmouseover = darken;
        cell.onmouseout = lighten;
        board.appendChild(cell);
    }
}

function clearBoard() {
    grid_size = parseInt(prompt("How big is the board?"));
    setBoard();
}
let button = document.getElementById("clear");
button.addEventListener("click", clearBoard)