const DEFAULT_CELL_PROPS = {
  bold: false,
  italic: false,
  underline: false,
  alignment: "left",
  fontFamily: "monospace",
  fontSize: "14",
  fontColor: "#000000",
  bgColor: "#ecf0f1",
  value: "",
  formula: ""
};

const ACTIVE_COLOR_PROP = "#d1d8e0"
const INACTIVE_COLOR_PROP = "#ecf0f1"
let sheetDB = Array.from(Array(rows), () => {
  return Array.from(Array(columns), () => ({ ...DEFAULT_CELL_PROPS }));
});




//selector for cell properties
let bold = document.querySelector('.bold');
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');
let fontSize = document.querySelector('.font-size-prop');
let fontFamily = document.querySelector('.font-family-prop');
let fontColor = document.querySelector('.font-color-prop');
let bgColor = document.querySelector('.background-color-prop');
let alignment = document.querySelectorAll('.alignment');
let leftAlign = alignment[0], centerAlign = alignment[1], rightAlign = alignment[2];

//attach property listeners
bold.addEventListener('click', function executeBold() {
  let [cell, cellProp] = activeCell(addressBar.value);
  //cell modificiate
  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal"
  bold.style.background = cellProp.bold ? ACTIVE_COLOR_PROP : INACTIVE_COLOR_PROP;
})

italic.addEventListener('click', function executeItalic() {
  let [cell, cellProp] = activeCell(addressBar.value);
  //cell modificiate
  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal"
  italic.style.background = cellProp.italic ? ACTIVE_COLOR_PROP : INACTIVE_COLOR_PROP;
})


underline.addEventListener('click', function executeUnderline() {
  let [cell, cellProp] = activeCell(addressBar.value);
  //cell modificiate
  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none"
  underline.style.background = cellProp.underline ? ACTIVE_COLOR_PROP : INACTIVE_COLOR_PROP;
})

fontSize.addEventListener('click', function executeFontSizeChange() {
  let [cell, cellProp] = activeCell(addressBar.value);
  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;

})



fontFamily.addEventListener('click', function executeFontFamilyChange() {
  let [cell, cellProp] = activeCell(addressBar.value);
  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
})


fontColor.addEventListener('change', function executeFontColorChange() {
  let [cell, cellProp] = activeCell(addressBar.value);
  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
})



bgColor.addEventListener('change', function executeBackgroundColorChange() {
  let [cell, cellProp] = activeCell(addressBar.value);
  cellProp.bgColor = bgColor.value;
  cell.style.backgroundColor = cellProp.bgColor;
  bgColor.value = cellProp.bgColor;
})

alignment.forEach((alignElement) => {
  alignElement.addEventListener('click', function executeAlignment(e) {
    let [cell, cellProp] = activeCell(addressBar.value);
    let alignValue = e.target.classList[0];

    cellProp.alignment = alignValue;
    cell.style.textAlign = alignValue;

    switch (alignValue) {
      case "left":
        leftAlign.style.backgroundColor = ACTIVE_COLOR_PROP;
        centerAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        rightAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        break;
      case "center":
        leftAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        centerAlign.style.backgroundColor = ACTIVE_COLOR_PROP;
        rightAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        break;
      case "right":

        leftAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        centerAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        rightAlign.style.backgroundColor = ACTIVE_COLOR_PROP;
        break;

    }

  })
})

/*ADD EVENTLISTENER TO UPDATE PROPERTIES WHEN IN ACTIONS BAR TO THE PROPERTIES PREVIOUSOLY APPLIED TO CELL*/
const allCells = document.querySelectorAll('.grid-cell');
for (let i = 0; i < allCells.length; i++) {
  addListenerToAttachCellProperties(allCells[i]);
}
function addListenerToAttachCellProperties(cell) {

  cell.addEventListener('click', function cellClicked() {

    const cellProp = activeCell(addressBar.value)[1];

    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"

    cell.style.textDecoration = cellProp.underline ? "underline" : "none"
    cell.style.fontSize = cellProp.fontSize + "px";

    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;

    cell.style.backgroundColor = cellProp.bgColor;
    cell.style.textAlign = cellProp.alignment;



    //APPLY PROPERTIES TO UI CONTAINER
    bold.style.background = cellProp.bold ? ACTIVE_COLOR_PROP : INACTIVE_COLOR_PROP;
    italic.style.background = cellProp.italic ? ACTIVE_COLOR_PROP : INACTIVE_COLOR_PROP;
    underline.style.background = cellProp.underline ? ACTIVE_COLOR_PROP : INACTIVE_COLOR_PROP;

    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    fontColor.value = cellProp.fontColor;
    bgColor.value = cellProp.bgColor;

    switch (cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = ACTIVE_COLOR_PROP;
        centerAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        rightAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        break;
      case "center":
        leftAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        centerAlign.style.backgroundColor = ACTIVE_COLOR_PROP;
        rightAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        break;
      case "right":

        leftAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        centerAlign.style.backgroundColor = INACTIVE_COLOR_PROP;
        rightAlign.style.backgroundColor = ACTIVE_COLOR_PROP;
        break;

    }

  })
}




function activeCell(address) {
  let [row, column] = decodeAddress(address);
  let cell = document.querySelector(`.grid-cell[rowId="${row}"][columnId="${column}"]`);
  let cellProp = sheetDB[row][column]
  return [cell, cellProp]
}

/**
 * 
 * @param {string} address 
 * @return {[row ,column]}
 */
function decodeAddress(address) {
  return [
    address.slice(1) - 1, //implicit number coercion
    address.charCodeAt(0) - 65
  ]
}
