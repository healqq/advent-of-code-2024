import assert from "assert";
import { readFileSync } from "fs";

const letters = ["X", "M", "A", "S"];

const test = (
  arr: string[][],
  x: number,
  y: number,
  letterIndex: number,
  xd: number,
  yd: number
) => {
  const newx = x + xd;
  const newy = y + yd;

  const target = arr[newx]?.[newy];
  // console.log(x, y, target);
  if (letterIndex === letters.length) {
    return 1;
  }

  if (target === letters[letterIndex]) {
    return test(arr, newx, newy, letterIndex + 1, xd, yd);
  }

  return 0;
};

const part1 = (input: string[][]) => {
  let result = 0;
  for (let row = 0; row < input.length; row += 1) {
    for (let col = 0; col < input[0].length; col += 1) {
      if (input[row][col] === "X") {
        result +=
          test(input, row, col, 1, 1, 0) +
          test(input, row, col, 1, -1, 0) +
          test(input, row, col, 1, 0, 1) +
          test(input, row, col, 1, 0, -1) +
          test(input, row, col, 1, 1, -1) +
          test(input, row, col, 1, 1, 1) +
          test(input, row, col, 1, -1, 1) +
          test(input, row, col, 1, -1, -1);
      }
    }
  }
};

/*
  M.M  M.S
  ...  ...
  S.S  M.S

  S.S  S.M
  ...  ...
  M.M  S.M

  
*/

const test2 = (arr: string[][], x: number, y: number, d: number) => {
  let count = 0;
  // 0,0 | 2,2                       2,2 | 0,0
  if (arr[x + d]?.[y + d] === "M" && arr[x - d]?.[y - d] === "S") {
    count += 1;
  }
  // 2,0 | 0, 2                      0,2 | 2,0
  if (arr[x + d]?.[y - d] === "S" && arr[x - d]?.[y + d] === "M") {
    count += 1;
  }
  // 2,0 | 0, 2                      0,2 | 2,0
  if (arr[x + d]?.[y - d] === "M" && arr[x - d]?.[y + d] === "S") {
    count += 1;
  }

  return count >= 2 ? 1 : 0;
};

const part2 = (input: string[][]) => {
  // console.table(input);
  let result = 0;
  for (let row = 0; row < input.length; row += 1) {
    for (let col = 0; col < input[0].length; col += 1) {
      if (input[row][col] === "A") {
        result += test2(input, row, col, 1) + test2(input, row, col, -1);
      }
    }
  }

  return result;
};

const input = readFileSync("./input.txt", "utf-8");
// const input2 = readFileSync("./input-small.txt", "utf-8");

const inputs = input
  .split("\n")
  .filter((it) => it.length > 0)
  .map((line) => line.split(""));

// const inputs2 = input2
//   .split("\n")
//   .filter((it) => it.length > 0)
//   .map((line) => line.split(""));

// console.log(inputs);
// console.log(inputs.length);
// console.log(input1.length);
// console.log(part2(inputs2));
console.log(part1(inputs));
// console.log(part2(inputs));
console.log(part2(inputs));
// console.log(part1([input1]));
// console.log(part2([input1]));
