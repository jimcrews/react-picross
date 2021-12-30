import React, { useState, useEffect } from "react";
import { solution, hintsX, hintsY } from "./generator";
import "./App.css";

function App() {
  const [rowsCount] = useState(11); // hints take up a block
  const [columnCount] = useState(11);
  const [boardState, setBoardState] = useState([]);

  // create and initiallize new board
  useEffect(() => {
    if (boardState.length === 0) {
      const matrix = new Array(rowsCount - 1)
        .fill(0)
        .map(() => new Array(columnCount - 1).fill(0));
      setBoardState(matrix);
    }
  }, [solution, hintsX, hintsY]);

  const checkResult = () => {
    console.log(boardState);
    var errorFound = false;

    //Iterate through all elements in first array
    for (var x = 0; x < solution.length; x++) {
      //Iterate through all elements in second array
      for (var y = 0; y < boardState.length; y++) {
        /*This causes us to compare all elements 
       in first array to each element in second array
      Since md1[x] stays fixed while md2[y] iterates through second array.
       We compare the first two indexes of each array in conditional
    */
        if (solution[x][y] !== boardState[x][y]) {
          errorFound = true;
          console.log(`${x}/${y}`);
        }
      }
    }
    console.log(`error found = ${errorFound}`);
  };

  const updateBoard = (blockState, row, column) => {
    const matrix = new Array(rowsCount - 1)
      .fill(0)
      .map(() => new Array(columnCount - 1).fill(0));
    for (let i = 0; i < rowsCount - 1; i++) {
      for (let j = 0; j < columnCount - 1; j++) {
        matrix[i][j] = boardState[i][j];
      }
    }

    matrix[row][column] = blockState ? 1 : 0;

    setBoardState(matrix);
  };

  return (
    <div className="picross-app">
      <div className="picross-grid">
        <table>
          <thead></thead>
          <tbody>
            {new Array(rowsCount).fill(0).map((item, row) => (
              <tr key={row}>
                {new Array(columnCount).fill(0).map((item, column) => (
                  <td key={column}>
                    <Block x={row} y={column} updateBoard={updateBoard} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={checkResult}>Done</button>
    </div>
  );
}

export default App;

function Block({ x, y, updateBoard }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleLeftClick = (e, x, y) => {
    e.preventDefault();
    if (e.buttons === 1) {
      setIsEmpty(false);
      updateBoard(!isSelected && !isEmpty, x, y);
      setIsSelected(!isSelected && !isEmpty);
    }
  };

  const handleRightClick = (e, x, y) => {
    e.preventDefault();
    setIsSelected(false);
    setIsEmpty(!isEmpty);
  };

  const handleClickDrag = (e, x, y) => {
    e.preventDefault();
    if (e.buttons === 1) {
      setIsEmpty(false);
      updateBoard(!isSelected && !isEmpty, x, y);
      setIsSelected(!isSelected && !isEmpty);
    }
    if (e.buttons === 2) {
      setIsSelected(false);
      setIsEmpty(!isEmpty);
    }
  };

  return (
    <div>
      <div>
        {y === 0 && x > 0 && (
          <div className="picross-hint picross-hint-x">
            {hintsX[x - 1] == "10" ? "X" : hintsX[x - 1]}
          </div>
        )}

        {x === 0 && y > 0 && (
          <div className="picross-hint picross-hint-y">
            {hintsY[y - 1] == "10" ? "X" : hintsY[y - 1]}
          </div>
        )}

        {y !== 0 && x !== 0 && (
          <div
            className={`${!isSelected && !isEmpty && "picross-block"} ${
              isSelected && "picross-block-selected"
            } ${isEmpty && "picross-block-empty"} `}
            onContextMenu={(e) => handleRightClick(e, x - 1, y - 1)}
            onMouseDown={(e) => handleLeftClick(e, x - 1, y - 1)}
            onMouseEnter={(e) => handleClickDrag(e, x - 1, y - 1)}
          ></div>
        )}
      </div>
    </div>
  );
}
