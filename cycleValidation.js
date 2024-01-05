
let graphComponent = [];
for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < columns; j++) {
    row.push([]);
  }
  graphComponent.push(row);
}

function isGraphCyclic() {
  //need dfsvisited , visited
  let visited = [];
  let dfsVisited = [];

  for (let i = 0; i < rows; i++) {
    let visitedRow = [], dfsVisitedRow = [];
    for (let j = 0; j < columns; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (!visited[i][j]) {
        let isCyclic = dfsCycleDetection(graphComponent, i, j, visited, dfsVisited);
        if (isCyclic) return true;
      }
    }
  }

  return false;

}


function dfsCycleDetection(graphComponent, i, j, visited, dfsVisited) {
  visited[i][j] = true;
  dfsVisited[i][j] = true;
  let a = visited[i][j];


  for (let k = 0; k < graphComponent[i][j].length; k++) {
    let [childRowId, childColumnid] = graphComponent[i][j][k];
    if (visited[childRowId][childColumnid]) {
      if (dfsVisited[childRowId][childColumnid]) return true;

    } else {
      let res = dfsCycleDetection(graphComponent, childRowId, childColumnid, visited, dfsVisited);
      if (res) return true;
    }

  }
  dfsVisited[i][j] = false;
  return false;
}
