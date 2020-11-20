const game = {
  board: document.querySelector(".gameboard"),
  arrayEl: [],
  win: false
};
game.boardEl = game.board.querySelectorAll(".gameboard__item");
const mixButton = document.querySelector(".mixed");

game.renderPosition = function (arr) {
  const columnPosition = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) {
        if (i % 4 > 2) {
          arr[i].style.left = "75%";
        } else if (i % 4 > 1) {
          arr[i].style.left = "50%";
        } else if (i % 4 > 0) {
          arr[i].style.left = "25%";
        } else if (i % 4 === 0) {
          arr[i].style.left = "0%";
        }
      }
    }
  };
  const rowPosition = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) {
        if (i < 4) {
          arr[i].style.top = "0%";
        }
        if (i >= 4 && i < 8) {
          arr[i].style.top = "25%";
        }
        if (i >= 8 && i < 12) {
          arr[i].style.top = "50%";
        }
        if (i >= 12) {
          arr[i].style.top = "75%";
        }
      }
    }
  };
  columnPosition(arr);
  rowPosition(arr);
};

game.mixArrayEl = function (array) {
  array.sort((a, b) => {
    return Math.random() - 0.5;
  });
};

game.cellStep = function (bodyEL) {
  const emptyCell = game.arrayEl.findIndex((element, index, array) => {
    return element === 0;
  });
  const indexCell = game.arrayEl.findIndex((element, index, array) => {
    return element === bodyEL;
  });
  const row = Math.floor(indexCell / 4);
  const column = indexCell % 4;

  const variableStep = {
    top: row === 0 ? null : indexCell - 4,
    bottom: row === 3 ? null : indexCell + 4,
    left: column === 0 ? null : indexCell - 1,
    right: column === 3 ? null : indexCell + 1
  };
  if (Object.values(variableStep).includes(emptyCell)) {
    game.arrayEl[emptyCell] = game.arrayEl[indexCell];
    game.arrayEl[indexCell] = 0;
    game.renderPosition(game.arrayEl);
    game.checkedToWin(game.arrayEl);
    console.dir(game);
  }

  console.warn("can't do step");
};

game.checkedToWin = function (array) {
  // debugger;
  if (array[0] === 0) {
    game.win = array.slice(1).every(function (el, index, arr) {
      if (index !== arr.length - 1) {
        return +el.innerText + 1 == arr[index + 1].innerText;
      }
      return +el.innerText - 1 == arr[index - 1].innerText;
    });
  } else if (array[array.length - 1] === 0) {
    game.win = array
      .slice(0, array.length - 1)
      .every(function (el, index, arr) {
        if (index !== arr.length - 1) {
          return +el.innerText + 1 == arr[index + 1].innerText;
        }

        return +el.innerText - 1 == arr[index - 1].innerText;
      });
  }
  if (game.win) {
    window.alert("You win!");
  }
};

function mixToClick() {
  game.mixArrayEl(game.arrayEl);
  game.renderPosition(game.arrayEl);
}

function setArrayEl(arr) {
  for (let i = 0; i < arr.length; i++) {
    game.arrayEl.push(arr[i]);
  }
  game.arrayEl.push(0);
}

game.board.addEventListener("click", function () {
  const cellItem = event.target.closest(".gameboard__item");

  game.cellStep(cellItem);
});
mixButton.addEventListener("click", mixToClick);

setArrayEl(game.boardEl);
game.mixArrayEl(game.arrayEl);
game.renderPosition(game.arrayEl);
game.checkedToWin(game.arrayEl);
