import React, { useState, useEffect } from "react";
import { solution, hintsX, hintsY } from "./generator";
import "./App.css";

function App() {
  const [rowsCount] = useState(11); // hints take up a block
  const [columnCount] = useState(11);

  useEffect(() => {
    console.log(solution);
    console.log(hintsX);
    console.log(hintsY);
  }, [solution, hintsX, hintsY]);

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
                    <Block x={row} y={column} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

function Block({ x, y }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleLeftClick = (e) => {
    e.preventDefault();
    if (e.buttons === 1) {
      setIsEmpty(false);
      setIsSelected(!isSelected);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setIsSelected(false);
    setIsEmpty(!isEmpty);
  };

  const handleClickDrag = (e) => {
    e.preventDefault();
    if (e.buttons === 1) {
      setIsEmpty(false);
      setIsSelected(!isSelected);
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
          <div className="picross-hint picross-hint-x">{hintsX[x - 1]}</div>
        )}

        {x === 0 && y > 0 && (
          <div className="picross-hint picross-hint-y">{hintsY[y - 1]}</div>
        )}

        {y !== 0 && x !== 0 && (
          <div
            className={`${!isSelected && !isEmpty && "picross-block"} ${
              isSelected && "picross-block-selected"
            } ${isEmpty && "picross-block-empty"} `}
            onContextMenu={handleRightClick}
            onMouseDown={handleLeftClick}
            onMouseEnter={handleClickDrag}
          ></div>
        )}
      </div>
    </div>
  );
}
