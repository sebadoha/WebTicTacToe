let t0 = document.getElementById('t-0');
let t1 = document.getElementById('t-1');
let t2 = document.getElementById('t-2');
let t3 = document.getElementById('t-3');
let t4 = document.getElementById('t-4');
let t5 = document.getElementById('t-5');
let t6 = document.getElementById('t-6');
let t7 = document.getElementById('t-7');
let t8 = document.getElementById('t-8');
function getCircleSVG() {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#2ECC71" class="bi bi-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" /></svg>';
}
function getCrossSVG() {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#E74C3C" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" /></svg>';
}
function drawCircle(t) {
  t.innerHTML = getCircleSVG();
}
function drawCross(t) {
  t.innerHTML = getCrossSVG();
}
let tableArr = [t0, t1, t2, t3, t4, t5, t6, t7, t8];
let tableData = [0, 0, 0, 0, 0, 0, 0, 0, 0];
function getTablePlace() {
  for (let i = 0; i < tableArr.length; ++i) {
    tableArr[i].addEventListener('click', function () {
      if (tableData[i] === 0) {
        drawCircle(tableArr[i]);
        tableData[i] = 1;
        drawRandomCross();
        determineGameState();
      }
    });
  }
}
getTablePlace();
function drawRandomCross() {
  while (true) {
    let tPlace = Math.floor(Math.random() * (10 - 1));
    if (tableData[tPlace] !== 1 && tableData[tPlace] !== -1) {
      tableData[tPlace] = -1;
      drawCross(tableArr[tPlace]);
      break;
    } else {
      let isSpace = false;
      for (let i = 0; i < tableData.length; ++i) {
        if (tableData[i] === 0) {
          isSpace = true;
        }
      }
      if (!isSpace) { break; }
    }
  }
}
let tSpace = document.getElementById('t-section');
function determineGameState() {
  let determination = scenario();
  if (determination === 'user-1') {
    while (tSpace.firstChild != null) {
      tSpace.removeChild(tSpace.firstChild);
    }
    tSpace.classList.add('t-section-win');
    tSpace.appendChild(restartGameContext(determination));
  } else if (determination === 'not-user-1') {
    while (tSpace.firstChild != null) {
      tSpace.removeChild(tSpace.firstChild);
    }
    tSpace.classList.add('t-section-loss');
    tSpace.appendChild(restartGameContext(determination));
  }
}
function scenario() {
  if (
    tableData[0] == 1 && tableData[1] == 1 && tableData[2] == 1 ||
    tableData[3] == 1 && tableData[4] == 1 && tableData[5] == 1 ||
    tableData[6] == 1 && tableData[7] == 1 && tableData[8] == 1 ||
    tableData[0] == 1 && tableData[3] == 1 && tableData[6] == 1 ||
    tableData[1] == 1 && tableData[4] == 1 && tableData[7] == 1 ||
    tableData[2] == 1 && tableData[5] == 1 && tableData[8] == 1 ||
    tableData[0] == 1 && tableData[4] == 1 && tableData[8] == 1 ||
    tableData[2] == 1 && tableData[4] == 1 && tableData[6] == 1
  ) {
    return 'user-1';
  } else if (
    tableData[0] == -1 && tableData[1] == -1 && tableData[2] == -1 ||
    tableData[3] == -1 && tableData[4] == -1 && tableData[5] == -1 ||
    tableData[6] == -1 && tableData[7] == -1 && tableData[8] == -1 ||
    tableData[0] == -1 && tableData[3] == -1 && tableData[6] == -1 ||
    tableData[1] == -1 && tableData[4] == -1 && tableData[7] == -1 ||
    tableData[2] == -1 && tableData[5] == -1 && tableData[8] == -1 ||
    tableData[0] == -1 && tableData[4] == -1 && tableData[8] == -1 ||
    tableData[2] == -1 && tableData[4] == -1 && tableData[6] == -1
  ) {
    return 'not-user-1';
  }
}
function restartGameContext(determination) {
  let rSection = document.createElement('section');
  let rTextRow = document.createElement('div');
  rTextRow.classList.add('row');
  let rTextCol = document.createElement('div');
  rTextRow.appendChild(rTextCol);
  rTextCol.classList.add('col');
  rTextCol.classList.add('r-game-text-top-margin');
  if (determination === 'user-1') {
    rTextCol.textContent = "User Won";
    rTextCol.classList.add('r-game-text')
  } else if (determination === 'not-user-1') {
    rTextCol.textContent = "User Lost";
    rTextCol.classList.add('r-game-text')
  }
  let rBtnRow = document.createElement('row');
  rBtnRow.classList.add('row');
  let rBtnCol = document.createElement('col');
  rBtnCol.classList.add('col');
  rBtnCol.classList.add('justify-content-center');
  rBtnCol.classList.add('align-items-center');
  rBtnCol.classList.add('d-flex');
  rBtnRow.appendChild(rBtnCol);
  let rBtn = document.createElement('button');
  rBtn.addEventListener('click', function () {
    location.reload();
  });
  rBtn.classList.add('r-btn-restart');
  rBtn.textContent = 'Restart';
  rBtnCol.appendChild(rBtn);
  rSection.appendChild(rTextRow);
  rSection.appendChild(rBtnRow);
  return rSection;
}