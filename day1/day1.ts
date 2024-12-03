import assert from "assert";
import { readFileSync } from "fs";

const day1_1 = (input1: number[], input2: number[]) => {
  const sorted1 = [...input1].sort((a, b) => a - b);
  const sorted2 = [...input2].sort((a, b) => a - b);

  return sorted1
    .map((item, i) => {
      return Math.abs(item - sorted2[i]);
    })
    .reduce((acc, cur) => (acc += cur), 0);
};

const day1_2 = (input1: number[], input2: number[]) => {
  const map: Record<number, number> = input2.reduce(
    (acc, cur) => {
      acc[cur] = acc[cur] !== undefined ? acc[cur] + 1 : 1;

      return acc;
    },
    {} as Record<number, number>
  );

  return input1.reduce((acc, cur) => {
    acc += cur * (map[cur] ?? 0);
    return acc;
  }, 0);
};

const input = readFileSync("./day1/input.txt", "utf-8");

const inputs = input
  .split("\n")
  .filter((it) => it.length > 0)
  .reduce(
    (acc, cur) => {
      const [left, right] = cur
        .split("   ")
        .map((it) => Number.parseInt(it.trim()));
      acc[0].push(left);
      acc[1].push(right);

      return acc;
    },
    [[], []] as [number[], number[]]
  );

// const input1 = [3, 4, 2, 1, 3, 3];

// const input2 = [4, 3, 5, 3, 9, 3];

// assert(day1_2(input1, input2) === 31);

console.log(day1_1(...inputs));
console.log(day1_2(...inputs));
