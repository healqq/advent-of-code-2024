import assert from "assert";
import { readFileSync } from "fs";

const check = (next: number, prev: number, asc: boolean) => {
  if (asc) {
    return next - prev <= 3 && next > prev;
  } else {
    return next - prev >= -3 && next < prev;
  }
};

const checkAll = (numbers: number[]) => {
  const asc = numbers[0] < numbers[1];

  for (let i = 1; i < numbers.length; i += 1) {
    const num = numbers[i];
    const curAsc = numbers[i - 1] < num;

    if (curAsc !== asc) {
      return i - 1;
    }

    if (!check(num, numbers[i - 1], asc)) {
      return i - 1;
    }
  }
  return -1;
};
const part1 = (input: number[][]) => {
  return input
    .map((numbers) => {
      return checkAll(numbers) === -1;
    })
    .reduce((acc, cur) => {
      acc += cur ? 1 : 0;
      return acc;
    }, 0);
};

const part2 = (input1: number[][]) => {
  return input1
    .map((numbers) => {
      let original = checkAll(numbers);

      if (original !== -1) {
        let prev = [...numbers];
        let cur = [...numbers];
        let next = [...numbers];

        cur.splice(original, 1);
        prev.splice(original - 1, 1);
        next.splice(original + 1, 1);

        if (
          checkAll(prev) === -1 ||
          checkAll(cur) === -1 ||
          checkAll(next) === -1
        ) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    })
    .reduce((acc, cur) => {
      acc += cur ? 1 : 0;
      return acc;
    }, 0);
};

const input = readFileSync("./day2/input.txt", "utf-8");

const inputs = input
  .split("\n")
  .filter((it) => it.length > 0)
  .reduce((acc, cur) => {
    const numbers = cur.split(" ").map((it) => Number.parseInt(it.trim()));

    acc.push(numbers);
    return acc;
  }, [] as number[][]);

// const input1 = [3, 4, 2, 1, 3, 3];

// const input2 = [4, 3, 5, 3, 9, 3];

// assert(day1_2(input1, input2) === 31);
// const input1 = [
//   [1, 2, 3, 4, 6, 7, 9],
//   [1, 5, 3, 4, 6, 7, 9],
//   [9, 8, 7, 6, 5, 3],
//   [9, 8, 6, 4, 7],
// ];

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
// console.log(part1(input1));
// console.log(part2(inputs));
