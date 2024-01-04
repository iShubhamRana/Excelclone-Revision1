/*/
 *
 * 1. Add dependency to the cell when adding a formula
 * 2. Remove the previous dependencies, once we have a new formula
 * 3. 
 *
 *
 * */

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

    const [cell, cellProp] = activeCell(addressBar.value);
    const previousFormula = cellProp.formula;
    if (previousFormula !== inputFormula) removeChildFromParent(previousFormula);

    //update properties in cellUI
    setCellUIAndCellProp(evaluatedValue, inputFormula);
    //update the dpendency array for each cell 
    addChildToParent(inputFormula);
    console.log(sheetDB);
  }
})

//THIS FUNCTION UPDATES THE DEPENDENCY ARRAY ON NEW FORMULA
function addChildToParent(formula) {
  let encodedFormula = formula.split(' ');
  let childAddress = addressBar.value;
  for (let i = 0; i < encodedFormula.length; i++) {
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [ParentCell, ParentCellProp] = activeCell(encodedFormula[i]);
      let asciiValue = encodedFormula[i].charCodeAt(0);
      ParentCellProp.children.push(childAddress);
    }
  }

}

//UPDATE CHILDRENS ON VALUE CHANGE
function updateChildrenCells(parentAddress) {
  let [parentCell, parentCellProp] = activeCell(parentAddress);
  let children = parentCellProp.children;

  for (let i in children) {
    let childAddress = children[i];
    let [childCell, childCellProp] = activeCell(children[i]);
    let formula = childCellProp.formula;
    let value = evaluateFormula(formula);


  }



}

//THIS FUNCTION REMOVES THE DEPENDENCY ELEMENTS ADDED DUE TO THE PREVIOUS FORMULA
function removeChildFromParent(formula) {
  //old formula is needed
  let encodedFormula = formula.split(' ');
  let childAddress = addressBar.value;
  for (let i = 0; i < encodedFormula[i].length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [ParentCell, ParentCellProp] = activeCell(encodedFormula[i]);
      let idx = ParentCellProp.children.indexOf(childAddress);
      ParentCellProp.children.splice(idx, 1);
    }
  }
}



//THIS FUNCTION EVALUES THE FORMULA ENTERED
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

//UPDATES THE CELL WHEN THE FORMULA IS ENTERED
function setCellUIAndCellProp(evaluatedValue, formula) {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  cell.innerText = evaluatedValue;
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;

}
