import { AlgorithmStep } from "@/types/algorithms";

export function* insertionSort(arr: number[]): Generator<AlgorithmStep> {
  const array = [...arr];
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;
  let arrayAccesses = 0;
  const sorted: number[] = [0];

  yield {
    array: [...array],
    sorted: [0],
    comparisons,
    swaps,
    arrayAccesses,
    description: "Starting with first element as sorted",
  };

  for (let i = 1; i < n; i++) {
    const key = array[i];
    arrayAccesses++;
    let j = i - 1;

    yield {
      array: [...array],
      current: i,
      sorted: [...sorted],
      comparisons,
      swaps,
      arrayAccesses,
      description: `Inserting element ${key} into sorted portion`,
    };

    while (j >= 0 && array[j] > key) {
      comparisons++;
      arrayAccesses += 2;

      yield {
        array: [...array],
        comparing: [j, j + 1],
        sorted: [...sorted],
        comparisons,
        swaps,
        arrayAccesses,
        description: `Comparing ${array[j]} with ${key}`,
      };

      array[j + 1] = array[j];
      swaps++;
      arrayAccesses++;

      yield {
        array: [...array],
        swapping: [j, j + 1],
        sorted: [...sorted],
        comparisons,
        swaps,
        arrayAccesses,
        description: `Shifting ${array[j + 1]} to the right`,
      };

      j--;
    }

    if (j >= 0) {
      comparisons++;
    }

    array[j + 1] = key;
    arrayAccesses++;
    sorted.push(i);

    yield {
      array: [...array],
      sorted: [...sorted],
      comparisons,
      swaps,
      arrayAccesses,
      description: `Placed ${key} at correct position ${j + 1}`,
    };
  }

  yield {
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i),
    comparisons,
    swaps,
    arrayAccesses,
    description: "Insertion sort complete",
  };
}
