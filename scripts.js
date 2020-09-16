const INITIAL_BOARD_SIZE = 16;
const PROMPT_TEXT = "How many rows and columns?";

/**
 * author: mjackson
 * link: https://gist.github.com/mjackson/5311256
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return [ h, s, l ];
  }

/**
 * Changes element background color to of random hue, full saturation, and same 
 * lightness
 */
function color() {
    let hue = Math.round(Math.random()*360);
    let matches = this.style.backgroundColor.match(/\d+/g);
    let hslCode = rgbToHsl(matches[0], matches[1], matches[2]);
    console.log(hslCode);
    this.style.backgroundColor = `hsl(${hue}, 100%, ${Math.round(hslCode[2]*100)}%)`;
}

/**
 * Changes element background color to a color with 0% saturation and 10%
 * less lightness than previous value
 */
function darken() {
    let matches = this.style.backgroundColor.match(/\d+/g);
    let hslCode = rgbToHsl(matches[0], matches[1], matches[2]);
    this.style.backgroundColor = `hsl(0,0%,${Math.round(hslCode[2]*100)-10}%)`;
}

/**
 * Create the grid with the global grid_size
 */
function setBoard(grid_size) {

    const cell_size = "1fr";

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
        cell.style.backgroundColor = "hsl(0,0%,95%)";
        cell.classList.add("cell");
        cell.onmouseover = color;
        cell.onmouseout = darken;
        board.appendChild(cell);
    }
    
}

/**
 * Reset the color of the cells on the board and prompt the user
 * to recreate it with a new size.
 */
function clearBoard() {
    let elements = document.getElementsByClassName("cell");
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "hsl(0,0%,95%)";
    }
    let grid_size = parseInt(prompt(PROMPT_TEXT));
    setBoard(grid_size);
    let dimText = document.getElementById("dimensions");
    dimText.textContent = `Current Board Dimensions: ${grid_size}x${grid_size}`
}

/* Clear button functionality */
let button = document.getElementById("clear");
button.addEventListener("click", clearBoard);

setBoard(INITIAL_BOARD_SIZE);