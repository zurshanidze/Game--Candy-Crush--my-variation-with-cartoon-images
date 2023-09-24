document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 8;
  const squares = [];
  let score = 0;

  const candyColors = [
    'url("https://cdn.pixabay.com/photo/2014/04/02/10/47/red-304537_1280.png")',
    'url("https://pngimg.com/uploads/cheese/cheese_PNG25289.png")',
    'url("http://www.clker.com/cliparts/p/g/5/C/b/4/orange-owl-hi.png")',
    'url("https://www.pngkey.com/png/full/93-939123_cheshire-cat-clipart-purple-sleeping-cat-cartoon-character.png")',
    'url("https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/13731/cartoon-bunny-clipart-xl.png")',
    'url("https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/79045/cartoon-tree-clipart-md.png")',
    'url("https://www.pngall.com/wp-content/uploads/2/Blueberry-Transparent.png")',
  ];

  // Create Board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);

      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];

      grid.appendChild(square);
      squares.push(square);
    }
  }

  createBoard();

  // Drag the candies
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);

    console.log(colorBeingDragged);
    console.log(this.id, "dragstart");
  }

  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "dragover");
  }

  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, "dragenter");
  }

  function dragLeave() {
    console.log(this.id, "dragleave");
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;

    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    // squares[squareIdBeingReplaced].style.backgroundImage = colorBeingDragged

    console.log(this.id, "drop");
  }

  function dragEnd() {
    console.log(this.id, "dragend");
    // What is a Valid Move?
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else {
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
  }

  // Drop candies down once some have been cleared
  function moveDown() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        const firtRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firtRow.includes(i);

        if (isFirstRow && squares[i].style.backgroundImage === "") {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }

  // Checking for matches

  //check for row of Five
  function checkRowForFive() {
    for (i = 0; i < 59; i++) {
      let rowForFive = [i, i + 1, i + 2, i + 3, i + 4];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValid = [
        4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38,
        39, 44, 45, 46, 47, 52, 53, 54, 55,
      ];
      if (notValid.includes(i)) continue;

      if (
        rowForFive.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 5;
        scoreDisplay.innerHTML = score;
        rowForFive.forEach((index) => {
          squares[index].style.backgroundImage = "";
          console.log("test");
        });
      }
    }
  }
  checkRowForFive();

  //check for row of Four
  function checkRowForFour() {
    for (i = 0; i < 60; i++) {
      let rowForFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];
      if (notValid.includes(i)) continue;

      if (
        rowForFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowForFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
          console.log("test");
        });
      }
    }
  }
  checkRowForFour();

  //check for column of Four
  function checkColumnForFour() {
    for (i = 0; i < 41; i++) {
      let columnForFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnForFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnForFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
          console.log("test");
        });
      }
    }
  }
  checkColumnForFour();

  //check for row of Three
  function checkRowForThree() {
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
          console.log("test");
        });
      }
    }
  }
  checkRowForThree();

  //check for column of Three
  function checkColumnForThree() {
    for (i = 0; i < 48; i++) {
      let checkColumnForThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        checkColumnForThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        checkColumnForThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
          console.log("test");
        });
      }
    }
  }
  checkColumnForThree();

  window.setInterval(function () {
    moveDown();
    checkRowForFive();
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
  }, 100);
});
