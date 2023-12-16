const mapGrid = document.querySelector("#map");
const details = document.querySelector("#details");
const score = document.querySelector(".score");
const mission = document.querySelector(".missions");
const nextEle = document.querySelector(".nextElement");
const body = document.querySelector("body");
const flip = document.createElement("button");
const rotate = document.createElement("button");
const nextBtn = document.createElement("button");
const prevBtn = document.createElement("button");
const forShape = document.createElement("div");
const shapes = document.createElement("div");
const divInScore = document.createElement("div");
const totalPoints = document.createElement("div");

const currentElement = function (ele) {
  for (let i = 0; i < 4; i++) {
    ele = rotateAndTrim(ele);
  }
  return ele;
};
let index = Math.floor(Math.random() * elements.length - 1) + 1;
let curEle = currentElement(elements[index].shape);


let selectedCells = 0;
let unitTime = 0;
let gameOver = true;
let mountains = [
  [2, 2],
  [4, 9],
  [6, 4],
  [9, 10],
  [10, 6],
];

let n = 0;

const grid = document.getElementById("grid");

const table = document.createElement("table");
function setTable() {
  for (let i = 1; i <= 11; i++) {
    const tr = document.createElement("tr");
    tr.classList.add("row");

    for (let j = 1; j <= 11; j++) {
      const td = document.createElement("td");
      td.classList.add("cell");
      tr.appendChild(td);

      if (mountains[n][0] === i && mountains[n][1] === j) {
        td.setAttribute("type", "mountain");
        if (mountains.length - 1 !== n) n++;
        td.classList.add("mountain");
        td.style.backgroundImage = "url('./tiles/mountain_tile.png')";
        td.backgroundPosition = "cover";
        td.backgroundRepeat = "no-Repeat";
        td.setAttribute("flag", "1");
      } else {
        td.setAttribute("flag", "0");
        td.setAttribute("type", "empty");
        td.style.backgroundImage = "url('./tiles/base_tile.png')";
      }

    

      td.setAttribute("value", `(${i},${j})`);
    }

    table.appendChild(tr);
  }
}

setTable();
grid.appendChild(table);

const currentSeason = missions["basic"];

divInScore.classList.add("scoreBoxs");


const scoreArr = ["Spring", "Summer", "Autumn", "Winter"];

for (let i = 0; i < 4; i++) {
  const box = document.createElement("div");
  box.innerHTML = `<h3>${scoreArr[i]}</h3> <div><span>0</span> Points</div>`;
  box.classList.add("scoreBox");
  box.classList.add(`score${i + 1}`);
  divInScore.appendChild(box);
}

totalPoints.classList.add("totalPoints");
totalPoints.innerHTML = `<h3>Total: <span class='points'>0</span> Points</h3>`;

score.appendChild(divInScore);
score.appendChild(totalPoints);

let div1 = document.createElement("div");
div1.classList.add(`missionDivs`);

let div2 = document.createElement("div");
div2.classList.add(`missionDivs`);


const missionCardElement = document.createElement("div");
const missionCardElement2 = document.createElement("div");

missionCardElement.classList.add("mission-card");
missionCardElement.innerHTML = `<div class="basicMassion1"><img src="./missions_eng/sleepyvalley.png" alt="Mission Image"></div>
                                  <div class="basicMassion3"><img src="./missions_eng/BorderLands.png" alt="Mission Image"></div>`;

div1.appendChild(missionCardElement);
missionCardElement2.classList.add("mission-card");
missionCardElement2.innerHTML = `<div class="basicMassion2"><img src="./missions_eng/wateringpotatoes.png" alt="Mission Image"></div>
                                  <div class="basicMassion4"><img src="./missions_eng/Edgeoftheforest.png" alt="Mission Image"></div>`;
div2.appendChild(missionCardElement2);


mission.appendChild(div1);
mission.appendChild(div2);

const missionCard = document.querySelector(".mission-card div");

const bm1 = document.querySelector(".basicMassion1");
const bm2 = document.querySelector(".basicMassion2");
const bm3 = document.querySelector(".basicMassion3");
const bm4 = document.querySelector(".basicMassion4");

const rotateFlip = `<div class='left col-6'>
                        <h3 class='currentEleText'>Current element:</h3>
                        <div class='btn'>
                            
                        </div>
                    </div>

                    <div class='right col-6'>
                        <span> <span>
                    </div>`;

nextEle.innerHTML = rotateFlip;

const btn = document.querySelector(".btn");
const elementBox = document.querySelector(".right");

flip.innerHTML = "FLIP";
rotate.innerHTML = "ROTATE";

forShape.appendChild(flip);
forShape.appendChild(rotate);

btn.appendChild(forShape);

let eleMatrix;

function rotateAndTrim(mtx) {
  let arr = [];
  let trimAndRotatedshape = [];

  let flag;
  mtx.map((ele) => {
    flag = false;
    for (let i = 0; i < ele.length; i++) {
      if (ele[i] === 1) flag = true;
    }
    if (flag) arr.push(ele);
  });

  let row = arr.length;
  let col = arr[0].length;

  let arr2;
  for (let i = 0; i < col; i++) {
    arr2 = [];
    for (let j = 0; j < row; j++) {
      arr2.push(0);
    }
    trimAndRotatedshape.push(arr2);
  }

  let k = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr[i].length - 1; j >= 0; j--) {
      trimAndRotatedshape[k++][i] = arr[i][j];
    }
    k = 0;
  }

  return trimAndRotatedshape;
}

const color = {
  water: "blue",
  forest: "green",
  farm: "yellow",
  town: "grey",
};

let count = 0;

function countElements() {
  curEle.map((row) =>
    row.map((ele) => {
      if (ele === 1) count++;
    })
  );
}

function getShape(sh2D) {
  shapes.innerHTML = "";

  const obj = elements[index];
  const table = document.createElement("table");
  table.classList.add("shapedTable");

  let smallTable = document.createElement("div");
  table.setAttribute("draggable", "true");
  let i = 0;
  sh2D.map((row) => {
    let j = 0;
    const tr = document.createElement("tr");

    row.map((ele) => {
      const td = document.createElement("td");
      tr.appendChild(td);
      td.setAttribute("value", `${i}, ${j++}`);
      if (ele === 1) {
        td.setAttribute("flag", `1`);
        const col = obj.type;
        td.style.backgroundColor = color[col];
        td.classList.add("cell");
        td.style.backgroundImage = `url('./tiles/${elements[index].type}_tile.png')`;
        td.setAttribute("type", `${obj.type}`);
      } else {
        td.setAttribute("flag", `0`);
      }
      table.appendChild(tr);
    });
    i++;
  });

  shapes.appendChild(table);
}

getShape(curEle);

let trackOriginalshape = elements[index].shape;

function rotateShape() {
  trackOriginalshape = [];
  curEle = rotateAndTrim(curEle);
  getShape(curEle);
  changeDrag();

  curEle.map((row) => {
    console.log(row);
    for (let i = row.length - 1; i < 3; i++) {
      if (row.length < 3) {
        if (elements[index].rotation === 0) row.push(0);
        else row.unshift(0);
      }
    }
    trackOriginalshape.push(row);
  });
  elements[index].rotation++;
}

function flipShape(e) {
  curEle = currentElement(curEle.reverse());
  const flipedShape = curEle;
  getShape(flipedShape);
  changeDrag();
  trackOriginalshape = flipedShape;

  console.log(trackOriginalshape, flipedShape, curEle);
}

flip.addEventListener("click", flipShape);
rotate.addEventListener("click", rotateShape);

function checkShape(tb1, tb2) {
  for (let i = 0; i < tb1.length; i++) {
    for (let j = 0; j < tb1[i].length; j++) {
      if (tb1[i][j] !== tb2[i][j]) {
        return false;
      }
    }
  }

  return true;
}

count = 0;
countElements();
const highlightedCell = document.querySelector(".highlightedCell");
function changeCSSRule(ruleName, property, value) {
  var stylesheets = document.styleSheets;
  var ruleExists = false;

  for (var i = 0; i < stylesheets.length; i++) {
    var stylesheet = stylesheets[i];
    for (var j = 0; j < stylesheet.cssRules.length; j++) {
      var rule = stylesheet.cssRules[j];
      if (rule.selectorText === ruleName) {
        rule.style[property] = value;
        ruleExists = true;
        break;
      }
    }
    if (ruleExists) break;
  }

  if (!ruleExists) {
    const stylesheet = document.styleSheets[0];
    if (stylesheet) {
      stylesheet.insertRule(
        ruleName + " { " + property + ": " + value + "; }",
        stylesheet.cssRules.length
      );
    }
  }
}

function set_Attribute(tb, arrI, arrJ, minI, minJ) {
  for (let i = 0; i < arrI.length; i++) {
    if (arrI[i] - minI < 3 && arrJ[i] - minJ < 3)
      tb[arrI[i] - minI][arrJ[i] - minJ] = 1;
  }
}

let maxI = 0;
let minI = 12;

let maxJ = 0;
let minJ = 12;

let arrI = [];
let arrJ = [];

let forBkColor = 0;
let points = 0;

const score1 = document.querySelector(".score1 div span");
const score2 = document.querySelector(".score2 div span");
const score3 = document.querySelector(".score3 div span");
const score4 = document.querySelector(".score4 div span");
const total = document.querySelector(".totalPoints h3 .points");

const table1 = document.querySelector("#map table");
const row = table1.rows.length;
const col = table1.rows[0].cells.length;

function edgeOfTheForest() {
  let point = 0;
  let inputString;
  let numericValues;

  let i;
  let j;

  const forestCells = document.querySelectorAll('#map [type="forest"]');

  forestCells.forEach((cell) => {
    inputString = cell.getAttribute("value");
    numericValues = inputString.match(/\d+/g);

    i = parseInt(numericValues[0], 10);
    j = parseInt(numericValues[1], 10);

    if (i === 1 || i === 11 || j === 1 || j === 11) {
      point++;
    }
  });

  return point;
}

function wateringPotatoes() {
  const farmCells = document.querySelectorAll('#map [type="farm"]');
  const waterCells = document.querySelectorAll('#map [type="water"]');
  let point = 0;
  farmCells.forEach((ele) => {
    let inputString = ele.getAttribute("value");
    let numericValues = inputString.match(/\d+/g);

    const intValue_i = parseInt(numericValues[0], 10);
    const intValue_j = parseInt(numericValues[1], 10);

    waterCells.forEach((wtr) => {
      inputString = wtr.getAttribute("value");
      numericValues = inputString.match(/\d+/g);

      const i = parseInt(numericValues[0], 10);
      const j = parseInt(numericValues[1], 10);

      if (
        wtr.getAttribute("flag") === "0" &&
        ((Math.abs(i - intValue_i) === 1 && Math.abs(j - intValue_j) === 0) ||
          (Math.abs(j - intValue_j) === 1 && Math.abs(i - intValue_i) === 0))
      ) {
        point += 2;
        wtr.setAttribute("flag", "1");
      }
    });
  });

  console.log("wateringPotatoes :", point);
  return point;
}

function sleepyValley() {
  let point = 0;
  let rows = document.querySelectorAll(".row");

  rows.forEach((row) => {
    let count = 0;
    row.childNodes.forEach((cell) => {
      if (cell.getAttribute("type") === "forest") count++;
    });

    if (count === 3) {
      point += 4;
    }
  });

  return point;
}

function borderlandsMission() {
  let point = 0;
  let rows = document.querySelectorAll(".row");
  rows.forEach((row) => {
    flag = true;
    row.childNodes.forEach((cell) => {
      if (cell.getAttribute("type") === "empty") flag = false;
    });

    if (flag) {
      point += 6;
    }
  });

  flag = true;

  for (let j = 0; j < col; j++) {
    for (let i = 0; i < row; i++) {
      cell = table.rows[i].cells[j];
      type = cell.getAttribute("type");

      if (type === "empty") {
        flag = false;
        break;
      }
    }
    if (flag) {
      point += 6;
    }
    flag = true;
  }

  return point;
}

let forSleepyValley = 0;
let forWateringPatatos = 0;
let forBorderlandsMission = 0;
let forEadgeOfForest = 0;

const seasonText = document.querySelector(".seasonText");
const elementNumber = document.querySelector(".ELementNumber");

elementBox.appendChild(shapes);

let largeTable = document.querySelector("#map table");
let ind = 0;
let ind2 = 0;
let smallTable = document.querySelector(".shapedTable");

function changeDrag() {
  smallTable = document.querySelector(".shapedTable");
}

function handleDragStart(e) {
  if (!e.target.closest(".shapedTable")) return;
  console.log(e.target.style);
  e.dataTransfer.setData(`text`, `smallTable`);
}

function cellOnClicked(e) {
  if (!e.target.closest(".cell")) return;

  let inputString = e.target.getAttribute("value");
  let numericValues = inputString.match(/\d+/g);

  ind = parseInt(numericValues[0], 10);
  ind2 = parseInt(numericValues[1], 10);
  console.log(ind, ind2);
}

function handleDragOver(e) {
  e.preventDefault();
}

let cellType;
let cellBC;

function handleDrop(e) {
  if (gameOver) {
    let oldJ = 0;
    let newJ = 0;
    let flag = true;
    e.preventDefault();
    const data = e.dataTransfer.getData(`text`);
    if (data === `smallTable`) {
      const targetCell = e.target.closest(".cell");
      if (targetCell) {
        const smallTableCells = smallTable.querySelectorAll(".shapedTable td");
        let targetIndex = targetCell.getAttribute("value");
        let numericValues = targetIndex.match(/\d+/g);

        let ii = parseInt(numericValues[0], 10);
        let jj = parseInt(numericValues[1], 10);
        console.log("ti ", targetCell, targetIndex, ii, ind, jj, ind2);

        ii = ii - 1 - ind;
        jj = jj - ind2 - 1;

        targetIndex = jj + ii * 11;

        console.log("ti ", targetCell, targetIndex, ii, ind, jj, ind2);

        const largeTableCells = largeTable.querySelectorAll(".cell");
        let k = 0;
        let j = 0;

        for (let i = 0; i < smallTableCells.length; i++) {
          let inputString = smallTableCells[i].getAttribute("value");
          let numericValues = inputString.match(/\d+/g);
          ind = parseInt(numericValues[0], 10);
          ind2 = parseInt(numericValues[1], 10);
          if (k === ind) {
            k++;
            j = 0;
          }

          let target;
          if (targetIndex + j + 11 * ind < 121) {
            target = largeTableCells[targetIndex + j + 11 * ind];
            inputString = target.getAttribute("value");
            numericValues = inputString.match(/\d+/g);
            ind = parseInt(numericValues[0], 10);
            ind2 = parseInt(numericValues[1], 10);
          }

          j++;

          if (smallTableCells[i].getAttribute("flag") === "1") {
            cellType = smallTableCells[i].getAttribute("type");
            cellBC = smallTableCells[i].style.backgroundColor;
            if (oldJ === 0) oldJ = ind2;
            newJ = ind2;

            if (target) target.classList.add("hlCell");
            if (
              !target ||
              target.getAttribute("type") !== "empty" ||
              Math.abs(oldJ - newJ) > 3
            ) {
              flag = false;
            }

            oldJ = newJ;
          }
        }
        k = 0;
        j = 0;
        console.log("flag : ", flag);
        if (flag) {
          for (let i = 0; i < smallTableCells.length; i++) {
            let inputString = smallTableCells[i].getAttribute("value");
            let numericValues = inputString.match(/\d+/g);

            ind = parseInt(numericValues[0], 10);
            ind2 = parseInt(numericValues[1], 10);
            if (k === ind) {
              k++;
              j = 0;
            }

            const target = largeTableCells[targetIndex + j + 11 * ind];
            j++;

            if (smallTableCells[i].getAttribute("flag") === "1") {
              target.innerHTML = smallTableCells[i].innerHTML;
              target.style.backgroundImage = `url('./tiles/${elements[index].type}_tile.png')`;
              target.style.backgroundColor =
                smallTableCells[i].style.backgroundColor;
              target.setAttribute(
                "type",
                smallTableCells[i].getAttribute("type")
              );
            }
          }

          unitTime += elements[index].time;

          if(unitTime <= 7){
            elementNumber.innerHTML = `${unitTime}/7`
            seasonText.innerHTML = scoreArr[0] + " (AB)";
            bm1.classList.add("highlightMissions");
            bm2.classList.add("highlightMissions");
            if(unitTime == 6 || unitTime == 7){
              forSleepyValley = sleepyValley();
              forWateringPatatos = wateringPotatoes();
            }
          }
          else if(unitTime <= 14){
            score1.innerHTML = forSleepyValley + forWateringPatatos;
            total.innerHTML = +score1.innerHTML;
            elementNumber.innerHTML = `${unitTime}/14`
            seasonText.innerHTML = scoreArr[1] + " (BC)",

            bm1.classList.remove("highlightMissions");
            bm2.classList.add("highlightMissions");
            bm3.classList.add("highlightMissions");

            if(unitTime == 13 || unitTime == 14){
              forWateringPatatos = wateringPotatoes();
              forBorderlandsMission = borderlandsMission();
            }


          }
          else if(unitTime <= 21){
            
            score2.innerHTML =  forWateringPatatos + forBorderlandsMission;
            total.innerHTML = +score1.innerHTML + +score2.innerHTML;
            elementNumber.innerHTML = `${unitTime}/21`
            seasonText.innerHTML = scoreArr[2] + " (CD)"

            bm2.classList.remove("highlightMissions");
            bm4.classList.add("highlightMissions");
            bm3.classList.add("highlightMissions");

            if(unitTime == 20 || unitTime == 21){
              forBorderlandsMission = borderlandsMission();
              forEadgeOfForest = edgeOfTheForest();
            }
          }
          else {
            score3.innerHTML =  forBorderlandsMission + forEadgeOfForest;
            total.innerHTML = +score1.innerHTML + +score2.innerHTML + +score3.innerHTML;
            elementNumber.innerHTML = `${unitTime}/28`
            seasonText.innerHTML = scoreArr[3] + " (DA)"

            bm3.classList.remove("highlightMissions");
            bm1.classList.add("highlightMissions");
            bm4.classList.add("highlightMissions");

            if(unitTime == 28 || unitTime == 27){
              forEadgeOfForest = edgeOfTheForest();
              forSleepyValley = sleepyValley();
            }
            
          }

          if (unitTime >= 28) {
            score4.innerHTML = forEadgeOfForest + forSleepyValley;
            total.innerHTML = +total.innerHTML + +score4.innerHTML 
            gameOver = false;
            bm1.classList.remove("highlightMissions");
            bm4.classList.remove("highlightMissions");
          }

          index++;
          if (index === elements.length) index = 0;
          curEle = currentElement(elements[index].shape);
          smallTable.classList.remove("shapedTable");
          getShape(curEle);
          changeDrag();
        } else {
          changeCSSRule(".hlCell", "border", "2px solid red");
        }

        setTimeout(function () {
          if (true) {
            const HLedCells = document.querySelectorAll(".hlCell");
            HLedCells.forEach((cell) => {
              cell.classList.remove("hlCell");
              changeCSSRule(".hlCell", "border", "none");
            });
          }
        }, 1000);
      }
    }
  }
}

const modal = document.querySelector('.modal');
const reset = document.querySelector('.modal button');

reset.addEventListener('click', function(){
  modal.classList.add('hidden');
  location.reload();
});

shapes.addEventListener("dragstart", handleDragStart);
shapes.addEventListener("mousedown", cellOnClicked);

largeTable.addEventListener("dragover", handleDragOver);

largeTable.addEventListener("drop", handleDrop);
