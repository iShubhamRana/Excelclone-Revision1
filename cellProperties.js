const DEFAULT_CELL_PROPS = {
  bold: false,
  italic: false,
  underline: false,
  alignment: "left",
  fontFamily: "monospace",
  fontSize: "14",
  fontColor: "#000000",
  BGcolor: "#000000",
};

const ACTIVE_COLOR_PROP = "#d1d8e0"
const INACTIVE_COLOR_PROP = "#ecf0f1"
let sheetDB = Array.from(Array(rows), (row) => {
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
let leftAlign  = alignment[0] , centerAlign = alignment[1] , rightAlign = alignment[2];

//attach property listeners
bold.addEventListener('click' , function executeBold(){
   let [cell , cellProp] =   activeCell(addressBar.value);
   //cell modificiate
   cellProp.bold =  !cellProp.bold;
   cell.style.fontWeight =  cellProp.bold ? "bold":"normal"
   bold.style.background  = cellProp.bold ? ACTIVE_COLOR_PROP :INACTIVE_COLOR_PROP ;
})

italic.addEventListener('click' , function executeItalic(){
    let [cell , cellProp] =   activeCell(addressBar.value);
    //cell modificiate
    cellProp.italic =  !cellProp.italic;
    cell.style.fontStyle =  cellProp.italic ? "italic":"normal"
    italic.style.background  = cellProp.italic ? ACTIVE_COLOR_PROP :INACTIVE_COLOR_PROP ;
 })


underline.addEventListener('click' , function executeUnderline(){
    let [cell , cellProp] =   activeCell(addressBar.value);
    //cell modificiate
    cellProp.underline =  !cellProp.underline;
    cell.style.textDecoration =  cellProp.underline ? "underline":"none"
    underline.style.background  = cellProp.underline ? ACTIVE_COLOR_PROP :INACTIVE_COLOR_PROP ;
 })
 
 


/**
 * 
 * @param {string} address 
 * @return{[HTMLDIVElement , {}]}
 */
function activeCell(address){
    let [row , column] = decodeAddress(address);
    let cell = document.querySelector(`.grid-cell[rowId="${row}"][columnId="${column}"]`);
    let cellProp = sheetDB[row][column]
    return [cell , cellProp]
}

/**
 * 
 * @param {string} address 
 * @return {[row ,column]}
 */
function decodeAddress(address){
    return [
        address.slice(1) -1 , //implicit number coercion
       address.charCodeAt(0) - 65
    ]
}