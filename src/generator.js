var dimensionWidth = 10;
var dimensionHeight = 10;

var solution = [];

for (var i = 0; i < dimensionHeight; i++) {
  solution[i] = [];
  for (var j = 0; j < dimensionWidth; j++) {
    var random = Math.floor(Math.random() * 2);
    solution[i][j] = random;
  }
}

var hintsX = [];
var hintsY = [];

for (var i = 0; i < dimensionHeight; i++) {
  var streak = 0;
  hintsX[i] = [];
  for (var j = 0; j < dimensionWidth; j++) {
    if (solution[i][j] === 0) {
      if (streak > 0) {
        hintsX[i].push(streak);
      }
      streak = 0;
    } else {
      streak++;
    }
  }
  if (streak > 0) {
    hintsX[i].push(streak);
  }
}

for (var j = 0; j < dimensionWidth; j++) {
  var streak = 0;
  hintsY[j] = [];
  for (var i = 0; i < dimensionHeight; i++) {
    if (solution[i][j] === 0) {
      if (streak > 0) {
        hintsY[j].push(streak);
      }
      streak = 0;
    } else {
      streak++;
    }
  }
  if (streak > 0) {
    hintsY[j].push(streak);
  }
}

export { solution, hintsX, hintsY };
