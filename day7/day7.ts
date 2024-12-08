import { readFileSync } from "fs";

const fnMap: ((a: number, b: number) => number)[] = [
  (a, b) => a + b,
  (a, b) => a * b,
  (a, b) => Number(a.toString() + b.toString()),
];

const solve = ([result, numbers]: [number, number[]], ops: number) => {
  const height = Math.pow(ops, numbers.length - 1);
  const matrix = new Array(height)
    .fill(0)
    .map((_) => new Array(numbers.length).fill(0));

  matrix[0][0] = numbers[0];

  for (let col = 1; col < numbers.length; col += 1) {
    for (let row = 0; row < Math.pow(ops, col); row += 1) {
      const op = row % ops;

      const prevRow = Math.floor(row / ops);

      matrix[row][col] = fnMap[op](matrix[prevRow][col - 1], numbers[col]);
    }
  }

  let isValid = false;
  for (let row = 0; row < height; row += 1) {
    if (matrix[row][numbers.length - 1] === result) {
      isValid = true;
    }
  }

  return isValid;
};

const part1 = (inputs: [number, number[]][]) => {
  const validInputs = inputs.map((input) => solve(input, 2));

  return inputs
    .filter((_, idx) => validInputs[idx])
    .reduce((acc, [result]) => (acc += result), 0);
};

const part2 = (inputs: [number, number[]][]) => {
  const validInputs = inputs.map((input) => solve(input, 3));

  return inputs
    .filter((_, idx) => validInputs[idx])
    .reduce((acc, [result]) => (acc += result), 0);
};

const input = readFileSync("./input.txt", "utf-8");

const inputs: [number, number[]][] = input
  .split("\n")
  .filter((it) => it.length > 0)
  .map((it) => {
    const [result, numbers] = it.split(":");

    return [
      Number(result),
      numbers
        .split(" ")
        .filter((it) => it.length > 0)
        .map((it) => Number(it)),
    ];
  });

console.log(part1(inputs));
console.log(part2(inputs));
