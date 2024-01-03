

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let cell = document.querySelector(`.grid-cell[rowId="${i}"][columnId="${j}"]`)
    cell.addEventListener('blur', function(e) {
      let address = addressBar.value;
      let [cell, cellProp] = activeCell(address);
      let data = cell.innerText;
      cellProp.value = data;
    })
  }
}


let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener('keydown', function(e) {

  let inputFormula = formulaBar.value;
  if (e.key == "Enter" && inputFormula) {
    let evaluatedValue = evaluateFormula(formulaBar.value);
    //update properties in cellUI
    setCellUIAndCellProp(evaluatedValue, inputFormula);
  }


})

function evaluateFormula(formula) {
  let encodedFormula = formula.split(' ');
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciivalue = encodedFormula[i].charCodeAt(0);
    if (asciivalue >= 65 && asciivalue <= 90) {
      //address of the cell 
      let [cell, cellProp] = activeCell(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }

  let encodedFormulaString = encodedFormula.join(" ");
  return eval(encodedFormulaString);
}

function setCellUIAndCellProp(evaluatedValue, formula) {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  cell.innerText = evaluatedValue;
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;

}
