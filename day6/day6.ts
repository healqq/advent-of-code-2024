import { readFileSync } from "fs";

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const copy = (inputs: string[][]) => inputs.map((it) => it.map((it) => it));

const markVisited = (inputs: string[][], startPos: [number, number]) => {
  let curPos = startPos;
  let directionIndex = 0;
  let inBounds = true;
  let visitedCount = 1;
  let currentLoopCount = 0;
  let isLoop = false;

  inputs[curPos[0]][curPos[1]] = "X";

  while (inBounds && !isLoop) {
    let direction = DIRECTIONS[directionIndex];
    const nextMaybePos: [number, number] = [
      curPos[0] + direction[0],
      curPos[1] + direction[1],
    ];

    const nextGridValue = inputs[nextMaybePos[0]]?.[nextMaybePos[1]];
    // console.log(nextGridValue, curPos);

    if (nextGridValue === undefined) {
      inBounds = false;
      continue;
    }

    if (nextGridValue === "#") {
      directionIndex = (directionIndex + 1) % 4;
      continue;
    }

    if (nextGridValue === ".") {
      inputs[nextMaybePos[0]][nextMaybePos[1]] = "X";
      curPos = nextMaybePos;
      currentLoopCount = 0;
      visitedCount += 1;
    }

    if (nextGridValue === "X") {
      curPos = nextMaybePos;
      currentLoopCount += 1;
    }

    if (currentLoopCount > visitedCount) {
      isLoop = true;
    }
  }

  return isLoop;
};

const getStartPos = (inputs: string[][]): [number, number] => {
  for (let row = 0; row < inputs.length; row += 1) {
    for (let col = 0; col < inputs[0].length; col += 1) {
      if (inputs[row][col] === "^") {
        return [row, col];
      }
    }
  }

  return [0, 0];
};

const part1 = (inputsBase: string[][]) => {
  const inputs = copy(inputsBase);
  let curPos = getStartPos(inputs);

  markVisited(inputs, curPos.slice() as [number, number]);

  return inputs.reduce((acc, cur) => {
    acc += cur.reduce((acc2, cur2) => {
      acc2 += cur2 === "X" ? 1 : 0;
      return acc2;
    }, 0);

    return acc;
  }, 0);
};

const part2 = (inputsBase: string[][]) => {
  let startPos = getStartPos(inputsBase);

  const inputs = copy(inputsBase);

  markVisited(inputs, startPos.slice() as [number, number]);

  const visited: [number, number][] = [];
  for (let row = 0; row < inputs.length; row += 1) {
    for (let col = 0; col < inputs[0].length; col += 1) {
      if (inputs[row][col] === "X") {
        if (!(row === startPos[0] && col === startPos[1])) {
          visited.push([row, col]);
        }
      }
    }
  }

  let loops = 0;
  for (let pos of visited) {
    const inputs = copy(inputsBase);
    inputs[pos[0]][pos[1]] = "#";
    // console.log("processing", pos);

    loops += +markVisited(inputs, startPos.slice() as [number, number]);
  }

  return loops;
};

const input = readFileSync("./input.txt", "utf-8");

const inputs = input
  .split("\n")
  .filter((it) => it.length > 0)
  .map((it) => it.split(""));

console.log(part1(inputs));
console.log(part2(inputs));
