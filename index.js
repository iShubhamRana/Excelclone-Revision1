let rows = 100;
let columns = 26;

let addressColumnContainer = document.querySelector(
  ".address-column-container"
);

let addressBar = document.querySelector(".address-bar");

for (let i = 0; i < rows; i++) {
  const addressColumn = document.createElement("div");
  addressColumn.innerText = i + 1;
  addressColumn.setAttribute("class", "address-column");
  addressColumnContainer.appendChild(addressColumn);
}

let addressRowContainer = document.querySelector(".address-row-container");
for (let i = 0; i < columns; i++) {
  const rowContainer = document.createElement("div");
  rowContainer.setAttribute("class", "address-row");
  rowContainer.innerText = String.fromCharCode(i + 65);
  addressRowContainer.appendChild(rowContainer);
}

//add cells to sheet
let cellsContainer = document.querySelector(".cells-container");
for (let i = 0; i < rows; i++) {
  let rowContainer = document.createElement("div");
  rowContainer.setAttribute("class", "row-cell-container");
  for (let j = 0; j < columns; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "grid-cell");
    cell.setAttribute("contenteditable", true);
    rowContainer.appendChild(cell);
    addCellAddressEventListener(cell, i, j);
  }
  cellsContainer.appendChild(rowContainer);
}


function addCellAddressEventListener(cell, row, col) {
  cell.addEventListener("click", function updateAddressbar(e) {
    row = row+1;
    col = String.fromCharCode(col + 65);
    addressBar.value = col+row;
  });
}
