import { readFileSync } from "fs";

const getValidity = (
  rules: Record<string, string[]>,
  input: Record<string, { idx: number; value: string }>[]
) => {
  let isValid = new Array(input.length).fill(true);

  for (let rule in rules) {
    input.forEach((line, index) => {
      if (!isValid[index]) {
        return;
      }

      const leftIndex = line[rule];

      if (!leftIndex) {
        return;
      }

      for (let right of rules[rule]) {
        const rightIndex = line[right];

        if (!rightIndex) {
          continue;
        }

        if (leftIndex.idx > rightIndex.idx) {
          isValid[index] = false;
        }
      }
    });
  }

  return isValid;
};

const part1 = (
  rules: Record<string, string[]>,
  input: Record<string, { idx: number; value: string }>[],
  origInput: string[][]
) => {
  const isValid = getValidity(rules, input);

  return origInput
    .filter((_, idx) => isValid[idx])
    .reduce((acc, cur) => {
      acc += Number(cur[Math.floor(cur.length / 2)]);
      return acc;
    }, 0);
};

const checkString = (
  rules: Record<string, string[]>,
  line: Record<string, { idx: number; value: string }>
) => {
  const lineCopy = { ...line };
  let isValid = null;
  while (isValid !== true) {
    for (let rule in rules) {
      const leftIndex = line[rule];

      if (!leftIndex) {
        continue;
      }

      for (let right of rules[rule]) {
        const rightIndex = line[right];

        if (!rightIndex) {
          continue;
        }

        if (leftIndex.idx > rightIndex.idx) {
          const leftIdx = leftIndex.idx;
          leftIndex.idx = rightIndex.idx;
          rightIndex.idx = leftIdx;
          isValid = false;
          break;
        }
      }

      if (isValid === false) {
        break;
      }
    }

    if (isValid === null) {
      isValid = true;
    } else {
      isValid = null;
    }
  }

  return lineCopy;
};

const part2 = (
  rules: Record<string, string[]>,
  input: Record<string, { idx: number; value: string }>[],
  origInput: string[][]
) => {
  const isValid = getValidity(rules, input);

  const invalidStrings = origInput.filter((_, idx) => !isValid[idx]);

  // console.log("total", origInput.length);
  // console.log("invalid", invalidStrings.length);

  const invalidInput = formatInput(invalidStrings);

  const fixedStrings = invalidInput.map((it) => checkString(rules, it));

  return fixedStrings.reduce((acc, cur) => {
    const values = Object.values(cur);
    const length = values.length;
    const mid = Math.floor(length / 2);

    acc += Number(values.find((it) => it.idx === mid)?.value);
    return acc;
  }, 0);
};

const input = readFileSync("./input.txt", "utf-8");

let isRules = true;
const inputs2 = input.split("\n").reduce(
  (acc, cur) => {
    if (cur.length === 0) {
      isRules = false;
      return acc;
    }

    if (isRules) {
      acc.rules.push(cur);
    } else {
      acc.input.push(cur);
    }
    return acc;
  },
  {
    input: [] as string[],
    rules: [] as string[],
  }
);

const splitInputs = inputs2.input.map((line) => line.split(","));

const formatRules = (rules: string[]) => {
  return rules.reduce(
    (acc, cur) => {
      const [left, right] = cur.split("|");

      if (acc[left]) {
        acc[left].push(right);
      } else {
        acc[left] = [right];
      }

      return acc;
    },
    {} as Record<string, string[]>
  );
};

const formatInput = (inputs: string[][]) => {
  return inputs.map((str) => {
    return Object.fromEntries(
      str.map((it, idx) => [
        it,
        {
          idx,
          value: it,
        },
      ])
    );
  });
};

console.log(
  part1(formatRules(inputs2.rules), formatInput(splitInputs), splitInputs)
);
console.log(
  part2(formatRules(inputs2.rules), formatInput(splitInputs), splitInputs)
);
