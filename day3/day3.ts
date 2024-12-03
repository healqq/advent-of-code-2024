import assert from "assert";
import { readFileSync } from "fs";

const mulRegExp = /mul\(\d{1,3},\d{1,3}\)/g;
const fullRegExp = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
const calcMuls = (input: string[]) => {
  return input
    .map((match) => {
      return match
        .slice(4, -1)
        .split(",")
        .map((it) => Number.parseInt(it, 10))
        .reduce((acc, cur) => acc * cur, 1);
    })
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
};
const part1 = (input: string[]) => {
  return input
    .map((line) => {
      const matches = line.matchAll(mulRegExp);

      const matchesArr = [...matches].map((it) => it[0]);

      return calcMuls(matchesArr);
    })
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
};

const part2 = (input: string[]) => {
  let isActive = true;
  return input
    .map((line) => {
      const matches = line.matchAll(fullRegExp);

      const matchesArr = [...matches].map((it) => it[0].trim());

      const filtered = matchesArr.reduce(
        (acc, cur) => {
          if (cur === "do()") {
            isActive = true;
          } else if (cur === "don't()") {
            isActive = false;
          } else {
            if (isActive && cur.startsWith("mul")) {
              acc.lines.push(cur);
            }
          }

          return acc;
        },
        { lines: [] as string[] }
      );

      return calcMuls(filtered.lines);
    })
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);
};

const input = readFileSync("./day3/input.txt", "utf-8");

const inputs = input.split("\n").filter((it) => it.length > 0);

// const input1 = [3, 4, 2, 1, 3, 3];

// const input2 = [4, 3, 5, 3, 9, 3];

// assert(day1_2(input1, input2) === 31);
// const input1 = [
//   [1, 2, 3, 4, 6, 7, 9],
//   [1, 5, 3, 4, 6, 7, 9],
//   [9, 8, 7, 6, 5, 3],
//   [9, 8, 6, 4, 7],
// ];

const input1 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
// const input1 = [
//   [7, 6, 4, 2, 1],
//   [1, 2, 7, 8, 9],
//   [9, 7, 6, 2, 1],
//   [1, 3, 2, 4, 5],
//   [8, 6, 4, 4, 1],
//   [1, 3, 6, 7, 9],
// [1, 1, 3, 6, 7, 9],
// [1, 3, 6, 7, 9, 9],
// [1, 3, 6, 7, 9, 7],
// [1, 3, 6, 7, 9, 25],
// [11, 1, 3, 6, 7, 9],
// [1, 3, 6, 7, 9],
// ];
// console.log(inputs);
// console.log(inputs.length);
// console.log(input1.length);
console.log(part1(inputs));
console.log(part2(inputs));
// console.log(part2(inputs));
console.log(part1([input1]));
console.log(part2([input1]));
